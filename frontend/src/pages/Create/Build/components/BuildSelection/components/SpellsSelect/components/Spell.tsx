import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// Components
// CSS
import globalstyles from '../../../../../createbuild.module.css';
import styles from './spell.module.css';
// Types
import { SpellInterface } from '../../../../../../../../shared/constants/interfaces';
type SpellProps = {
	formControl: string;
	spells: Array<SpellInterface>;
	spellNumber: number;
	spellsSelected: {
		spellOne: SpellInterface;
		spellTwo: SpellInterface;
	};
	handleSpellSelectChange(
		e: React.ChangeEvent<HTMLSelectElement>,
		spellNumber: number
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
				className={styles.spellImage}
			/>

			<select
				value={`${spellNumber === 1 ? spellOne.id : spellTwo.id}`}
				onChange={(e) => handleSpellSelectChange(e, spellNumber)}
				className={globalstyles.buildSelectInput}
			>
				{spells.map((spell: SpellInterface, index) => {
					const { id: spellId, spellName } = spell;

					return (
						<option
							key={index}
							value={spellId}
							className={globalstyles.buildSelectOption}
						>
							{spellName}
						</option>
					);
				})}
			</select>
		</Grid>
	);
};

export default Spell;
