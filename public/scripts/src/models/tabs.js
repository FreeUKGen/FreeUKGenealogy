/**
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
