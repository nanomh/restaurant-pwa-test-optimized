// @ts-nocheck
import './component';
import WarungDbSource from '../data/warungdb-source';
import { createPageLoaderTemplate, PemecahUrl } from '../utils/url-loader';
import WarungKesukaanIdb from '../data/warung-kesukaan-idb';
import CariButtonPresenter from '../utils/cari-button-presenter';

const Beranda = {
  async render() {
    const html = `
      ${document.querySelector('main').innerHTML = createPageLoaderTemplate.show()}
        <div class="hero">
       
          <div class="hero-overlay">
            <div class="hero-inner">
          <h1 class="hero-title">Silakan Pilih Warung Yang Kamu Sukai</h1>
          <p class="hero-tag">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate venenatis tempor. Etiam non accumsan felis. Maecenas quis dignissim tellus. Quisque eros massa, congue at justo eleifend, elementum pretium nunc. </p>
            </div>
          </div>
         
        </div>
        <section class="content-beranda" id="content">
            <h1 class="content-title">Daftar Warung</h1>
            
            <div class="posting-beranda" id="posting-beranda">
                <daftar-posting></daftar-posting>
            </div>
        </section>
    `;
    return html;
  },
  async afterRender() {
    const { restaurants } = await WarungDbSource.daftarWarung();
    const warung = restaurants;
    const berandaContainer = document.querySelector('daftar-posting');
    berandaContainer.value = warung;
    createPageLoaderTemplate.remove();
  },
};
const Kesukaan = {
  async render() {
    const html = `
      ${document.querySelector('main').innerHTML = createPageLoaderTemplate.show()}
        <section class="content-kesukaan" id="content">
            <h1 class="content-title">Warung Kesukaanmu</h1>
            <div class="posting-kesukaan" id="posting-kesukaan">
                <daftar-posting></daftar-posting>
            </div>
        </section>
    `;
    return html;
  },
  async afterRender() {
    const warungs = await WarungKesukaanIdb.semuaWarung();
    if (warungs.length > 0) {
      const sukaContainer = document.querySelector('daftar-posting');
      sukaContainer.value = warungs;
    } else {
      document.querySelector('#posting-kesukaan').innerHTML = '<kesukaan-kosong></kesukaan-kosong>';
    }
    createPageLoaderTemplate.remove();
  },
};
const Pencarian = {
  async render() {
    const html = `
      ${document.querySelector('main').innerHTML = createPageLoaderTemplate.show()}
        <section class="content-kesukaan" id="content">
            <h1 class="content-title">Pencarian Nama atau Menu Warung</h1>
            <div class="form-pencarian">
            <label for="pencarian">Masukan Kata Kunci</label>
            <textarea name="pencarian" id="pencarian" class="form-pencarian-element" value="ghj"></textarea>
            <button class="button-cari" id="button-cari"><i class="fas fa-search"></i></button>
            </div>
            <div class="form-pencarian1" id="form-pencarian1">
            <form-pencarian></form-pencarian>
            <daftar-posting></daftar-posting>
            </div>
            
        </section>
    `;
    return html;
  },
  async afterRender() {
    const kunci = JSON.parse(localStorage.getItem('kata_kunci'));
    const { restaurants } = await WarungDbSource.cariWarung(kunci);
    const warungs = restaurants;
    const sukaContainer = document.querySelector('form-pencarian');
    sukaContainer.value = warungs;
    if (warungs.length > 0) {
      const sukaContainer2 = document.querySelector('daftar-posting');
      sukaContainer2.value = warungs;
    } else {
      console.log('kosong');
      document.querySelector('#form-pencarian1').innerHTML = '<pencarian-kosong></pencarian-kosong>';
    }
    createPageLoaderTemplate.remove();
  },
};
const Detail = {
  async render() {
    const html = `
      ${document.querySelector('main').innerHTML = createPageLoaderTemplate.show()}
      <section id="content">
          <div class="content-detail">
          <h1 class="content-title">Detail Informasi Warung</h1>
            <detail-component></detail-component>
          </div>
      </section>
        `;
    return html;
  },

  async afterRender() {
    const url = PemecahUrl.parseActiveUrlWithoutCombiner();
    const warungById = await WarungDbSource.detailIdWarung(url.id);
    const detailContainer = document.querySelector('detail-component');
    detailContainer.value = warungById.restaurant;
    createPageLoaderTemplate.remove();
  },
};

export {
  Beranda,
  Kesukaan,
  Detail,
  Pencarian,
};
