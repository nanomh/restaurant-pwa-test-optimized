import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';

const membuatLikeButtonPresenterWarung = async (warung) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    notifContainer: document.querySelector('#notif-favorite-container'),
    warung,
  });
};

export { membuatLikeButtonPresenterWarung };
