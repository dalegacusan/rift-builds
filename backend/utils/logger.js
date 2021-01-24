const info = (...message) => {
	console.log(...message);
};

const error = (...message) => {
	console.error(...message);
};

module.exports = {
	info,
	error,
};
