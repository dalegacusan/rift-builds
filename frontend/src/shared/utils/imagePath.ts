const Champion = (championID: string) => `/images/champions/${championID}.jpg`;

const Item = (itemID: string) => `/images/items/${itemID}.png`;

const Rank = (rankID: string) => `/images/ranks/${rankID}.png`;

const Role = (roleID: string) => `/images/roles/${roleID}.png`;

const Rune = (runeID: string) => `/images/runes/${runeID}.jpg`;

const Spell = (spellID: string) => `/images/spells/${spellID}.jpg`;

export const ImagePath = {
	Champion,
	Item,
	Rank,
	Role,
	Rune,
	Spell,
};
