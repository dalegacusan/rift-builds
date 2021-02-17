import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// Components
// CSS
import styles from './rune.module.css';
// Types
import {
	RuneInterface,
	RunesSelectedType,
} from '../../../../../../../../utils/interfaces';
type DominationProps = {
	formControl: string;
	runes: Array<RuneInterface>;
	runesSelected: RunesSelectedType;
	handleRuneSelectChange(
		e: React.ChangeEvent<HTMLSelectElement>,
		runeType: string,
		runePath?: string
	): void;
	handleRuneExplanationChange(
		e: React.ChangeEvent<HTMLTextAreaElement>,
		runeType: string
	): void;
};

const Domination = (props: DominationProps) => {
	const {
		formControl,
		runes,
		runesSelected,
		handleRuneSelectChange,
		handleRuneExplanationChange,
	} = props;

	return (
		<>
			<Grid item xs={12} sm={6}>
				<LazyLoadImage
					src={`/images/wildriftrunes/${runesSelected.domination.id}.png`}
					className={styles.runeImage}
				/>

				{
					<FormControl className={formControl}>
						<InputLabel shrink htmlFor='rune-select'>
							Domination (Slot 1)
						</InputLabel>
						<NativeSelect
							onChange={(e) =>
								handleRuneSelectChange(e, 'secondary', 'domination')
							}
							inputProps={{
								name: 'rune',
								id: 'rune-select',
							}}
						>
							{runes
								.filter(
									(rune) =>
										rune.type === 'secondary' && rune.path === 'domination'
								)
								.map(({ id, runeName, url }: RuneInterface, index) => {
									return (
										<option key={index} value={id}>
											{runeName}
										</option>
									);
								})}
						</NativeSelect>
						<FormHelperText>Select a Domination Rune</FormHelperText>
					</FormControl>
				}
			</Grid>
			<Grid item xs={12} sm={6}>
				<textarea
					id='runeDomination'
					name='runeDomination'
					rows={6}
					placeholder='Add an explanation for this rune'
					className={styles.explanationTextArea}
					// value={itemReason}
					onChange={(e) => handleRuneExplanationChange(e, 'domination')}
				></textarea>
			</Grid>
		</>
	);
};

export default Domination;
