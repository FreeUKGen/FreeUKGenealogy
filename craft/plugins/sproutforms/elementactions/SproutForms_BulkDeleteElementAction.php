<?php
namespace Craft;

/**
 * Delete SproutForms Contact Element Action
 */

class SproutForms_BulkDeleteElementAction extends BaseElementAction
{
	// Public Methods
	// =========================================================================

	/**
	 * @inheritDoc IComponentType::getName()
	 *
	 * @return string
	 */
	public function getName()
	{
		return Craft::t('Delete');
	}

	/**
	 * @inheritDoc IElementAction::isDestructive()
	 *
	 * @return bool
	 */
	public function isDestructive()
	{
		return true;
	}
		
	/**
	 * @inheritDoc IElementAction::performAction()
	 *
	 * @param ElementCriteriaModel $criteria
	 *
	 * @return bool
	 */
	public function performAction(ElementCriteriaModel $criteria)
	{
		// Delete the users
		$entries = $criteria->find();

		foreach ($entries as $entry)
		{
			craft()->sproutForms_entries->deleteEntry($entry);
		} 

		$this->setMessage(Craft::t('Contacts deleted.'));

		return true;
	} 

	// Protected Methods
	// =========================================================================

	/**
	 * @inheritDoc BaseElementAction::defineParams()
	 *
	 * @return array
	 */
	protected function defineParams()
	{
		return array(
			'label' => array(AttributeType::String, 'default' => Craft::t('Delete')),
		);
	}
}
