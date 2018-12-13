<?php
namespace Craft;

class SproutInvisibleCaptcha_TimeMethodService extends BaseApplicationComponent implements SproutInvisibleCaptcha_MethodInterfaceService
{
	// Fallback in seconds
	const MIN_ELAPSED_TIME = 2;
	
	// Compare elapsed time between GET and POST requests
	public function verifySubmission()
	{
		$time   = time();
		$posted = (int) craft()->request->getPost('__UATIME', time() );

		// Time operations must be done after values have been properly assigned and casted
		$diff   = ($time - $posted);
		$min 	= (int) $this->getMinElapsedTime();

		// Flag it as a spammy submission based on time
		// @TODO: May convert the minElapsedTime into a global setting
		$verified = (bool) ($diff > $min);

		// added to fileter spam words in message
		$arr = array(
			'href=',
			'link='
			'url=',
			'viagra',
			'yourls.site'
		);
		$spamword = false;
		$emptymsg = false;
		$validemail = true;

//		if (array_key_exists('message', $_POST['fields']))	*/
		$fields = craft()->request->getPost('fields');
		foreach ($fields as $key => $val) {
			SproutInvisibleCaptchaPlugin::log("Form fields: " . $key . ", value: " . $val, LogLevel::Info, true);
			switch ($key) {
				case 'message':
					$msg = trim($val);
					if ($msg != '') {
						foreach ($arr as $arr_value)
							if (stripos($_POST['fields']['message'], $arr_value) !== false) $spamword = true;
					}
					else $emptymsg = true;
					break;
				case 'email': 
					if (!filter_var($_POST['fields']['email'], FILTER_VALIDATE_EMAIL)) $validemail = false;
					break;
				default: 
					break;
			}
		}

		if ($verified && !$spamword && !$emptymsg && $validemail)
		{
			return true;
		}
		else
		{
			if ($spamword)
				SproutInvisibleCaptchaPlugin::log("A form submission failed because the message contains spam words: " . $_POST['fields']['message'], LogLevel::Info, true);
			if ($emptymsg)
				SproutInvisibleCaptchaPlugin::log("A form submission failed because the message field is empty", LogLevel::Info, true);
			if (!$validemail)
				SproutInvisibleCaptchaPlugin::log("A form submission failed because email address " . $_POST['fields']['email'] . " is not valid", LogLevel::Info, true);
			if (!$verified)
				SproutInvisibleCaptchaPlugin::log("A form submission failed because the form was submitted too quickly. The form requires the user to take a minimum of " . $min . " seconds and the form was submitted in: " . $diff . " seconds", LogLevel::Info, true);

			craft()->sproutInvisibleCaptcha->timeMethodFailed = 1;
			return false;
		}
	}


	public function getProtection()
	{
		return $this->getField();
	}

	public function getField()
	{
		return sprintf('
<input type="hidden" id="__UATIME" name="__UATIME" value="%s" />', time() );
	}

	protected function getMinElapsedTime()
	{
		if ( ($elapsedTime = craft()->sproutInvisibleCaptcha->getMethodOption('elapsedTime')) ) {
			return $elapsedTime;
		}

		return self::MIN_ELAPSED_TIME;
	}
	
}
