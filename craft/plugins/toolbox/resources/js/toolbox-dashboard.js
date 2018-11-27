/**
 * @author    Supercool Ltd <josh@supercooldesign.co.uk>
 * @copyright Copyright (c) 2014, Supercool Ltd
 * @see       http://supercooldesign.co.uk
 * @package   Toolbox
 */

(function($){

/**
 * ToolboxDashboard
 */
Craft.ToolboxDashboard = Garnish.Base.extend(
{

  init: function()
  {

    this.addListener(Garnish.$win, 'load', $.proxy(function()
    {
      $('.toolbox_dashboard.pane').removeClass('pane').show();
    }), this);

  }

});

})(jQuery);
