'use strict';
(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];
  var PHOTO_ELMENT_CLASS = 'ad-form__photo';

  var PhotoParameter = {
    width: 70,
    heigth: 70,
    alt: 'Фотография жилья'
  };

  var createPhoto = window.card.createPhoto;
  var appendElement = window.utils.appendElement;
  var form = window.form.element;

  var avatarImg = form.querySelector('.ad-form__field input[type=file]');
  var photoImg = form.querySelector('.ad-form__upload input[type=file]');
  var previewAvatar = form.querySelector('.ad-form-header__preview img');
  var photoContainer = form.querySelector('.ad-form__photo-container');
  var previewPhoto = photoContainer.querySelector('.ad-form__photo');
  var deafultAvatar = previewAvatar.src;
  var photoArray = [];

  function showImage(element, onLoad) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        onLoad(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }

  function createPhotoElement(src) {
    var element = document.createElement('div');
    element.classList.add(PHOTO_ELMENT_CLASS);
    var image = createPhoto(src, PhotoParameter.alt, PhotoParameter.width, PhotoParameter.heigth, PHOTO_ELMENT_CLASS);
    appendElement(image, element);
    photoArray.push(element);
    photoContainer.insertBefore(element, previewPhoto);
  }

  function resetPhoto() {
    if (photoArray) {
      photoArray.forEach(function (photo) {
        photo.remove();
      });
    }
    photoArray = [];
    previewAvatar.src = deafultAvatar;
  }

  avatarImg.addEventListener('change', function () {
    showImage(avatarImg, function (image) {
      previewAvatar.src = image;
    });
  });

  photoImg.addEventListener('change', function () {
    showImage(photoImg, createPhotoElement);
  });

  window.preview = {
    resetPhoto: resetPhoto
  };
})();
