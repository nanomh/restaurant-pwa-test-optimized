// @ts-nocheck
// eslint-disable-next-line max-classes-per-file
import CONFIG from '../globals/config';
import WarungDbSource from '../data/warungdb-source';
import LikeButtonPresenter from '../utils/like-button-presenter';
import LikeButtonPresenterAll from '../utils/like-button-presenter-all';
import CariButtonPresenter from '../utils/cari-button-presenter';

const MembuatTemplateUlasan = (ulansan2) => {
  const ulasan = ulansan2.customerReviews[ulansan2.customerReviews.length - 1];

  const html = document.createElement('div');
  html.classList.add('container-ulasan');
  html.innerHTML = `
          <div class="photo-profile-ulasan">
              <img src="./images/user/default.jpg" alt="photo-profile-ulasan">
          </div>
          <div class="ulasan-body">
              <h3 class="nama-ulasan">${ulasan.name}</h3>
              <small class="tanggal-ulasan">${ulasan.date}</small>
              <p class="isi-ulasan">${ulasan.review}</p>
          </div>
          
    `;

  return html;
};
const FormUlasanInitiator = {
  init({ form, container }) {
    form.addEventListener('change', (event) => {
      event.preventDefault();
      this.cekDataForm(form, container);
    });
  },

  setIsiForm(form) {
    const data = new FormData(form);
    const dataForm = {};
    for (const isi of data.keys()) {
      dataForm[isi] = data.get(isi);
    }
    return dataForm;
  },

  cekDataForm(form, container) {
    const data = this.setIsiForm(form);
    const error = {
      status: false,
      keys: [],
    };

    for (const isi in data) {
      if (data[isi] === '') {
        error.status = true;
        error.keys.push(isi);
      }
    }

    if (error.status === false) {
      console.log('visibel');
      const input = document.querySelector('#button-ulasan');
      input.style.visibility = 'visible';
      form.querySelectorAll('span').forEach((item) => {
        item.remove();
      });
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.kirimData({
          data: JSON.stringify(data),
          form,
          container,
        });
      });
    } else {
      this.errorHandler(error, form);
    }
  },

  errorHandler(error, form) {
    form.querySelectorAll('span').forEach((item) => {
      item.remove();
    });
    error.keys.forEach((isi) => {
      const element = document.querySelector(`#${isi}`);
      const errorElement = document.createElement('span');
      errorElement.setAttribute('class', 'input-diperlukan');
      errorElement.innerText = `Kolom ${isi} harus di isi !!!`;
      element.after(errorElement);
    });
  },

  successHandler(form) {
    const formElement = form;
    formElement.querySelectorAll('span').forEach((item) => {
      item.remove();
    });

    formElement.querySelector('input[type=text]').value = '';
    formElement.querySelector('textarea').value = '';
    const messageElement = document.createElement('span');
    messageElement.classList.add('pesan-ok');
    messageElement.classList.add('tampilkan-pesan');
    messageElement.innerHTML = '<p>Berhasil menambahkan Ulasan</p>';
    formElement.before(messageElement);
    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  },

  async kirimData({ data, form, container }) {
    try {
      form.querySelector('button').innerHTML = `
        <div class="btn-ulasan-loader">
        </div>
        `;
      const response = await WarungDbSource.kirimUlasan(data);
      this.successHandler(form);

      container.appendChild(MembuatTemplateUlasan(response));
      form.querySelector('button').innerHTML = 'Tambah Ulasan';
    } catch (err) {
      console.log(err);
    }
  },

};
class DaftarPosting extends HTMLElement {
  set value(warung) {
    this._warung = warung;
    this._render();
  }

  _render() {
    this._warung.forEach((item) => {
      const postingItem = document.createElement('posting-item');
      this.appendChild(postingItem);
      postingItem.value = item;
    });
  }
}

class KesukaanKosongComponent extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
            <div class="kesukaan-kosong-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="kesukaan-kosong-tag">
                <p>Belum ada warung kesukaanmu</p>
            </div>
        `;
  }
}
class MenuNav extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
    <header>
      <nav>
          <div class="nav-logo">
           <h1></h1>
          
          </div>
          <div>
          
          <h1 class="nav-logodesc">Aplikasi e-Warung</h1>
          </div>
          <a class="nav-menu" id="menu" href="#" aria-label="menu">
              <i class="fas fa-bars"></i>
          </a>
          <ul class="nav-list">
              <li class="nav-item">
                  <a href="#" class="nav-link">Beranda</a>
              </li>
              <li class="nav-item">
                  <a href="#/kesukaan" class="nav-link">Suka</a>
              </li>
              <li class="nav-item">
                  <a href="https://nano.nanokaryamandiri.com" class="nav-link" target="_blank" rel="noreferrer"></i>About</a>
              </li>
              <li class="nav-item">
                  <a href="#/cari" class="nav-link" >Cari</a>
              </li>
          </ul> 
      </nav>

      <ul class="sidenav">
          <li class="sidenav-item">
              <a href="#" class="sidenav-link">Beranda</a>
          </li>
          <li class="sidenav-item">
              <a href="#/kesukaan" class="sidenav-link">Suka</a>
          </li>
          <li class="sidenav-item">
              <a href="https://nano.nanokaryamandiri.com" class="sidenav-link" target="_blank" rel="noreferrer">About</a>
          </li>
          <li class="sidenav-item">
          <a href="#/cari" class="nav-link"><i class="fas fa-search"></i></a>
          </li>
      </ul> 
      </header>
      `;
  }
}
class PostingItem extends HTMLElement {
  set value(warung) {
    this._warung = warung;
    this._render();
    this._likeButtonPresenterAll();
  }

  async _likeButtonPresenterAll() {
    LikeButtonPresenterAll.init({
      warungAll: this._warung,
      likeButtonContainerAll: document.querySelector(`#a${this._warung.id}`),
      notifContainerAll: document.querySelector('#notif-favorite-container-all'),
    });
  }

  _render() {
    this.innerHTML = `
          <div id="notif-favorite-container-all" class="notif-favorite-container"></div>
          <div class="posting-item">
            <div class="posting-item-a">
            <a href="#/detail/${this._warung.id}" style="text-decoration: none" >
            <h1 class="posting-item-title">${this._warung.name}</h1>
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="posting-item-lokasi">${this._warung.city}</span>
                <img data-src="${CONFIG.IMAGE_SMALL_URL + this._warung.pictureId}" alt="${this._warung.name}" class="lazyload posting-item-thumbnail">
                <div class="posting-item-content">                    
                    <p class="posting-item-descripsi">${this._warung.description}</p>
                    <div class="posting-item-rating2">
                    <i class="fas fa-star"></i>
                    <span class="posting-item-rating">${this._warung.rating}</span>
                    </div>
                </div>
                </a>
                <div id="a${this._warung.id}" class="like-button-container"> 
                </div>
            </div>           
            </div>`;
  }
}
class DetailComponent extends HTMLElement {
  set value(warung) {
    this._warung = warung;
    this._render();
    this._formInitiator();
    this._likeButtonPresenter();
  }

  _templateRating() {
    const bintang = [];

    for (let i = 0; i < parseInt(Math.floor(this._warung.rating)); i++) {
      bintang.push('<i class="fas fa-star"></i>');
    }
    return bintang;
  }

  _formInitiator() {
    FormUlasanInitiator.init({
      form: this.querySelector('#form-ulasan'),
      container: this.querySelector('#container-ulasan'),
    });
  }

  async _likeButtonPresenter() {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      notifContainer: document.querySelector('#notif-favorite-container'),
      warung: this._warung,
    });
    console.log('test render30');
  }

  _render() {
    this.innerHTML = `
            <div id="notif-favorite-container" class="notif-favorite-container"></div>
            <div class="detail-warung">
                    
                    <h2 class="detail-warung-title">${this._warung.name}</h2>
                    <div class="detail-category-container">
                        ${this._warung.categories.map((kategori) => `<span class="detail-category">${kategori.name}</span>`).join(', ')}
                    </div>
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="detail-location">${this._warung.address}, ${this._warung.city}</span>
                <img src="${CONFIG.IMAGE_LARGE_URL + this._warung.pictureId}" class="lazyload detail-thumbnail" alt="${this._warung.name}">
                
                <div class="detail-content">
                    
                    <p class="detail-description">${this._warung.description}</p> 
                </div>
                
                <div class="menu-rating">
                    <span>Rating ${this._warung.rating}</span>    
                    ${this._templateRating().map((bintang) => bintang).join('')}
                    <div id="likeButtonContainer" class="like-button-container"></div>
                </div> 
               
            </div>
            
            <aside>
                <div class="detail-menu">
                    <div class="menu-title-container">
                        <i class="fas fa-hamburger"></i>
                        <h2 class="menu-title">Makanan</h2>
                    </div>
                    <ul class="menu-list">
                        ${this._warung.menus.foods.map((makanan) => `<li class="menu-item">${makanan.name}</li>`).join(' ')}
                    <ul>
                </div>
                <div class="detail-menu">
                    <div class="menu-title-container">
                        <i class="fas fa-coffee"></i>
                        <h2 class="menu-title">Minuman</h2>
                    </div>
                    <ul class="menu-list">
                        ${this._warung.menus.drinks.map((minuman) => `<li class="menu-item">${minuman.name}</li>`).join(' ')}
                    </ul>
                </div>
                
                <div class="form-ulasan-container">
                    <h2>Buat Ulasan</h2>
                    <form class="form-ulasan" id="form-ulasan">
                        <input type="hidden" name="id" value="${this._warung.id}">
                        <div class="form-ulasan-element">
                            <label for="name">Nama</label>
                            <input type="text" name="name" id="name" class="form-ulasan-element-nama" autocomplete="off">
                        </div>
                        <div class="form-ulasan-element">
                            <label for="review">Ulasan</label>
                            <textarea name="review" id="review" class="form-ulasan-element-ulasan"></textarea>
                        </div>
                        <div class='div-button-ulasan'>
                        <button type="submit" aria-label="button-ulasan" id="button-ulasan" class="btn-ulasan" style="visibility:hidden">Tambah Ulasan</button>
                        </div>
                      </form>
                </div>
            </aside>
            <section>
                
                <h2>Ulasan Pelanggan</h2>
                <div id="container-ulasan">
                ${this._warung.customerReviews.map((ulasan) => `
                    <div class="container-ulasan">
                        <div class="photo-profile-ulasan">
                            <img src="./images/user/default.jpg" alt="consumer photo profile">
                        </div>
                        <div class="ulasan-body">
                            <h3 class="nama-ulasan">${ulasan.name}</h3>
                            <small class="tanggal-ulasan">${ulasan.date}</small>
                            <p class="isi-ulasan">${ulasan.review}</p>
                        </div>
                    </div>
                    `).join('')}
                </div>
                
            </section>

            
            
        `;
  }
}
class Foter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
      <p>copyright&copy; 2021 - Aplikasi e-Warung - By  <a href="https://nano.nanokaryamandiri.com" target="_blank" rel="noopener noreferrer" class="footerAnchor">Nano M Husen</a></p>
      </footer>
        `;
  }
}
class SkipContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <a href="#main-content" class="skip-to-content">Skip to Content</a>
        `;
  }
}

class BodyHtml extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <body>
    <skip-content></skip-content>
    <menu-nav></menu-nav>
    <main id="main-content"></main>
    <foter-class></foter-class>
    </body>
        `;
  }
}
class Pencarian extends HTMLElement {
  set value(warung) {
    this._warung = warung;
    this._render();
    this._cariButtonPresenter();
  }

  async _cariButtonPresenter() {
    await CariButtonPresenter.init({
      cariButtonContainer: document.querySelector('#button-cari'),
    });
  }

  _render() {
    const kunci = JSON.parse(localStorage.getItem('kata_kunci'));
    this.innerHTML = `
      <div class="form-pencarian-isi" id="form-pencarian-isi">
      <p class="hasil-pencarian-ditemukan" id="hasil-pencarian-ditemukan">Hasil Pencarian : " ${kunci} " , Ditemukan sebanyak ${this._warung.length} warung</p>
      </div>
        `;
  }
}
class PencarianKosongComponent extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    const kunci = JSON.parse(localStorage.getItem('kata_kunci'));
    this.innerHTML = `
    <div class="form-pencarian-kosong" id="form-pencarian-kosong">
    <p class="hasil-pencarian-kosong" id="hasil-pencarian-kosong">Pencarian : " ${kunci} " Tidak ditemukan</p>
    </div>
        `;
  }
}
customElements.define('pencarian-kosong', PencarianKosongComponent);
customElements.define('form-pencarian', Pencarian);
customElements.define('body-html', BodyHtml);
customElements.define('skip-content', SkipContent);
customElements.define('foter-class', Foter);
customElements.define('detail-component', DetailComponent);
customElements.define('posting-item', PostingItem);
customElements.define('menu-nav', MenuNav);
customElements.define('kesukaan-kosong', KesukaanKosongComponent);
customElements.define('daftar-posting', DaftarPosting);
