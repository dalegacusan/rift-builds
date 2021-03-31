// Don't log anything to the console when the NODE_ENV is TEST/PRODUCTION

const info = (...message) => {
	// The middleware that outputs information about the HTTP requests is obstructing the test execution output. 
	// if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...message);
	}
};

const error = (...message) => {
	// if (process.env.NODE_ENV !== 'production') {
	console.error(...message);
};

module.exports = {
	info,
	error,
};
