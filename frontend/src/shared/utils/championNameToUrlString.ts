export const championNameToUrlString = (championName: string) =>
	championName
		.toLocaleLowerCase()
		.split(' ')
		.filter((char) => char !== '.' && char !== "'") // For champions like Kai'sa and Dr. Mundo
		.join('')
		.replace('.', '')
		.replace("'", '');
