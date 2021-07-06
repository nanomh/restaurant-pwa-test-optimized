const CariButtonPresenter = {
  async init({ cariButtonContainer, warung2 }) {
    this._cariButtonContainer = cariButtonContainer;
    this._warung = warung2;
    await this._renderButton();
  },
  async _renderButton() {
    const toko = this._warung;
    this._cariButtonContainer.addEventListener('click', async () => {
      const kunci = document.getElementById('pencarian').value;
      const kata_kunci = [];
      kata_kunci.push(kunci);
      localStorage.setItem('kata_kunci', JSON.stringify(kata_kunci));
      location.reload();
    });
  },
};

export default CariButtonPresenter;
