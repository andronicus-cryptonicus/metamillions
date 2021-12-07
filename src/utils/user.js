import Cookies from 'js-cookie';

function User() {

  this.user = null;

  this.setUser = user => {
    this.user = user;
    this.storeUser(user);
  };

  this.storeUser = user => {
    Cookies.set('_user', JSON.stringify(user), {
      sameSite: 'strict',
      path: '/',
    });
  };

  this.getUser = () => {
    if (this.user === null) {
      const storedUser = Cookies.get('_user');

      if (!storedUser) {
        return null;
      }

      this.user = JSON.parse(storedUser);
      return this.user;
    }

    return this.user;
  };

  this.logout = e => {
    e.preventDefault();

    this.user = null;
    Cookies.remove('_user');

    window.location.reload();
  }

};

export default new User();
