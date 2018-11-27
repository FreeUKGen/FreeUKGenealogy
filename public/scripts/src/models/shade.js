/**
 |------------------------------------------------------------|
 | Shade                                                      |
 |------------------------------------------------------------|
 | This is simply shows and hides a shade element.            |
 |------------------------------------------------------------|
 */

function Shade() {

  var self   = riot.observable(this),
      $shade = $('<div class="shade" data-sc-shade/>');

  $shade.css({
    'position' : 'fixed',
    'top'      : '0',
    'left'     : '0',
    'right'    : '0',
    'bottom'   : '0',
    'z-index'  : '200'
  }).hide();


  self.show = function() {

    // add the shade if there isn't one
    if ( $('body').find($shade).length < 1 ) {
      $('body').append($shade);
    }

    // open it
    $shade.fadeIn(50, function(){
      self.trigger('shadeOpen', $shade);
    });

  }


  self.hide = function() {

    $shade.fadeOut(50, function(){
      self.trigger('shadeClosed');
    });

  }

}
