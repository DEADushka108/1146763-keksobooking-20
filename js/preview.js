'use strict';
(function () {
  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  var PhotoParameter = {
    WIDTH: 70,
    HEIGTH: 70,
    ALT: 'Фотография жилья'
  };

  var PreviewSelector = {
    AVATAR: {
      IMAGE: '.ad-form__field input[type=file]',
      PREVIEW: '.ad-form-header__preview img'
    },
    PHOTO: {
      IMAGE: '.ad-form__upload input[type=file]',
      CONTAINER: '.ad-form__photo-container',
      PREVIEW: '.ad-form__photo',
      ELMENT_CLASS: 'ad-form__photo'
    }
  };

  var createPhoto = window.card.createPhoto;
  var appendElement = window.utils.appendElement;
  var form = window.form.element;

  var avatarImage = form.querySelector(PreviewSelector.AVATAR.IMAGE);
  var previewAvatar = form.querySelector(PreviewSelector.AVATAR.PREVIEW);
  var photoImage = form.querySelector(PreviewSelector.PHOTO.IMAGE);
  var photoContainer = form.querySelector(PreviewSelector.PHOTO.CONTAINER);
  var previewPhoto = photoContainer.querySelector(PreviewSelector.PHOTO.PREVIEW);
  var deafultAvatar = previewAvatar.src;
  var previewElements = [];

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

  function createPreviewElement(src) {
    var element = document.createElement('div');
    element.classList.add(PreviewSelector.PHOTO.ELMENT_CLASS);
    var image = createPhoto(src, PhotoParameter.ALT, PhotoParameter.WIDTH, PhotoParameter.HEIGTH);
    appendElement(image, element);
    previewElements.push(element);
    photoContainer.insertBefore(element, previewPhoto);
  }

  function resetPreview() {
    if (previewElements) {
      previewElements.forEach(function (element) {
        element.remove();
      });
    }
    previewElements = [];
    previewAvatar.src = deafultAvatar;
  }

  avatarImage.addEventListener('change', function () {
    showImage(avatarImage, function (image) {
      previewAvatar.src = image;
    });
  });

  photoImage.addEventListener('change', function () {
    showImage(photoImage, createPreviewElement);
  });

  window.preview = {
    resetPreview: resetPreview
  };
})();
