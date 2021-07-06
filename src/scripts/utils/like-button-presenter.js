import WarungKesukaanIdb from '../data/warung-kesukaan-idb';

const createLikeWarungButtonTemplate = () => `
    <button aria-label="suka warung" id="sukaButton" class="like">
      <i class="far fa-thumbs-up" aria-hidden="true"></i>
    </button>
  `;
const createUnlikeWarungButtonTemplate = () => `
    <button aria-label="tidak suka warung" id="sukaButton" class="like">
      <i class="fas fa-thumbs-up" aria-hidden="true"></i>
    </button>
  `;
const createSuccesFavoriteNotif = {
  show() {
    return `
      <div id="suka-notif" class="suka-notif">
        <p>Berhasil Menambahkan ke kesukaan</p>
      </div>
    `;
  },
  remove() {
    setTimeout(() => {
      const notif = document.querySelector('.suka-notif');
      if (notif)notif.remove();
    }, 2800);
  },
};
const createRemoveFavoriteNotif = {
  show() {
    return `
      <div id="suka-notif" class="suka-notif">
        <p>Berhasil menghapus dari kesukaan</p>
      </div>
    `;
  },
  remove() {
    setTimeout(() => {
      const notif = document.querySelector('.suka-notif');
      if (notif)notif.remove();
    }, 3800);
  },
};
const LikeButtonPresenter = {
  async init({ likeButtonContainer, notifContainer, warung }) {
    this._likeButtonContainer = likeButtonContainer;
    this._notifContainer = notifContainer;
    this._warung = warung;
    await this._renderButton(this._warung);
  },
  async _renderButton(warung) {
    const { id } = warung;
    if (await this._warungExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },
  async _warungExist(id) {
    const warung = await WarungKesukaanIdb.dapatkanIdWarung(id);
    return !!warung;
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeWarungButtonTemplate();
    const likeButton = document.querySelector('#sukaButton');
    likeButton.addEventListener('click', async () => {
      WarungKesukaanIdb.hapusWarung(this._warung.id);
      this._renderButton(this._warung);
      this._notifContainer.innerHTML = createRemoveFavoriteNotif.show();
      createRemoveFavoriteNotif.remove();
    });
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeWarungButtonTemplate();

    const likeButton = document.querySelector('#sukaButton');
    likeButton.addEventListener('click', async () => {
      WarungKesukaanIdb.ambilWarung(this._warung);
      this._renderButton(this._warung);
      this._notifContainer.innerHTML = createSuccesFavoriteNotif.show();
      createSuccesFavoriteNotif.remove();
    });
  },
};

export default LikeButtonPresenter;
