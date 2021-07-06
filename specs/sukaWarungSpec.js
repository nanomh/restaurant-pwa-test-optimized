import * as TestFactories from './helpers/testFactories';
import WarungKesukaanIdb from '../src/scripts/data/warung-kesukaan-idb';

describe('Menyukai Sebuah Warung', () => {
  const addButtonLikeContainer = () => {
    document.body.innerHTML = `
        <div id="notif-favorite-container" class="notif-favorite-container"></div>
        <div id="likeButtonContainer"></div>
        `;
  };

  beforeEach(() => {
    addButtonLikeContainer();
  });

  it('menampilkan "button suka" ketika warung belum disukai', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });

    expect(document.querySelector('[aria-label="suka warung"]')).toBeTruthy();
  });

  it('menampilkan "button tidak suka" ketika warung telah disukai', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });

    expect(document.querySelector('[aria-label = "tidak suka warung"]')).toBeFalsy();
  });

  it('mencoba menyukai warung', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });

    document.querySelector('#sukaButton').dispatchEvent(new Event('click'));
    const warung = await WarungKesukaanIdb.dapatkanIdWarung(1);

    expect(warung).toEqual({ id: 1 });
    WarungKesukaanIdb.hapusWarung(1);
  });

  it('tidak menambahkan warung, jika warung sudah disukai', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });

    await WarungKesukaanIdb.ambilWarung({ id: 1 });
    document.querySelector('#sukaButton').dispatchEvent(new Event('click'));
    expect(await WarungKesukaanIdb.semuaWarung()).toEqual([{ id: 1 }]);
    WarungKesukaanIdb.hapusWarung(1);
  });

  it('tidak menambahkan warung, jika warung tidak punya id', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({});

    document.querySelector('#sukaButton').dispatchEvent(new Event('click'));
    expect(await WarungKesukaanIdb.semuaWarung()).toEqual([]);
  });
});
