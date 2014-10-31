/**
 |------------------------------------------------------------|
 | Fit images                                                 |
 |------------------------------------------------------------|
 */

var fitImages = function(options) {

  $(window).on('resize', function(){

    $(options.imageWrapper).height($(options.container).height());

    $(options.imageWrapper).imgLiquid({
      fill: false,
      horizontalAlign: "center",
      verticalAlign: "center"
    });

  }).resize();

}
;/**
 |------------------------------------------------------------|
 | jQuery UI Helper Functions                                 |
 |------------------------------------------------------------|
 */

/**
 * Remove ui classes
 *
 * Removes multiple classes in jQuery ui widget factory
 * objects - use in the create event handler
 */
var uiWidgetRemoveClasses = function(event, ui) {

  // save this
  var that = this;

  // array of classes to remove
  var classesToRemove = [
    'ui-corner-all',
    'ui-corner-top',
    'ui-corner-bottom',
    'ui-corner-right',
    'ui-corner-left',
    'ui-corner-tl',
    'ui-corner-tr',
    'ui-corner-bl',
    'ui-corner-br'
  ];


  // loop each class
  $.each(classesToRemove, function(idx, val) {

    // remove the class if it exists in that
    $('.' + val, that).removeClass(val);

  });

}



/**
 * Persist hashes
 *
 * Adds the fragment to the url in jQuery ui tabs objects
 * and binds the hashchange so it re-clicks the right a link
 *
 * event = the ui tabs event that was emitted
 * ui = the ui instance
 * selector = the selector of the whole tabs object in the markup
 */
var uiWidgetPersistHash = function(event, ui, selector) {
  // make our hash
  var hash = '#'+ui.newPanel.attr('id');

  // update url
  $.route(hash);

  // bind our hashchange, refreshing the tabs
  $.route(function(hash) {
    $('a[href='+hash+']', selector).click();
  });
}
;/**
 |------------------------------------------------------------|
 | Media Query Helper Functions                               |
 |------------------------------------------------------------|
 */

/**
 * Global media query numbers
 *
 * match these to our sass in _vars.scss
 */
var lapStart      = 570,
    deskStart     = 1024,
    deskWideStart = 1200,
    palmEnd       = lapStart - 1,
    lapEnd        = deskStart - 1;

/**
 * makeMq
 *
 * @param string palm|lap|lapAndUp|portable|desk|deskWide
 * @return mixed window.matchMedia|false
 */
var makeMq = function (size) {



  // switch on size, return a media query if we have a valid size string
  switch (size) {

    case "palm":
      return window.matchMedia('(max-width:'+palmEnd+'px)');
      break;

    case "lap":
      return window.matchMedia('(min-width:'+lapStart+'px) and (max-width:'+lapEnd+'px)');
      break;

    case "lapAndUp":
      return window.matchMedia('(min-width:'+lapStart+'px)');
      break;

    case "portable":
      return window.matchMedia('(max-width:'+lapEnd+'px)');
      break;

    case "desk":
      return window.matchMedia('(min-width:'+deskStart+'px)');
      break;

    case "deskWide":
      return window.matchMedia('(min-width:'+deskWideStart+'px)');
      break;

    default:
      return false;

  }

}
;/**
 |------------------------------------------------------------|
 | Collapse                                                   |
 |------------------------------------------------------------|
 | Collapses an element, but only for the given media query   |
 | Requires matchMedia and only works with html lists for now |
 |------------------------------------------------------------|
 */

function Collapse() {

  var self = riot.observable(this);

  /**
   * Init
   *
   * Loop each element adding a media query listener to run self.attach / self.detach
   *
   * @param string attribute - must contain a size which matches up with our sass media queries
   */
  self.init = function(attribute, attributeTriggerText) {

    $('['+attribute+']').each(function(){

      // get size
      var $elem = $(this),
          size  = $elem.attr(attribute);

      // make it a media query
      var mq = makeMq(size);

      // make a function for this element
      var handleCollapseMQ = function(mql) {

        if (mql.matches) {
          self.attach($elem, attributeTriggerText);
        } else {
          self.detach($elem);
        }

      }

      // add a listener to it
      mq.addListener(handleCollapseMQ);

      // send our mq to be handled
      handleCollapseMQ(mq);

    });

  }


  /**
   * Attach
   *
   * Adds and binds a trigger to fire the self.open and self.close functions
   *
   * @param object $elem
   */
  self.attach = function($elem, attributeTriggerText) {

    // setup
    var triggerText = $elem.attr(attributeTriggerText);
    if ( triggerText === undefined || triggerText == '' ) {
      triggerText = 'More Info';
    }
    $elem.attr('data-sc-collapse-attached', true);
    $elem.prepend('<li class="collapse-trigger" data-sc-collapse-trigger>'+triggerText+'<i class="icon__chevron-down" aria-hidden="true"></i></li>')
    $elem.css({overflow : 'hidden'});

    // get our trigger
    var $trigger = $elem.find('[data-sc-collapse-trigger]');

    // close it to start with
    self.close($elem, $trigger, true);

    // bind clicks
    $trigger.on('click', function(){

      var state = $(this).attr('data-sc-collapse-trigger');

      if ( state == 'open' ) {
        self.close($elem, $trigger);
      } else {
        self.open($elem, $trigger);
      }

    });

  }


  /**
   * Detach
   *
   * Removes trigger and resets the given element
   *
   * @param object $elem
   */
  self.detach = function($elem) {
    $elem.removeAttr('data-sc-collapse-attached').removeAttr('style');
    $elem.find('[data-sc-collapse-trigger]').remove();
  }


  /**
   * Open
   *
   * Updates the trigger and opens the collapsed element
   *
   * @param object $elem
   * @param object $trigger
   */
  self.open = function($elem, $trigger) {

    // update trigger
    $trigger.attr('data-sc-collapse-trigger', 'open');
    $trigger.find('.icon__chevron-down').toggleClass('icon__chevron-down icon__chevron-up');

    // get original height
    var originalHeight = $trigger.attr('data-sc-collapse-original-height');

    // reset elem height
    $elem.animate({ height: originalHeight }, 600);

  }


  /**
   * Close
   *
   * Updates the trigger and closes the collapsed element
   * pass the third param as true to run the initial closing logic
   *
   * @param object $elem
   * @param object $trigger
   * @param boolean first
   */
  self.close = function($elem, $trigger, first) {

    // update trigger
    $trigger.attr('data-sc-collapse-trigger', 'closed');
    $trigger.find('.icon__chevron-up').toggleClass('icon__chevron-up icon__chevron-down');

    // save original height of $elem
    $trigger.attr('data-sc-collapse-original-height', $elem.outerHeight());

    // get height of trigger
    var triggerHeight = $trigger.outerHeight(true);

    // set elem height
    if ( first ) {
      $elem.css({ height: triggerHeight });
    } else {
      $elem.animate({ height: triggerHeight }, 600);
    }

  }

}
;/**
 |------------------------------------------------------------|
 | Fetch                                                      |
 |------------------------------------------------------------|
 | Gets a resource and loads it into the calling element      |
 |------------------------------------------------------------|
 */

function Fetch() {

  var self = riot.observable(this);

  /**
   * Init
   *
   * Loops all elements that match the seletcer and loads their target urls
   * using the given method or defaulting to append
   *
   * @param string attribute - this attr should contain a url (relative allowed)
   * @param string methodAttribute - a data attribute containg the method for adding the data
   */
  self.init = function(attribute, methodAttribute) {

    $('['+attribute+']').each(function(){

      var url     = $(this).attr(attribute),
          $target = $(this),
          method  = $(this).attr(methodAttribute);

      $.get(url, function(data) {
        if ( method == 'replace' ) {
          $target.html(data);
        } else if ( method == 'prepend' ) {
          $target.prepend(data);
        } else {
          $target.append(data);
        }
      });

    });

  }

}
;/**
 |------------------------------------------------------------|
 | Gallery                                                    |
 |------------------------------------------------------------|
 | Using Owl to display a collection of elements in a variety |
 | of ways.                                                   |
 |                                                            |
 | Supported types are: fade (cycle2), slide (owl) and slide  |
 | in modal (owl).                                            |
 |------------------------------------------------------------|
 */

function Gallery() {

  var self  = riot.observable(this),
      modal = new Modal(),
      attr  = '',
      startingImage = 0;

  /**
   * Init
   *
   * Loops all galleries on the page and attaches based on which type it is
   *
   * @param string attribute - this can contain one of the following: fade, slide, lightbox, defaults to fade
   */
  self.init = function(attribute) {

    attr = attribute;

    $('['+attr+']').each(function(){

      var $t = $(this),
          type = $t.attr(attr);

      switch (type) {

        case 'slide':
          self.attachSlide($t);
        break;

        case 'lightbox':
          self.attachModal($t);
        break;

        case 'fade':
        default:
          self.attachFade($t);

      }

    });

  }


  /**
   * attachFade
   *
   * @param object $elem
   */
  self.attachFade = function($elem) {

    var options = {
      loop:true,
      autoplay:true,
      autoplayTimeout:8000,
      autoplayHoverPause:true,
      items:1,
      animateOut:'fadeOut',
      mouseDrag:false,
      touchDrag:true,
      dots:false,
      nav:true
    };

    $elem.addClass('owl-carousel').owlCarousel(options);
  }


  /**
   * attachSlide
   *
   * @param object $elem
   */
  self.attachSlide = function($elem) {

    // make some assumptions
    var options = {
      items:1
    };

    // multiple
    if ( $elem.attr(attr+'-multiple') === 'true' ) {
      options = {
        items : 4
      };
    }

    // kick it off
    $elem.addClass('owl-carousel').owlCarousel(options);

    // ping window resize for fitted images
    $(window).resize();
  }


  /**
   * attachModal
   *
   * @param object $elem
   */
  self.attachModal = function($elem) {

    // set up for fitImages
    var shouldFitImages = $elem.attr(attr+'-fitimages');


    // loop each a, copying the href to a set of img tags
    // we can then later open with a modal
    var $trigger = $elem.find('a'),
        html = '<div data-sc-gallery>';

    $trigger.each(function(i){
      if ( $(this).data('sc-caption') ) {
        html += "<figure><img src='" + $(this).attr('href') + "'><figcaption>"+$(this).data('sc-caption')+"</figcaption></figure>";
      } else {
        html += "<figure><img src='" + $(this).attr('href') + "'></figure>";
      }
    });

    html += '</div>';


    // on trigger click
    $trigger.on('click', function(e){
      e.preventDefault();


      // get current position
      startingImage = $trigger.index($(this));


      // show modal
      modal.show();


      // before we open check if we're just doing a re-open and if so
      // skip to the right slide before we do open up
      modal.on('modalBeforeOpen', function($modal){

        if ( $modal.find('[data-sc-gallery]').length > 0 ) {
          $modal.find('[data-sc-gallery]').trigger('to.owl.carousel', [startingImage, '0']);
          console.log(startingImage);
        }

      });


      // on open, insert images if we need to
      modal.on('modalOpen', function($modal){

        if ( $modal.find('[data-sc-gallery]').length < 1 ) {

          // add our new html to modal
          $modal.html(html);

          // cache it
          var $gallery = $modal.find('[data-sc-gallery]');

          // hide it first
          $gallery.hide();

          // wait for images to load
          $gallery.imagesLoaded( function() {

            // fit images
            if ( shouldFitImages === 'true' ) {
              fitImages({
                'imageWrapper' : '.modal figure',
                'container' : '.modal-inner'
              });
            }

            // make it an owl
            $gallery.owlCarousel({
              items:1,
              nav:true,
              loop:true,
              navText:['<i class="icon__chevron-alt-left"></i>','<i class="icon__chevron-alt-right"></i>']
            });

            // skip to right slide
            $gallery.trigger('to.owl.carousel', [startingImage, '0']);

            // show the owl
            $gallery.show();

          });

        }

        // ping window resize
        $(window).resize();

      });

    });

  }

}
;/**
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
      $modalClose = $('<button type="button" class="modal-close  icon__cancel-white"/>');

  $modal.hide().css({
    'position' : 'fixed',
    'z-index' : '200'
  }).append($modalClose).append($modalInner);

  $modalClose.on('click', function(){
    self.hide();
  });


  self.show = function() {

    // add the model if it's not already there
    if ( $('body').find($modal).length < 1 ) {
      $('body').append($modal);
    }

    // show it
    self.trigger('modalBeforeOpen', $modalInner);
    $modal.fadeIn(250, function(){
      self.trigger('modalOpen', $modalInner);
    });

  }


  self.hide = function() {

    // hide modal
    $modal.fadeOut(250, function(){
      self.trigger('modalClosed');
    });

  }

}
;/**
 |------------------------------------------------------------|
 | Off Canvas                                                 |
 |------------------------------------------------------------|
 | Toggles offcanvas classes                                  |
 |------------------------------------------------------------|
 */

function OffCanvas() {

  var self = riot.observable(this);

  /**
   * Run
   *
   * Triggering element provides the primary and secondary
   * selectors in the appropriate data attributes
   *
   * @param selector trigger
   */
  self.run = function(trigger) {

    var primary = $(trigger).data('sc-offcanvas-primary'),
        secondary = $(trigger).data('sc-offcanvas-secondary');

    $('body').toggleClass('offcanvas--active');

  }

}
;/**
 |------------------------------------------------------------|
 | Popup                                                      |
 |------------------------------------------------------------|
 | Opens a browser window like a pop-up, centered             |
 |------------------------------------------------------------|
 */

function Popup() {

  var self = riot.observable(this);

  /**
   * Open
   *
   * @param string url
   * @param string title
   * @param string width
   * @param string height
   */
  self.open = function(url, title, w, h) {

    // yoink: http://stackoverflow.com/a/5681473/956784

    var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var wTop = window.screenTop ? window.screenTop : window.screenY;

    var left = wLeft + (window.innerWidth / 2) - (w / 2);
    var top = wTop + (window.innerHeight / 2) - (h / 2);

    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  }

}
;/**
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
;/**
 |------------------------------------------------------------|
 | Tabs                                                       |
 |------------------------------------------------------------|
 | Depends on the jQuery UI tabs widget                       |
 |------------------------------------------------------------|
 */

function Tabs() {

  var self = riot.observable(this);

  /**
   * Init
   *
   * Loops elements and initializes jQuery UI tabs on them,
   * optionally with persitsting hashes.
   *
   * @param string attribute - could contain a method
   */
  self.init = function(attribute) {

    $('['+attribute+']').each(function() {

      var method = $(this).attr(attribute);

      if ( method === 'persist' ) {

        $(this).tabs({
          create: uiWidgetRemoveClasses,
          activate: function(event, ui) {
            uiWidgetPersistHash(event, ui, selector);
          }
        });

      } else {

        $(this).tabs({
          create: uiWidgetRemoveClasses
        });

      }

    });

  }

}
;/**
 |------------------------------------------------------------|
 | Titlebar                                                   |
 |------------------------------------------------------------|
 */

function Titlebar()
{

  var self = riot.observable(this);

  /**
   * Open
   */
  self.activate = function()
  {

    $('.title-bar').addClass('title-bar--active');

    $('.title-bar .search input').focus();

  }


  /**
   * Close
   */
  self.deactivate = function()
  {

    $('.title-bar').removeClass('title-bar--active');

  }

}
;(function() { 'use strict';


  /**
   * Load model
   */
  window.collapse = new Collapse();


  /**
   * Initialize
   */
  collapse.init('data-sc-collapse', 'data-sc-collapse-trigger-text');


})();
;(function() { 'use strict';


  /**
   * Load model
   */
  window.fetch = new Fetch();


  /**
   * Initialize
   */
  fetch.init('data-sc-fetch', 'data-sc-fetch-method');


})();
;(function() { 'use strict';


  /**
   * Load model
   */
  window.gallery = new Gallery();


  /**
   * Initialize
   */
  gallery.init('data-sc-gallery');


})();
;(function() { 'use strict';


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
;(function() { 'use strict';


  /**
   * Load model
   */
  window.popup = new Popup();


  /**
   * Bind clicks
   */
  $('[data-sc-popup]').on('click', function(e){

    e.preventDefault();

    popup.open($(this).attr('href'), 'Twitter', '640', '420');

  });


})();
;(function() { 'use strict';


  /**
   * Load model
   */
  window.tabs = new Tabs();


  /**
   * Initialize
   */
  tabs.init('data-sc-tabs');


})();
;(function() { 'use strict';


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

  $('.title-bar').on('focus click', '.search', function(e){

    e.stopPropagation();

    titlebar.activate();

  });


})();
;/**
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


})();
