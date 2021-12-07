import Head from 'next/head';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import User from '@/utils/user';
import Layout from '@/components/layout';

const Register = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      wallet: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      password: Yup.string()
        .required('Please anter a password')
        .min(8, 'Password must be at least 8 characters'),
      wallet: Yup.string()
        .required('Please enter your wallet address')
        .length(42, 'Please enter a valid wallet address')
    }),
    onSubmit: async values => {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(values),
          credentials: 'same-origin'
        });

        const body = await response.json();
        User.setUser(body);

        router.push('/');
      } catch (e) {
        alert('There was a problem processing your registration, please try again');
      }
    }
  });

  return (
    <>
      <Head>
        <title>Register | MetaMillions</title>
      </Head>

      <form onSubmit={formik.handleSubmit} className="registration-form">
        <h2>Register</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>

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

        <div>
          <label htmlFor="name">Wallet</label>
          <input
            id="wallet"
            type="text"
            {...formik.getFieldProps('wallet')}
          />
          {formik.touched.wallet && formik.errors.wallet ? (
            <div>{formik.errors.wallet}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Register;
