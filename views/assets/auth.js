const callbackURL = '/callback';
const clientID = 'vBE1bJZumw1UaqDJLQqzxFi0C58ITPyC';
const secret = 'IPFYty3EX_GC_n9VMB87xZOahtUl8TKhkek5r1ZKL5KtlgvJ1F2wIuagGMMG9I8s';
const domain = 'app54402081.eu.auth0.com';
const options = {
  auth: {
    redirectUrl: '',
    responseType: 'code',
    params: {
      scope: 'openid email'
    }
  }
};

const lock = new Auth0Lock(clientID, namespace, config);
const btn = document.querySelector('button#auth');
btn.addEventListener('click', ev => lock.show());

