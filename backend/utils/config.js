require('dotenv').config();

const PORT = process.env.PORT || 8080;
const { MONGODB_URL } = process.env;

module.exports = {
	PORT,
	MONGODB_URL,
};
