(function() { 'use strict';


  /**
   * Load model
   */
  window.popup = new Popup();


  /**
   * Bind clicks
   */
  $('[data-sc-popup]').on('click', function(e){

    e.preventDefault();

    popup.open($(this).attr('href'), 'Twitter', '640', '400');

  });


})();
