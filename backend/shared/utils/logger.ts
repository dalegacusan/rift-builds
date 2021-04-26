import { Process } from '../constants/Process';
// Don't log anything to the console when the NODE_ENV is TEST

const info = (...message: Array<string>) => {
	// The middleware that outputs information about the HTTP requests is obstructing the test execution output.
	if (process.env.NODE_ENV !== Process.TEST) {
		console.log(...message);
	}
};

const error = (...message: Array<string>) => {
	console.error(...message);
};

module.exports = {
	info,
	error,
};
