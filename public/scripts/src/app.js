/**
 |-------------------------------------------------------------|
 | App - our main presenter file                               |
 |-------------------------------------------------------------|
 | Here is all the presenter code that is not in the main      |
 | library concatenated by grunt                               |
 |-------------------------------------------------------------|
 */

(function() { 'use strict';


  /**
   * Initialize the placeholder polyfill
   */
  $('input, textarea').placeholder();


  $('.show-sub-nav').on('click', function(e){

    e.preventDefault();

    $(this).toggleClass('show-sub-nav--active');
    $(this).parents('.title-block').next('.sub-nav').toggleClass('sub-nav--active');

  });

})();
