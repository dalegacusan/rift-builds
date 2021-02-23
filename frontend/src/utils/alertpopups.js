import toast from 'react-hot-toast';

const errorBuildSaved = (message) => toast.error(message);

const errorItemDuplicate = () =>
	toast.error('That item is already in your build!');

const errorNoBuildTitle = () => toast.error("Please enter a title for your build");

const errorNoUsername = () => toast.error('Please enter your username');

const errorNoItemSelected = () => toast.error('Please add items to your build');

const errorPrimaryItemsLimit = () =>
	toast.error('A build must only have 6 primary items');

const successBuildSaved = () => toast.success('Successfully saved your build!');

export {
	errorBuildSaved,
	errorItemDuplicate,
	errorNoBuildTitle,
	errorNoUsername,
	errorNoItemSelected,
	errorPrimaryItemsLimit,
	successBuildSaved,
};
