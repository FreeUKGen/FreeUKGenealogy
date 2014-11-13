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

class ToolboxVariable
{

  public function getReleaseNotes($limit = null)
  {

    if ( $returnArray = craft()->toolbox->getReleaseNotes($limit) ) {
      return $returnArray;
    } else {
      return false;
    }

  }

}
