<?php

/**
 * Help plugin by Supercool.
 *
 * @package   Help
 * @author    Josh Angell
 * @copyright Copyright (c) 2014, Supercool
 */

namespace Craft;

class HelpPlugin extends BasePlugin
{
  function getName()
  {
    return Craft::t('Help');
  }

  function getVersion()
  {
    return '0.2';
  }

  function getDeveloper()
  {
    return 'Supercool';
  }

  function getDeveloperUrl()
  {
    return 'http://supercooldesign.co.uk';
  }

  public function hasCpSection()
  {
      return true;
  }
}
