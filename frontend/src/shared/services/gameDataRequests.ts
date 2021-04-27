import axios from 'axios';

// SHARED
import { URL } from '../config/config';

// INTERFACES
import {
	ChampionInterface,
	ItemInterface,
	RuneInterface,
	SpellInterface,
} from '../interfaces/GameData';

export const getOneChampion = (championName: string) =>
	axios.get(`${URL.SERVER}/api/champion/${championName}`);

export const getChampions = axios.get(`${URL.SERVER}/api/champion/all`);

export const sortChampionsAlphabetically = (
	championsArray: Array<ChampionInterface>
) =>
	championsArray.sort(function (a: ChampionInterface, b: ChampionInterface) {
		if (a.championName < b.championName) {
			return -1;
		}
		if (a.championName > b.championName) {
			return 1;
		}
		return 0;
	});

// === Items Services === //
export const getItems = axios.get(`${URL.SERVER}/api/item/all`);

export const sortItemsAlphabetically = (itemsArray: Array<ItemInterface>) =>
	itemsArray.sort(function (a: ItemInterface, b: ItemInterface) {
		if (a.itemName < b.itemName) {
			return -1;
		}
		if (a.itemName > b.itemName) {
			return 1;
		}
		return 0;
	});

// === Runes Services === //
export const getRunes = axios.get(`${URL.SERVER}/api/rune/all`);

export const sortRunesAlphabetically = (runesArray: Array<RuneInterface>) =>
	runesArray.sort(function (a: RuneInterface, b: RuneInterface) {
		if (a.runeName < b.runeName) {
			return -1;
		}
		if (a.runeName > b.runeName) {
			return 1;
		}
		return 0;
	});

// === Spells Services === //
export const getSpells = axios.get(`${URL.SERVER}/api/spell/all`);

export const sortSpellsAlphabetically = (spellsArray: Array<SpellInterface>) =>
	spellsArray.sort(function (a: SpellInterface, b: SpellInterface) {
		if (a.spellName < b.spellName) {
			return -1;
		}
		if (a.spellName > b.spellName) {
			return 1;
		}
		return 0;
	});

// === Ranks Services === //
export const getRanks = axios.get(`${URL.SERVER}/api/rank/all`);

// === Roles Services === //
export const getRoles = axios.get(`${URL.SERVER}/api/role/all`);
