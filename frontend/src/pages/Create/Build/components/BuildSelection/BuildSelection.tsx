import React, { useState, useEffect } from 'react';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import ChampionSelect from './components/ChampionSelect/ChampionSelect';
import ItemsSelect from './components/ItemsSelect/ItemsSelect';
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
	SpellInterface,
} from '../../../../../utils/interfaces';
type BuildSelectionProps = {
	champions: Array<ChampionInterface>;
	items: Array<ItemInterface>;
};

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const BuildSelection = (props: BuildSelectionProps) => {
	const classes = useStyles();
	const { champions, items } = props;

	const [championSelected, setChampionSelected] = useState<ChampionInterface>(
		// Defaults to Champion: 'Ahri' - which is the first option
		{
			id: '48ca031a-d92e-44e6-b7b6-f3eb1dbe644c',
			championName: 'Ahri',
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
			lane: ['Middle'],
			title: 'Nine-Tailed Fox',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Ahri_wild_rift.png',
		}
	);
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

	const [itemsConfirmed, setItemsConfirmed] = useState<Array<ItemInterface>>(
		[]
	);

	const handleChampSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const getChampion = champions.find(
			(champ: ChampionInterface) => champ.id === e.target.value
		);

		if (getChampion) {
			setChampionSelected(getChampion);
		}
	};
	const handleItemSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const getItem = items.find(
			(item: ItemInterface) => item.id === e.target.value
		);

		if (getItem) {
			setItemSelected(getItem);
		}
	};
	// itemSelected has no 'type' property by default
	// A 'type' property is only added when a user clicks on the "Optional" Radio Button
	// TODO: On "Add Item" button click, if there's no 'type' property, add a 'type' property with value of 'primary'
	const handleItemTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setItemSelected((prev: ItemInterface) => {
			return { ...prev, type: e.target.value };
		});
	};

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
					items={items}
					itemSelected={itemSelected}
					handleItemSelectChange={handleItemSelectChange}
					handleItemTypeChange={handleItemTypeChange}
					formControl={classes.formControl}
					itemsConfirmed={itemsConfirmed}
				/>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<p>5. Runes</p>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<p>6. Summoner Spells</p>
				</Box>
			</Grid>
		</Grid>
	);
};

export default BuildSelection;
