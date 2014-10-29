/**
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
