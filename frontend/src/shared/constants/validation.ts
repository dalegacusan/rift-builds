// Build Title Length = 24
// Username length = 22
export const Validation = {
	BUILD_TITLE: {
		MIN_LENGTH: 0, // 6?
		MAX_LENGTH: 60,
	},
	USERNAME: {
		MIN_LENGTH: 0, // 6?
		MAX_LENGTH: 22,
	},
	REASON: {
		MIN_LENGTH: 0,
		MAX_LENGTH: 8000,
	},
	ITEMS: {
		MAX_LENGTH: 42, // ?
		PRIMARY: {
			MIN_LENGTH: 3,
			MAX_LENGTH: 6
		},
		OPTIONAL: {
			MIN_LENGTH: 0,
			MAX_LENGTH: 36,
		}
	}
}