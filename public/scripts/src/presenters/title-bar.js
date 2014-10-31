(function() { 'use strict';


  /**
   * Load model
   */
  window.titlebar = new Titlebar();


  /**
   * Bind clicks
   */
  $(document).on('click', function() {

    titlebar.deactivate();

  });

  $('.title-bar').on('click', '.search', function(e){

    e.stopPropagation();

    titlebar.activate();

  });


})();
