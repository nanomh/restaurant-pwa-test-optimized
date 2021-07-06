const assert = require('assert');

Feature('Menyukai Warung');

Before(({ I }) => {
  I.amOnPage('/#/kesukaan');
});
Scenario('menampilkan halaman kesukaan kosong', async ({ I }) => {
  I.seeElement('#posting-kesukaan');
  I.see('Belum ada warung kesukaanmu', '.kesukaan-kosong-tag');
});
Scenario('menyukai satu warung dari halaman detail', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.posting-item-title');
  const warungPertama = locate('.posting-item-title').first();
  const sukaPertama = locate('#sukaButton').first();
  const clickWarungPertama = await I.grabTextFrom(warungPertama);
  I.click(warungPertama);
  I.seeElement('#sukaButton');
  I.click('#sukaButton');
  I.seeElement('#suka-notif');
  I.amOnPage('/#/kesukaan');
  I.seeElement('.posting-item-title');
  const sukaWarungPertama = await I.grabTextFrom('.posting-item-title');
  assert.strictEqual(clickWarungPertama, sukaWarungPertama);
});

Scenario('Menyukai kemuadian tidak menyukai warung dari halaman detail', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.posting-item-title');
  const warungPertama = locate('.posting-item-title').first();
  const sukaPertama = locate('#sukaButton').first();
  const clickWarungPertama = await I.grabTextFrom(warungPertama);
  I.click(warungPertama);
  I.amOnPage('/#/detail');
  I.seeElement('#sukaButton');
  I.click(sukaPertama);
  I.seeElement('#suka-notif');
  I.amOnPage('/#/kesukaan');
  I.seeElement('.posting-item-title');
  const tidakSukaWarungPertama = locate('.posting-item-title').first();
  const sukaWarungPertama = await I.grabTextFrom(tidakSukaWarungPertama);
  assert.strictEqual(sukaWarungPertama, clickWarungPertama);
  I.seeElement('.posting-item-a');
  I.click('.posting-item-a');
  I.amOnPage('/#/detail');
  I.seeElement('.detail-warung-title');
  I.seeElement('[aria-label="tidak suka warung"]');
  I.click('[aria-label="tidak suka warung"]');
  I.seeElement('#suka-notif');
  I.amOnPage('/#/kesukaan');
  I.see('Belum ada warung kesukaanmu', '.kesukaan-kosong-tag');
});
Scenario('menyukai satu warung dari halaman beranda', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.posting-item-title');
  const warungPertama = locate('.posting-item-title').first();
  const clickWarungPertama = await I.grabTextFrom(warungPertama);
  I.seeElement('#arqdv5juczeskfw1e867');
  I.click('#arqdv5juczeskfw1e867');
  I.seeElement('#suka-notif');
  I.amOnPage('/#/kesukaan');
  I.seeElement('.posting-item-title');
  const sukaWarungPertama = await I.grabTextFrom('.posting-item-title');
  assert.strictEqual(clickWarungPertama, sukaWarungPertama);
});
Scenario('menyukai kemudian tidak menyukai warung dari halaman beranda', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.posting-item-title');
  const warungPertama = locate('.posting-item-title').first();
  const clickWarungPertama = await I.grabTextFrom(warungPertama);
  I.seeElement('#arqdv5juczeskfw1e867');
  I.click('#arqdv5juczeskfw1e867');
  I.seeElement('#suka-notif');
  I.amOnPage('/#/kesukaan');
  I.seeElement('.posting-item-title');
  const sukaWarungPertama = await I.grabTextFrom('.posting-item-title');
  assert.strictEqual(clickWarungPertama, sukaWarungPertama);
  I.amOnPage('/');
  I.seeElement('.posting-item-title');
  I.seeElement('#arqdv5juczeskfw1e867');
  I.click('#arqdv5juczeskfw1e867');
  I.seeElement('#suka-notif');
  I.amOnPage('/#/kesukaan');
  I.see('Belum ada warung kesukaanmu', '.kesukaan-kosong-tag');
});
Scenario('Posting ulasan', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.posting-item-title');
  I.click(locate('.posting-item-title').first());
  I.amOnPage('/#/detail');
  I.seeElement('.form-ulasan-element');
  I.click('#name');
  I.type('Nano M Husen');
  I.click('#review');
  I.type('Lezat Sekali masakan disini, harganya juga murah, pelayannya cantik cantik');
  I.seeElement('.form-ulasan-element');
  I.click('#name');
  I.seeElement('#button-ulasan');
  I.click('#button-ulasan');
  I.see('Berhasil menambahkan Ulasan', '.pesan-ok');
});
Scenario('Mencari Warung dan tidak ditemukan', async ({ I }) => {
  I.amOnPage('/#/cari');
  I.seeElement('#pencarian');
  I.click('#pencarian');
  I.type('kjlg');
  I.seeElement('#button-cari');
  I.click('#button-cari');
  I.seeElement('#form-pencarian-kosong');
  I.see('Pencarian : " kjlg " Tidak ditemukan', '.hasil-pencarian-kosong');
});
Scenario('Mencari Warung dan ditemukan', async ({ I }) => {
  I.amOnPage('/#/cari');
  I.seeElement('#pencarian');
  I.click('#pencarian');
  I.type('air');
  I.seeElement('#button-cari');
  I.click('#button-cari');
  I.seeElement('#form-pencarian-isi');
  I.see('Hasil Pencarian : " air " , Ditemukan sebanyak 13 warung', '.hasil-pencarian-ditemukan');
});
