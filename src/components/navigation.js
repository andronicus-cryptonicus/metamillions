import User from '@/utils/user';
import Link from 'next/link';

export default function Navigation() {
  const user = User.getUser();

  return (
    <nav>
      <div className="nav-item">
        <h1>
          <Link href="/">MetaMillions</Link>
        </h1>
      </div>

      <div className="grow">&nbsp;</div>

      {user !== null ? (
        <>
          <div className="nav-item">
            Welcome, {user.name}
          </div>
          <div className="nav-item">
            <a href="#" onClick={e => User.logout(e)}>Log Out</a>
          </div>
        </>
      ) : (
        <>
          <div className="nav-item">
            <Link href="/login">Login</Link>
          </div>
          <div className="nav-item">
            <Link href="/register">Register</Link>
          </div>
        </>
      )}
    </nav>
  );
}
