import React from 'react';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

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
	RootState,
} from '../../../../../../../utils/interfaces';

const RunesSelect = (props: RunesSelectProps) => {
	const { formControl } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runesSelected, setRunesSelected } = props;

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

			const runesSelectStateHandler = (runeName: string) => {
				const prevRunesSelected: { [key: string]: RuneInterface } = {
					...runesSelected,
				};

				const modifiedRunesSelected = {
					...prevRunesSelected,
					[runeName]: {
						...getRune,
						reason: prevRunesSelected[runeName].reason || '',
					},
				};

				setRunesSelected(runeName, modifiedRunesSelected);
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
		runeName: string
	) => {
		const prevRunesSelected: { [key: string]: RuneInterface } = {
			...runesSelected,
		};

		let getRune = prevRunesSelected[runeName];

		const modifiedRunesSelected = {
			...prevRunesSelected,
			[runeName]: {
				...getRune,
				reason: e.target.value,
			},
		};

		setRunesSelected(runeName, modifiedRunesSelected);
	};

	return (
		<Box>
			<p>5. Runes</p>

			<Grid container item xs={12}>
				{/* KEYSTONE Rune */}
				<Keystone
					formControl={formControl}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Domination */}
				<Domination
					formControl={formControl}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Resolve */}
				<Resolve
					formControl={formControl}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Inspiration */}
				<Inspiration
					formControl={formControl}
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>
			</Grid>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		runesSelected: state.build.runes,
		runes: state.gameData.runes,
	};
};

const mapDispatchToprops = (dispatch: any) => {
	return {
		setRunesSelected: (
			runeName: string,
			data: { [key: string]: RuneInterface }
		) =>
			dispatch({ type: actionTypes.BUILD_SET_RUNESSELECTED, runeName, data }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToprops);

type PropsFromRedux = ConnectedProps<typeof connector>;

type RunesSelectProps = PropsFromRedux & {
	formControl: string;
};

export default connector(RunesSelect);
