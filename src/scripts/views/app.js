import { PemecahUrl } from '../utils/url-loader';
import { Beranda, Kesukaan, Detail, Pencarian } from './page';

const rute = {
  '/': Beranda,
  '/beranda': Beranda,
  '/detail/:id': Detail,
  '/kesukaan': Kesukaan,
  '/cari': Pencarian,
};
class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    const DrawerInisial = {
      init({ button, drawer, content }) {
        button.addEventListener('click', (event) => {
          this._toggleDrawer(event, drawer);
        });

        drawer.addEventListener('click', (event) => {
          if (event.target.classList.contains('sidenav-link')) {
            this._closeDrawer(event, drawer);
          }
        });

        content.addEventListener('click', (event) => {
          this._closeDrawer(event, drawer);
        });
      },

      _toggleDrawer(event, drawer) {
        event.preventDefault();
        drawer.classList.toggle('open');
      },

      _closeDrawer(event, drawer) {
        event.stopPropagation();
        drawer.classList.remove('open');
      },

    };
    DrawerInisial.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = PemecahUrl.parseActiveUrlWithCombiner();
    const halaman = rute[url];
    this._content.innerHTML = await halaman.render();
    await halaman.afterRender();
  }
}

export default App;
