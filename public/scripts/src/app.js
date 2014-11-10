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

})();
