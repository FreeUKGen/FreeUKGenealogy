/**
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
