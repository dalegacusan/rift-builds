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
// CSS
import styles from './spell.module.css';
// Types
import {
	SpellInterface,
	SpellsSelectedType,
} from '../../../../../../../../utils/interfaces';
type SpellProps = {
	formControl: string;
	spells: Array<SpellInterface>;
	spellNumber: number;
	spellsSelected: SpellsSelectedType;
	handleSpellSelectChange(
		e: React.ChangeEvent<HTMLSelectElement>,
		spellNumber: string
	): void;
};

const Spell = (props: SpellProps) => {
	const {
		formControl,
		spells,
		spellNumber,
		spellsSelected,
		handleSpellSelectChange,
	} = props;
	const { spellOne, spellTwo } = spellsSelected;

	return (
		<Grid item xs={12} sm={3} style={{ marginTop: '10px' }}>
			<LazyLoadImage
				src={`/images/wildriftspells/${
					spellNumber === 1 ? spellOne.id : spellTwo.id
				}.jpg`}
				style={{ width: '90px' }}
			/>

			{
				<FormControl className={formControl}>
					<InputLabel shrink htmlFor='spell-select'>
						{spellNumber === 1 ? 'Spell One' : 'Spell Two'}
					</InputLabel>
					<NativeSelect
						defaultValue={`${spellNumber === 1 ? spellOne.id : spellTwo.id}`}
						onChange={(e) =>
							handleSpellSelectChange(
								e,
								`${spellNumber === 1 ? 'spellOne' : 'spellTwo'}`
							)
						}
						inputProps={{
							name: 'spell',
							id: 'spell-select',
						}}
					>
						{spells.map(({ id, spellName, url }: SpellInterface, index) => {
							return (
								<option key={index} value={id}>
									{spellName}
								</option>
							);
						})}
					</NativeSelect>
					<FormHelperText>Select a Spell</FormHelperText>
				</FormControl>
			}
		</Grid>
	);
};

export default Spell;
