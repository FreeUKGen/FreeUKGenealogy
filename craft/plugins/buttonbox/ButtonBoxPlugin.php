<?php
namespace Craft;

/**
 * ButtonBox by Supercool
 *
 * @package   ButtonBox
 * @author    Josh Angell
 * @copyright Copyright (c) 2014, Supercool Ltd
 * @link      http://www.supercooldesign.co.uk
 */

class ButtonBoxPlugin extends BasePlugin
{

  public function getName()
  {
    return Craft::t('Button Box');
  }

  public function getVersion()
  {
    return '1.1';
  }

  public function getDeveloper()
  {
    return 'Supercool';
  }

  public function getDeveloperUrl()
  {
    return 'http://www.supercooldesign.co.uk';
  }

}
