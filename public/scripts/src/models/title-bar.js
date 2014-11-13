/**
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
