/**
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
