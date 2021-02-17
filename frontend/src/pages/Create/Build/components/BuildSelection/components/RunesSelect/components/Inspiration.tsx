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
type InspirationProps = {
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

const Inspiration = (props: InspirationProps) => {
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
					src={`/images/wildriftrunes/${runesSelected.inspiration.id}.png`}
					className={styles.runeImage}
				/>

				{
					<FormControl className={formControl}>
						<InputLabel shrink htmlFor='rune-select'>
							Inspiration (Slot 3)
						</InputLabel>
						<NativeSelect
							onChange={(e) =>
								handleRuneSelectChange(e, 'secondary', 'inspiration')
							}
							inputProps={{
								name: 'rune',
								id: 'rune-select',
							}}
						>
							{runes
								.filter(
									(rune) =>
										rune.type === 'secondary' && rune.path === 'inspiration'
								)
								.map(({ id, runeName, url }: RuneInterface, index) => {
									return (
										<option key={index} value={id}>
											{runeName}
										</option>
									);
								})}
						</NativeSelect>
						<FormHelperText>Select a Inspiration Rune</FormHelperText>
					</FormControl>
				}
			</Grid>
			<Grid item xs={12} sm={6}>
				<textarea
					id='runeInspiration'
					name='runeInspiration'
					rows={6}
					placeholder='Add an explanation for this rune'
					className={styles.explanationTextArea}
					// value={itemReason}
					onChange={(e) => handleRuneExplanationChange(e, 'inspiration')}
				></textarea>
			</Grid>
		</>
	);
};

export default Inspiration;
