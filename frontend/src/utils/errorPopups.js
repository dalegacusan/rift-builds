import toast from 'react-hot-toast';

const errorNoUsername = () => toast.error('Please enter your username');

const errorNoItemSelected = () => toast.error('Please add items to your build');

const errorItemDuplicate = () =>
	toast.error('That item is already in your build!');

const errorBuildSaved = (message) => toast.error(message);

const errorPrimaryItemsLimit = () =>
	toast.error('A build must only have 6 primary items');

const successBuildSaved = () => toast.success('Successfully saved your build!');

export {
	errorNoUsername,
	errorNoItemSelected,
	errorItemDuplicate,
	errorBuildSaved,
	errorPrimaryItemsLimit,
	successBuildSaved,
};
