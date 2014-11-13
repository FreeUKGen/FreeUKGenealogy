/**
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
