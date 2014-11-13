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

class ToolboxService extends BaseApplicationComponent
{

  public function getReleaseNotes($limit = null)
  {

    $configPath = craft()->path->getConfigPath();

    $path = $configPath . 'release-notes.json';

    if ( $file = IOHelper::getFileContents($path) )
    {
      $jsonArray = JsonHelper::decode($file);
      if ( $limit != null )
      {
        return array_slice($jsonArray, 0, $limit);
      }
      else
      {
        return $jsonArray;
      }
    }
    else
    {
      return false;
    }

  }

}
