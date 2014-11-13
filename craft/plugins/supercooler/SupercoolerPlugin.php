<?php

/**
 * Supercooler by Supercool.
 *
 * Simply installs our default fields and channels etc
 *
 * @package   Supercooler
 * @author    Josh Angell
 * @copyright Copyright (c) 2014, Supercool
 */

namespace Craft;

class SupercoolerPlugin extends BasePlugin
{

  function getName()
  {
    return Craft::t('Supercooler');
  }

  function getVersion()
  {
    return '1.0';
  }

  function getDeveloper()
  {
    return 'Supercool';
  }

  function getDeveloperUrl()
  {
    return 'http://supercooldesign.co.uk';
  }

  function hasCpSection()
  {
    return true;
  }

}
