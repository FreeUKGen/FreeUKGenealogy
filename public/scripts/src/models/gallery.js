/**
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
      attr  = '';

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
      var startingImage = $trigger.index($(this));


      // show modal
      modal.show();


      // before we open check if we're just doing a re-open and if so
      // skip to the right slide before we do open up
      modal.on('modalBeforeOpen', function($modal){

        if ( $modal.find('[data-sc-gallery]').length > 0 ) {
          $modal.find('[data-sc-gallery]').trigger('to.owl.carousel', [startingImage, '0']);
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
              navText:['<i class="icon__chevron-left"></i>','<i class="icon__chevron-right"></i>']
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
