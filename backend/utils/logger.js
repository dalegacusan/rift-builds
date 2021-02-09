const info = (...message) => {
	// The middleware that outputs information about the HTTP requests is obstructing the test execution output. 
	if (process.env.NODE_ENV !== 'test') {
		console.log(...message);
	}
};

const error = (...message) => {
	console.error(...message);
};

module.exports = {
	info,
	error,
};
