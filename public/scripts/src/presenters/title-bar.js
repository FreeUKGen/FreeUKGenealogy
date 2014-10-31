(function() { 'use strict';


  /**
   * Load model
   */
  window.titlebar = new Titlebar();



  $(document).on('click', function() {
    titlebar.deactivate();
  });


  // $('.title-bar').on('submit', '.search', function(e){
  //
  //   e.stopPropagation();
  //
  //   if ( $('.title-bar').hasClass('title-bar--active') )
  //   {
  //     return true;
  //   }
  //   else
  //   {
  //     return false;
  //   }
  //
  // });

  $('.title-bar').on('focus click', '.search', function(e){

    e.stopPropagation();

    titlebar.activate();

  });


})();
