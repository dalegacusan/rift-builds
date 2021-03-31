import Snackbars from '../../components/Snackbars/Snackbars';
import { Validation } from '../constants/constants'

export const ERROR = {
	BUILD_NOT_SAVED: 'Something went wrong. Failed to save build.',
	CAN_ONLY_HAVE_SIX_PRIMARY_ITEMS: 'A build can only have 6 primary items',
	CREATING_TOO_MANY_BUILDS: "You're creating too many builds. Please try again after 30 minutes.",
	DOES_NOT_HAVE_SIX_PRIMARY_ITEMS: 'A build must have 6 primary items',
	HAS_DUPLICATE_ITEMS: 'That item is already in your build!',
	NO_BUILD_TITLE: 'Please enter a title for your build',
	NO_USERNAME: 'Please enter your username',
	NO_ITEMS_SELECTED: 'Please add items to your build',
	NOT_VALID_BUILD_TITLE: `Something went wrong while processing your build title. Please make sure it's ${Validation.BUILD_TITLE.MIN_LENGTH} - ${Validation.BUILD_TITLE.MAX_LENGTH} characters`,
	NOT_VALID_USERNAME: `Something went wrong while processing your username. Please make sure it's ${Validation.USERNAME.MIN_LENGTH} - ${Validation.USERNAME.MAX_LENGTH} characters`,
	NOT_VALID_ROLE: 'Something went wrong while processing your role. Please try again',
	NOT_VALID_CHAMPION: 'Something went wrong while processing your champion. Please try again',
	NOT_VALID_ITEMS_SELECTED: 'Something went wrong while processing the items you selected. Please try again',
	NOT_VALID_NUMBER_OF_ITEMS_SELECTED: `There can only be ${Validation.ITEMS.MAX_NUMBER_OF_PRIMARY_ITEMS} Primary items and up to ${Validation.ITEMS.MAX_NUMBER_OF_OPTIONAL_ITEMS} Optional items`,
	NOT_VALID_RUNES: 'Something went wrong while processing your runes. Please try again',
	NOT_VALID_SPELLS: 'Something went wrong while processing your spells. Please try again',
	NOT_VALID_RANK: 'Something went wrong while processing your rank. Please try again'
}

export const SUCCESS = {
	BUILD_SAVED: 'Successfully saved your build!'
}