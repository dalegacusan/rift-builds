import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
// Components
import Spell from './components/Spell';
// CSS
import styles from './spellsselect.module.css';
// Types
import {
	SpellInterface,
	SpellsSelectedType,
} from '../../../../../../../utils/interfaces';
type SpellsSelectProps = {
	formControl: string;
	spells: Array<SpellInterface>;
	spellsSelected: SpellsSelectedType;
	handleSpellSelectChange(
		e: React.ChangeEvent<HTMLSelectElement>,
		spellNumber: string
	): void;
};

const SpellsSelect = (props: SpellsSelectProps) => {
	const {
		formControl,
		spells,
		spellsSelected,
		handleSpellSelectChange,
	} = props;
	const { spellOne, spellTwo } = spellsSelected;

	return (
		<Box>
			<p>6. Summoner Spells</p>

			<Grid container item xs={12}>
				{/* Spell One */}
				<Spell
					formControl={formControl}
					spells={spells}
					spellNumber={1}
					spellsSelected={spellsSelected}
					handleSpellSelectChange={handleSpellSelectChange}
				/>

				{/* Spell Two */}
				<Spell
					formControl={formControl}
					spells={spells}
					spellNumber={2}
					spellsSelected={spellsSelected}
					handleSpellSelectChange={handleSpellSelectChange}
				/>
			</Grid>
		</Box>
	);
};

export default SpellsSelect;
