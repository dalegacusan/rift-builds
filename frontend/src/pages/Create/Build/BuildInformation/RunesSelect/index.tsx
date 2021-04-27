import React from 'react';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../shared/store/actions';

// Shared
import { Rune } from '../../../../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Components
import Domination from './components/Domination';
import Inspiration from './components/Inspiration';
import Keystone from './components/Keystone';
import Resolve from './components/Resolve';

// CSS
import globalstyles from '../../Styles.module.css';

// Types
import { RuneInterface } from '../../../../../shared/interfaces/GameData';
import { RootState } from '../../../../../shared/interfaces/GlobalStore';

const RunesSelect = (props: RunesSelectProps) => {
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

					- "{...getRune}" spreads the previous state of the rune
					- "reason: prevRunesSelected[runeName].reason" gets the 'reason' property of the previous rune and sets it to the new rune

					return {
						...prev,
						keystone: { ...getRune, reason: prevRunesSelected[runeName].reason || '' },
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

			if (runeType === Rune.TYPE.KEYSTONE) {
				runesSelectStateHandler(Rune.TYPE.KEYSTONE);
			}
			if (runeType === Rune.TYPE.SECONDARY) {
				switch (runePath) {
					case Rune.PATH.DOMINATION:
						runesSelectStateHandler(Rune.PATH.DOMINATION);
						break;
					case Rune.PATH.RESOLVE:
						runesSelectStateHandler(Rune.PATH.RESOLVE);
						break;
					case Rune.PATH.INSPIRATION:
						runesSelectStateHandler(Rune.PATH.INSPIRATION);
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
			<p className={globalstyles.inputLabel}>7. Runes</p>
			<p className={globalstyles.inputDescription}>
				Select the runes for your build
			</p>

			<Grid container item xs={12} spacing={1}>
				{/* KEYSTONE Rune */}
				<Keystone
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Domination */}
				<Domination
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Resolve */}
				<Resolve
					handleRuneSelectChange={handleRuneSelectChange}
					handleRuneExplanationChange={handleRuneExplanationChange}
				/>

				{/* Secondary: Inspiration */}
				<Inspiration
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

type RunesSelectProps = PropsFromRedux;

export default connector(RunesSelect);
