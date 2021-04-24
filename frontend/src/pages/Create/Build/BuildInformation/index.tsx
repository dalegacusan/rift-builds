import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import ChampionSelect from './ChampionSelect';
import ItemsSelect from './ItemsSelect';
import RunesSelect from './RunesSelect';
import SpellsSelect from './SpellsSelect';
// CSS
import globalstyles from '../Styles.module.css';
import styles from './buildselection.module.css';
// Types
type BuildSelectionProps = {};

const BuildSelection = (props: BuildSelectionProps) => {
	return (
		<Grid container spacing={3} className={globalstyles.gridContainer}>
			<Grid item xs={12} sm={12}>
				<p className={globalstyles.buildStepHeader}>
					Choose your champion, items, runes, and spells
				</p>
			</Grid>
			<Grid item xs={12}>
				<ChampionSelect />
			</Grid>
			<Grid item xs={12}>
				<ItemsSelect />
			</Grid>
			<Grid item xs={12}>
				<RunesSelect />
			</Grid>
			<Grid item xs={12}>
				<SpellsSelect />
			</Grid>
		</Grid>
	);
};

export default BuildSelection;
