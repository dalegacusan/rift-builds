const { MONGODB_URL, TEST_MONGODB_URL } = process.env;
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
	PORT,
	MONGODB_URL,
	TEST_MONGODB_URL,
	NODE_ENV
};
