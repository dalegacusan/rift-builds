export const RequiredLength = {
	BUILD_TITLE: {
		MIN_LENGTH: 1,
		MAX_LENGTH: 120,
	},
	USERNAME: {
		MIN_LENGTH: 1,
		MAX_LENGTH: 22,
	},
	REASON: {
		MIN_LENGTH: 0,
		MAX_LENGTH: 8000,
	},
	ITEMS: {
		MAX_LENGTH: 42,
		PRIMARY: {
			MIN_LENGTH: 3,
			MAX_LENGTH: 6,
		},
		OPTIONAL: {
			MIN_LENGTH: 0,
			MAX_LENGTH: 36,
		},
	},
};
