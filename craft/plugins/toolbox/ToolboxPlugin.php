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

class ToolboxPlugin extends BasePlugin
{

  public function init()
  {

    // check its a cp request and that they're logged in
    if ( craft()->request->isCpRequest() && craft()->userSession->isLoggedIn() )
    {

      // load up freshdesk stuff
      craft()->templates->includeJsFile('https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js');
      craft()->templates->includeCssFile('https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css');

      // add our stuff and init the takeover
      craft()->templates->includeJsResource('toolbox/js/toolbox-cp.js');
      craft()->templates->includeCssResource('toolbox/css/toolbox-cp.css');
      craft()->templates->includeJs('new Craft.ToolboxCp();');

    }

  }

  public function getName()
  {
    return Craft::t('Toolbox');
  }

  public function getVersion()
  {
    return '1.0';
  }

  public function getDeveloper()
  {
    return 'Supercool';
  }

  public function getDeveloperUrl()
  {
    return 'http://www.supercooldesign.co.uk';
  }

  public function hasCpSection()
  {
    return true;
  }

}
