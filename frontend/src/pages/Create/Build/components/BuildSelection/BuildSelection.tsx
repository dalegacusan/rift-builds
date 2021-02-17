import React, { useState, useEffect } from 'react';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import ChampionSelect from './components/ChampionSelect/ChampionSelect';
import ItemsSelect from './components/ItemsSelect/ItemsSelect';
import RunesSelect from './components/RunesSelect/RunesSelect';
import SpellsSelect from './components/SpellsSelect/SpellsSelect';
// CSS
import styles from './buildselection.module.css';
// Types
import {
	BuildInterface,
	CountersInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RuneInterface,
	RunesSelectedType,
	SpellInterface,
	SpellsSelectedType,
} from '../../../../../utils/interfaces';
type BuildSelectionProps = {
	champions: Array<ChampionInterface>;
	items: Array<ItemInterface>;
	runes: Array<RuneInterface>;
	spells: Array<SpellInterface>;
};

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const BuildSelection = (props: BuildSelectionProps) => {
	const classes = useStyles();
	const { champions, items, runes, spells } = props;

	// =============== Champions =============== //
	const [championSelected, setChampionSelected] = useState<ChampionInterface>(
		// Defaults to Champion: 'Ahri' - which is the first option
		{
			id: '48ca031a-d92e-44e6-b7b6-f3eb1dbe644c',
			championName: 'Ahri',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Ahri_wild_rift.png',
			lane: ['Middle'],
			tier: { Middle: 'A' },
			title: 'Nine-Tailed Fox',
			counters: {
				weakAgainst: [
					{
						championName: 'Twisted Fate',
						id: '85f2909d-e3c1-425b-8398-5c8b9c145633',
					},
					{
						championName: 'Fizz',
						id: '96a64b1c-5a70-4b6c-a8ba-cf82d474a928',
					},
					{
						championName: 'Yasuo',
						id: 'e9759479-e2b8-45d4-84ce-6711c7371591',
					},
				],
				strongAgainst: [
					{
						championName: 'Akali',
						id: '5a05e0d6-9c06-44af-9df9-a1fad5a2e427',
					},
					{
						championName: 'Twisted Fate',
						id: '85f2909d-e3c1-425b-8398-5c8b9c145633',
					},
					{
						championName: 'Lux',
						id: 'fd23d139-1fb4-4dd7-860b-ef261bf13431',
					},
				],
			},
		}
	);
	const handleChampSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value: championId } = e.target;

		const getChampion = champions.find(
			(champ: ChampionInterface) => champ.id === championId
		);

		if (getChampion) {
			setChampionSelected(getChampion);
		}
	};

	// =============== Items =============== //
	const [itemSelected, setItemSelected] = useState<ItemInterface>(
		// Defaults to Item: 'Abyssal Mask' which is the first option
		{
			id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
			category: 'defense',
			description: [
				'Eternity: Restore Mana equal to 15% of the damage taken from champions. Regen Health equal to 20% of Mana spent. Capped at 25 Health per cast.',
				'Abyssal: Nearby enemy champions take 15% bonus magic damage.',
			],
			itemName: 'Abyssal Mask',
			statistics: [
				'+300 Max Health',
				'+40 Magic Resistance',
				'+300 Max Mana',
				'+10 Ability Haste',
			],
			tier: 'upgraded',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/abyssalmask_wild_rift.png',
		}
	);
	const [itemType, setItemType] = useState('primary');
	const [itemReason, setItemReason] = useState('');

	const [itemsConfirmed, setItemsConfirmed] = useState<Array<ItemInterface>>(
		[]
	);

	const handleItemSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value: itemId } = e.target;

		const getItem = items.find((item: ItemInterface) => item.id === itemId);

		if (getItem) {
			setItemSelected(getItem);
		}
	};
	const handleItemTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setItemType(e.target.value);
	};
	const handleItemExplanationChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setItemReason(e.target.value);
	};

	const handleAddItemClick = () => {
		// Pushes item to itemsConfirmed Array
		setItemsConfirmed([
			...itemsConfirmed,
			{ ...itemSelected, type: itemType, reason: itemReason },
		]);
		setItemReason('');
	};
	const handleDeleteItemClick = (itemId: string) => {
		const filteredItems = itemsConfirmed.filter(
			(item: ItemInterface) => item.id !== itemId
		);

		if (filteredItems) {
			setItemsConfirmed([...filteredItems]);
		}
	};

	// =============== Runes =============== //
	const [runesSelected, setRunesSelected] = useState<RunesSelectedType>({
		keystone: {
			id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
			runeName: 'Aery',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
			type: 'keystone',
			description: [
				'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
				'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
				'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
			],
		},
		domination: {
			id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
			runeName: 'Brutal',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
			type: 'secondary',
			path: 'domination',
			description: [
				'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
			],
		},
		resolve: {
			id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
			runeName: 'Backbone',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
			type: 'secondary',
			path: 'resolve',
			description: [
				'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
			],
		},
		inspiration: {
			id: '80216900-b198-4195-ab1c-e6e309c28ff3',
			runeName: 'Hunter - Genius',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
			type: 'secondary',
			path: 'inspiration',
			description: [
				'Gain 2.5 Ability Haste.',
				'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
			],
		},
	});
	// Everytime user changes a rune, this function gets executed
	// - sets new rune
	// - sets reason property
	const handleRuneSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		runeType: string,
		runePath?: string
	) => {
		const getRune = runes.find(
			(rune: RuneInterface) => rune.id === e.target.value
		);

		if (getRune) {
			/*

					- "{...getRune}" spreads the previous state
					- "reason: prev.keystone.reason" gets the 'reason' property of the previous rune and sets it to the new rune

					return {
						...prev,
						keystone: { ...getRune, reason: prev.keystone.reason || '' },
					};

			*/

			const runesSelectStateHandler = (rune: string) => {
				setRunesSelected((prev) => {
					return {
						...prev,
						[rune]: { ...getRune, reason: prev[rune].reason || '' },
					};
				});
			};

			if (runeType === 'keystone') {
				runesSelectStateHandler('keystone');
			}
			if (runeType === 'secondary') {
				switch (runePath) {
					case 'domination':
						runesSelectStateHandler('domination');
						break;
					case 'resolve':
						runesSelectStateHandler('resolve');
						break;
					case 'inspiration':
						runesSelectStateHandler('inspiration');
						break;
				}
			}
		}
	};
	const handleRuneExplanationChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		rune: string
	) => {
		setRunesSelected((prev) => {
			const prevCopy = { ...prev };

			let getRune = prevCopy[rune];
			getRune = { ...getRune, reason: e.target.value };

			return { ...prev, [rune]: getRune };
		});
	};

	// =============== Spells =============== //
	const [spellsSelected, setSpellsSelected] = useState<SpellsSelectedType>({
		spellOne: {
			id: 'dd6ff556-3b07-4be0-bd1f-c2dd9c9ce1dd',
			spellName: 'Flash',
			url:
				'/uploads/league-of-legends-wild-rift/images/summoner-spells/flash.jpg',
			description: [
				'Teleport a short distance forward or towards the aimed direction.',
			],
			cooldown: '150',
		},
		spellTwo: {
			id: 'aeb37ecd-ccb5-41fc-ad9c-c9b6bef39e34',
			spellName: 'Ignite',
			url:
				'/uploads/league-of-legends-wild-rift/images/summoner-spells/ignite.jpg',
			description: [
				'Ignites target enemy champion, dealing 60−410 (based on level) true damage over 5 seconds and inflincting them with Grievous Wounds.',
				'Grievous Wounds reduces healing effects by 50%',
			],
			cooldown: '90',
		},
	});

	const handleSpellSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		spellNumber: string
	) => {
		const { value: spellId } = e.target;

		const getSpell = spells.find(
			(spell: SpellInterface) => spell.id === spellId
		);

		if (getSpell) {
			switch (spellNumber) {
				case 'spellOne':
					setSpellsSelected((prev) => {
						return { ...prev, spellOne: getSpell };
					});
					break;
				case 'spellTwo':
					setSpellsSelected((prev) => {
						return { ...prev, spellTwo: getSpell };
					});
					break;
			}
		}
	};

	// Check for duplicate items selected
	// Check for primary items limit
	useEffect(() => {
		const primaryItems = itemsConfirmed.filter(
			(item) => item.type === 'primary'
		);

		var itemArray = itemsConfirmed.map((item) => {
			return item.id;
		});
		var isDuplicate = itemArray.some((item, index) => {
			return itemArray.indexOf(item) != index;
		});

		// Remove duplicates from itemsConfirmed Array
		const filteredItemsConfirmed = itemsConfirmed.filter(
			(item, index, arr) => arr.findIndex((t) => t.id === item.id) === index
		);

		if (isDuplicate) {
			alert('Duplicate');
			setItemsConfirmed(filteredItemsConfirmed);
			// errorItemDuplicate();
		} else if (primaryItems.length > 6) {
			// errorPrimaryItemsLimit();
			alert('Limit');
			setItemsConfirmed((prev) => {
				const itemsConfirmedCopy = [...prev];

				itemsConfirmedCopy.pop();

				return itemsConfirmedCopy;
			});
		}
	}, [itemsConfirmed]);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<ChampionSelect
					champions={champions}
					championSelected={championSelected}
					handleChampSelectChange={handleChampSelectChange}
					formControl={classes.formControl}
				/>
			</Grid>
			<Grid item xs={12}>
				<ItemsSelect
					formControl={classes.formControl}
					items={items}
					itemsConfirmed={itemsConfirmed}
					itemReason={itemReason}
					itemSelected={itemSelected}
					handleAddItemClick={handleAddItemClick}
					handleDeleteItemClick={handleDeleteItemClick}
					handleItemExplanationChange={handleItemExplanationChange}
					handleItemSelectChange={handleItemSelectChange}
					handleItemTypeChange={handleItemTypeChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<RunesSelect
					formControl={classes.formControl}
					runes={runes}
					runesSelected={runesSelected}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<SpellsSelect
					formControl={classes.formControl}
					spells={spells}
					spellsSelected={spellsSelected}
					handleSpellSelectChange={handleSpellSelectChange}
				/>
			</Grid>
		</Grid>
	);
};

export default BuildSelection;
