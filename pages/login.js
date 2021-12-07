import Head from 'next/head';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import User from '@/utils/user';
import Layout from '@/components/layout';

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required('Please Enter your password'),
    }),
    onSubmit: async values => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(values),
          credentials: 'same-origin'
        });
        const body = await response.json();
        User.setUser(body);

        router.push('/');
      } catch (e) {
        console.log(e);
        alert('Login failed, please try again');
      }
    }
  });

  return (
    <>
      <Head>
        <title>Login | MetaMillions</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="name">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Login;
