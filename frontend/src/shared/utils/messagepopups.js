import toast from 'react-hot-toast';

export const Error = {
	BUILD_NOT_SAVED: (message) => toast.error(message),
	CAN_ONLY_HAVE_SIX_PRIMARY_ITEMS: () => toast.error('A build can only have 6 primary items'),
	DOES_NOT_HAVE_SIX_PRIMARY_ITEMS: () => toast.error('A build must have 6 primary items'),
	HAS_DUPLICATE_ITEMS: () => toast.error('That item is already in your build!'),
	NO_BUILD_TITLE: () => toast.error("Please enter a title for your build"),
	NO_USERNAME: () => toast.error('Please enter your username'),
	NO_ITEMS_SELECTED: () => toast.error('Please add items to your build'),
}

export const Success = {
	BUILD_SAVED: () => toast.success('Successfully saved your build!')
}
