import { RequiredLength } from './requiredLength'

export const Message = {
	ERROR: {
		FAILED_TO_SAVE_BUILD: 'Something went wrong. Failed to save build.',
		CAN_ONLY_HAVE_SIX_PRIMARY_ITEMS: 'A build can only have 6 primary items',
		CREATING_TOO_MANY_BUILDS: "You're creating too many builds. Please try again after 30 minutes.",
		DOES_NOT_HAVE_THREE_TO_SIX_PRIMARY_ITEMS: `A build must have at least ${RequiredLength.ITEMS.PRIMARY.MIN_LENGTH} - ${RequiredLength.ITEMS.PRIMARY.MAX_LENGTH} primary items`,
		ITEM_IS_ALREADY_IN_BUILD: 'That item is already in your build!',
		NO_BUILD_TITLE: 'Please enter a title for your build',
		NO_USERNAME: 'Please enter your username',
		NO_ITEMS_SELECTED: 'Please add items to your build',
		NOT_VALID_BUILD_TITLE: `Something went wrong while processing your build title. Please make sure it's ${RequiredLength.BUILD_TITLE.MIN_LENGTH} - ${RequiredLength.BUILD_TITLE.MAX_LENGTH} characters`,
		NOT_VALID_USERNAME: `Something went wrong while processing your username. Please make sure it's ${RequiredLength.USERNAME.MIN_LENGTH} - ${RequiredLength.USERNAME.MAX_LENGTH} characters`,
		NOT_VALID_ROLE: 'Something went wrong while processing your role. Please try again',
		NOT_VALID_GAME_MODE: 'Something went wrong while processing your game mode. Please try again',
		NOT_VALID_BUILD_DESCRIPTION: 'Something went wrong while processing your build description. Please try again',
		NOT_VALID_CHAMPION: 'Something went wrong while processing your champion. Please try again',
		NOT_VALID_ITEMS_SELECTED: 'Something went wrong while processing the items you selected. Please try again',
		NOT_VALID_NUMBER_OF_ITEMS_SELECTED: `There can only be ${RequiredLength.ITEMS.PRIMARY.MIN_LENGTH} - ${RequiredLength.ITEMS.PRIMARY.MAX_LENGTH} Primary items and up to ${RequiredLength.ITEMS.OPTIONAL.MAX_LENGTH} Optional items`,
		NOT_VALID_RUNES: 'Something went wrong while processing your runes. Please try again',
		NOT_VALID_SPELLS: 'Something went wrong while processing your spells. Please try again',
		NOT_VALID_RANK: 'Something went wrong while processing your rank. Please try again',
		NOT_VALID_REGION: 'Something went wrong while processing your region. Please try again',
		HAS_DUPLICATE_ITEMS: 'Something went wrong while processing your items. Please check for duplicate items'
	},
	SUCCESS: {
		BUILD_SAVED: 'Successfully saved your build!'
	}
}