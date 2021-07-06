import 'regenerator-runtime';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/app';
import './views/component';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    await runtime.register();
    return;
  }
  console.log('Service worker not supported in this browser');
};
const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('.sidenav'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
