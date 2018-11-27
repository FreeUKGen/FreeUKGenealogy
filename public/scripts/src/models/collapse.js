/**
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
