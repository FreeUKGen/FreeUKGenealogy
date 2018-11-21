/**
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
