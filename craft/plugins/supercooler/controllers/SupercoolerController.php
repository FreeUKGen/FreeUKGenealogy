<?php

/**
 * Supercooler by Supercool.
 *
 * @package   Supercooler
 * @author    Josh Angell
 * @copyright Copyright (c) 2014, Supercool
 */

namespace Craft;

class SupercoolerController extends BaseController
{

  public function actionRun()
  {

    craft()->supercooler->run();

  }

}
