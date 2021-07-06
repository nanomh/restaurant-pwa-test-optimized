import * as TestFactories from './helpers/testFactories';
import WarungKesukaanIdb from '../src/scripts/data/warung-kesukaan-idb';

describe('Tidak Menyukai Warung', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `
        <div id="notif-favorite-container" class="notif-favorite-container"></div>
        <div id="likeButtonContainer"></div>
        `;
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    WarungKesukaanIdb.ambilWarung({ id: 1 });
  });

  afterEach(async () => {
    WarungKesukaanIdb.hapusWarung(1);
  });

  it('tidak menampilkan "button suka" ketika warung telah disukai', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });
    expect(document.querySelector('[aria-label="suka warung"]')).toBeFalsy();
  });
  it('menampilkan "button tidak suka" ketika warung telah disukai', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });
    expect(document.querySelector('[aria-label="tidak suka warung"]')).toBeTruthy();
  });

  it('menghapus warung dari daftar kesukaan', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });
    document.querySelector('#sukaButton').dispatchEvent(new Event('click'));
    expect(await WarungKesukaanIdb.semuaWarung()).toEqual([]);
  });

  it('tidak menampilkan error ketika warung tidak ada dalam daftar kesukaan', async () => {
    await TestFactories.membuatLikeButtonPresenterWarung({ id: 1 });
    await WarungKesukaanIdb.hapusWarung(1);
    document.querySelector('#sukaButton').dispatchEvent(new Event('click'));
    expect(await WarungKesukaanIdb.semuaWarung()).toEqual([]);
  });
});
