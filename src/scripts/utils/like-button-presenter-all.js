import WarungKesukaanIdb from '../data/warung-kesukaan-idb';
import WarungDbSource from '../data/warungdb-source';

const createSuccesFavoriteNotif1 = {
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
const createRemoveFavoriteNotif1 = {
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
const LikeButtonPresenterAll = {
  async init({ likeButtonContainerAll, notifContainerAll, warungAll }) {
    this._likeButtonContainerAll = likeButtonContainerAll;
    this._notifContainerAll = notifContainerAll;
    this._warungAll = warungAll;
    await this._renderButton(this._warungAll);
  },
  async _renderButton(warungAll) {
    const { id } = warungAll;
    if (await this._warungExist(id)) {
      const likeButtonContainerAll2 = document.querySelector(`#a${id}`);
      likeButtonContainerAll2.innerHTML = `
      <p aria-label="tidak suka warung" id="#a${id}" class="like2">
        <i class="fas fa-heart" aria-hidden="true"></i>
      </p>
    `;
      const likeButton = document.querySelector(`#a${id}`);
      likeButton.addEventListener('click', async () => {
        const warungById = await WarungDbSource.detailIdWarung(id);
        const warungById2 = warungById.restaurant;
        WarungKesukaanIdb.hapusWarung(warungById2.id);
        this._renderButton(warungById2);
        this._notifContainerAll.innerHTML = createRemoveFavoriteNotif1.show();
        createRemoveFavoriteNotif1.remove();
      });
    } else {
      const likeButtonContainerAll2 = document.querySelector(`#a${id}`);
      likeButtonContainerAll2.innerHTML = `
      <p aria-label="suka warung" id="#a${id}" class="like2">
        <i class="far fa-heart" aria-hidden="true"></i>
      </p>
    `;
      const likeButton = document.querySelector(`#a${id}`);
      likeButton.addEventListener('click', async () => {
        const warungById = await WarungDbSource.detailIdWarung(id);
        const warungById2 = warungById.restaurant;
        WarungKesukaanIdb.ambilWarung(warungById2);
        this._renderButton(warungById2);
        this._notifContainerAll.innerHTML = createSuccesFavoriteNotif1.show();
        createSuccesFavoriteNotif1.remove();
      });
    }
  },
  async _warungExist(id) {
    const warung = await WarungKesukaanIdb.dapatkanIdWarung(id);
    return !!warung;
  },
};

export default LikeButtonPresenterAll;
