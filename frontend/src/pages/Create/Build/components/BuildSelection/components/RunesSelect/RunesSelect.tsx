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
import Domination from './components/Domination';
import Inspiration from './components/Inspiration';
import Keystone from './components/Keystone';
import Resolve from './components/Resolve';
// CSS
import styles from './runesselect.module.css';
// Types
import {
	RuneInterface,
	RunesSelectedType,
} from '../../../../../../../utils/interfaces';
type RunesSelectProps = {
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

const RunesSelect = (props: RunesSelectProps) => {
	const {
		formControl,
		runes,
		runesSelected,
		handleRuneSelectChange,
		handleRuneExplanationChange,
	} = props;

	return (
		<Box>
			<p>5. Runes</p>

			<Grid container item xs={12}>
				{/* KEYSTONE Rune */}
				<Keystone
					formControl={formControl}
					runes={runes}
					runesSelected={runesSelected}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Domination */}
				<Domination
					formControl={formControl}
					runes={runes}
					runesSelected={runesSelected}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Resolve */}
				<Resolve
					formControl={formControl}
					runes={runes}
					runesSelected={runesSelected}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Inspiration */}
				<Inspiration
					formControl={formControl}
					runes={runes}
					runesSelected={runesSelected}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>
			</Grid>
		</Box>
	);
};

export default RunesSelect;
