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


  /**
   * Sub nav hide / show
   */
  $('.show-sub-nav').on('click', function(e){

    e.preventDefault();

    $(this).toggleClass('show-sub-nav--active');
    $(this).parents('.title-block').toggleClass('title-block--collapse-on-palm');
    $(this).parents('.title-block').next('.sub-nav').toggleClass('sub-nav--active');

  });


  /**
   * Mailchimp
   */
  // set up modal
  var mailchimpModal = new Modal(),
      $mailchimpForm = $('.mailchimp-form');

  mailchimpModal.on('modalBeforeOpen', function($modal){

    if ( $modal.find('.mailchimp-form').length < 1 )
    {

      // add a mailchimp wrapping class
      $modal.parents('.modal').addClass('modal--mailchimp');

      // add our form
      $modal.html($mailchimpForm);

      // make a close button inside and bind it
      var $newClose = $('<button type="button" class="mailchimp-close  icon__cancel-white" />');

      $newClose.on('click', function(e){

        e.preventDefault();

        $modal.parents('.modal').find('> .modal-close').click();
      });

      $modal.append($newClose);

      // show the form now we've moved it into the modal
      $mailchimpForm.show();

    }

  });

  // bind trigger
  $('.show-mailchimp-form').on('click', function(e){

    e.preventDefault();

    mailchimpModal.show();

  });


  /**
   * Scroll stickyness for header - only for desktops
   */
  // make scroller and scene and add as default
  var scroller    = new ScrollMagic(),
      headerScene = new ScrollScene({ offset: 20 });

  // make a media query
  var scrollerMq = makeMq('lapAndUp');

  // make a function to handle it
  var handleScrollerMQ = function(mql) {

    if (mql.matches)
    {
      headerScene.setPin(".site__header");
      headerScene.setClassToggle("body", "sticky");
      headerScene.addTo(scroller);
    }
    else
    {
      headerScene.remove();
      headerScene.removePin();
      headerScene.removeTween();
    }

  }

  // add a listener to it
  scrollerMq.addListener(handleScrollerMQ);

  // send our mq to be handled
  handleScrollerMQ(scrollerMq);


  /**
   * Article form validaton
   */
  if ( $('.article__form form').length )
  {
    $('.article__form form label.required').each(function(){
      var $field = $(this).parents('.heading').parents('.field'),
          id = $field.attr('id');

      $(this).parents('.heading').next('.input').find('input, select, textarea').prop('required', true);

      if ( $field.hasClass('checkboxes') || $field.hasClass('radiobuttons') )
      {
        $field.find('.input').append('<div id="errors-'+id+'"/>');
        $field.find('input').attr('data-parsley-errors-container', '#errors-'+id);

        if ( $field.find('input').length > 1 )
        {
          $field.find('input').attr('data-parsley-required-message', 'Please select at least one option.');
        }
      }

    }).promise().done(function(){
      $('.article__form form').parsley();
    });
  }


})();
