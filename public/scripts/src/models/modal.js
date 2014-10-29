/**
 |------------------------------------------------------------|
 | Modal                                                      |
 |------------------------------------------------------------|
 | Opens up a modal window on top of a shade.                 |
 |------------------------------------------------------------|
 */

function Modal() {

  var self        = riot.observable(this),
      $modal      = $('<div class="modal"/>'),
      $modalInner = $('<div class="modal-inner"/>'),
      $modalClose = $('<button type="button" class="modal-close  icon__cancel"/>'),
      shade       = new Shade();

  $modal.hide().css({
    'position' : 'fixed',
    'z-index' : '200'
  }).append($modalClose).append($modalInner);

  $modalClose.on('click', function(){
    self.hide();
  });


  self.show = function() {

    // show shade
    shade.show();

    // once its open, show modal
    shade.on('shadeOpen', function(){

      // add the model if it's not already there
      if ( $('body').find($modal).length < 1 ) {
        $('body').append($modal);
      }

      // show it
      self.trigger('modalBeforeOpen', $modalInner);
      $modal.fadeIn(250, function(){
        self.trigger('modalOpen', $modalInner);
      });

    });

  }


  self.hide = function() {

    // hide modal
    $modal.fadeOut(250, function(){
      self.trigger('modalClosed');

      // hide shade
      shade.hide();
    });

  }

}
