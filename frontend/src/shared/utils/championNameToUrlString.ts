// Transforms champion name to string without special characters and space
// to be used in a URL
//
// ex:
// 		localhost:3000/Kai'sa -> localhost:3000/kaisa
//		localhost:3000/Dr. Mundo -> localhost:3000/drmundo
export const championNameToUrlString = (championName: string) =>
	championName
		.toLocaleLowerCase()
		.replace(' ', '') // Remove spaces
		.replace('.', '') // Remove dots
		.replace("'", ''); // Remove quotation marks
