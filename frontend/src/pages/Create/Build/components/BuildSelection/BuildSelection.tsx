import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import ChampionSelect from './components/ChampionSelect/ChampionSelect';
import ItemsSelect from './components/ItemsSelect/ItemsSelect';
import RunesSelect from './components/RunesSelect/RunesSelect';
import SpellsSelect from './components/SpellsSelect/SpellsSelect';
// CSS
import styles from './buildselection.module.css';
// Types
type BuildSelectionProps = {
	formControl: string;
};

const BuildSelection = (props: BuildSelectionProps) => {
	const { formControl } = props;

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<ChampionSelect formControl={formControl} />
			</Grid>
			<Grid item xs={12}>
				<ItemsSelect formControl={formControl} />
			</Grid>
			<Grid item xs={12}>
				<RunesSelect formControl={formControl} />
			</Grid>
			<Grid item xs={12}>
				<SpellsSelect formControl={formControl} />
			</Grid>
		</Grid>
	);
};

export default BuildSelection;
