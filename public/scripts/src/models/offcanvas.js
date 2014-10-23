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

    $(trigger).toggleClass('offcanvas__trigger--active');
    $(primary).toggleClass('offcanvas__primary--active');
    $(secondary).toggleClass('offcanvas__secondary--active');

  }

}
