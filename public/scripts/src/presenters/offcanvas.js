(function() { 'use strict';


  /**
   * Load model
   */
  window.offcanvas = new OffCanvas();


  /**
   * Bind offcanvas trigger click
   */
  $('[data-sc-offcanvas-trigger]').on('click', function(e){
    e.preventDefault();
    offcanvas.run($(this));
  });


})();
