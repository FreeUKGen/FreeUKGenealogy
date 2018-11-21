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
		$arr = array('viagra', 'href=', 'url=', 'link=', 'http:');
		$notspam = true;

/*		if (array_key_exists('message', $_POST['fields']))	*/
		$fields = craft()->request->getPost('fields');
		foreach ($fields as $key => $val) {
			SproutInvisibleCaptchaPlugin::log("Form fields: " . $key . ", value: " . $val, LogLevel::Info, true);
			if ($key == 'message') {
				foreach ($arr as $arr_value)
					if (strpos($_POST['fields']['message'], $arr_value)) $notspam = false;
			}
		}

		if ($verified && $notspam)
		{
			return true;
		}
		else
		{
			if (!$notspam)
				SproutInvisibleCaptchaPlugin::log("A form submission failed because the message contains spam words: " . $_POST['fields']['message'], LogLevel::Info, true);
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
