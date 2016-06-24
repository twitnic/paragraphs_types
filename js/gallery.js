jQuery(document).ready(function($) {
  'use strict';

  var openWondrousPhotoSwipe = function(galleryIndex, imgIndex, animationOrigin) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    // define the gallery
    var items = wondrousParagraphGalleries[galleryIndex];
    // define options (if needed)
    var options = {
      getThumbBoundsFn: function() {
        return animationOrigin;
      },
      history: true,
      focus: true,
      index: imgIndex,
      showHideOpacity: true,
      showAnimationDuration: 333,
      hideAnimationDuration: 333,
      shareEl: false,
      zoomEl: false,
    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.listen('gettingData', function(index, item) {
      if (item.w < 1 || item.h < 1) { // unknown size
        var img = new Image();
        img.onload = function() { // will get size after load
          item.w = this.width; // set image width
          item.h = this.height; // set image height
          gallery.invalidateCurrItems(); // reinit Items
          gallery.updateSize(true); // reinit Items
        }
        img.src = item.src; // let's download image
      }
    });
    gallery.init();
  };
  $('.open-wondrous-gallery').on('click', function(event) {
    event.preventDefault();
    var imgIndex = 0;
    if ($(this).hasClass('img-thumbnail')) {
      imgIndex = $('.img-thumbnail').index($(this));
    }
    var galleryIndex = 0;
    openWondrousPhotoSwipe(galleryIndex, imgIndex, null);
  });
});