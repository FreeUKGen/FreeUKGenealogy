<?php
namespace Craft;

/**
 * A toolbox for Supercool.
 *
 * @package   Toolbox
 * @author    Josh Angell
 * @copyright Copyright (c) 2014, Supercool Ltd
 * @link      http://www.supercooldesign.co.uk
 */

class Toolbox_DashboardWidget extends BaseWidget
{
  public $colspan = 4;

  public function getName()
  {
    return Craft::t('Toolbox Dashboard');
  }

  public function getTitle()
  {
    return Craft::t('Toolbox Dashboard');
  }

  public function getBodyHtml()
  {

    craft()->templates->includeJsResource('toolbox/js/toolbox-dashboard.js');
    craft()->templates->includeCssResource('toolbox/css/toolbox-dashboard.css');
    craft()->templates->includeJs('new Craft.ToolboxDashboard();');

    return craft()->templates->render('toolbox/dashboard-widget.html');

  }

}
