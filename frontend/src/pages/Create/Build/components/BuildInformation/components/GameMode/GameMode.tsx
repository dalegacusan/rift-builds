import React from 'react';

import { GameMode } from '../../../../../../../shared/constants/constants';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// Components
// CSS
import globalstyles from '../../../../createbuild.module.css';
import styles from './gamemode.module.css';
// Types
import { RootState } from '../../../../../../../shared/interfaces/interfaces';

const GameModeComponent = (props: GameModeComponentProps) => {
	// Build PROPS
	const { gameMode, setGameMode, resetSpellsSelected } = props;

	const handleGameModeChange = (newGameMode: string) => {
		resetSpellsSelected();

		setGameMode(newGameMode);
	};

	// Button's className (.selected) is conditional
	// - If gameMode is X, add .selected class to that button
	//   else if gameMode is not X, remove .selected class from that button

	let disabledGameMode = '';

	return (
		<Box>
			<p className={globalstyles.inputLabel}>3. Game Mode</p>
			<p className={globalstyles.inputDescription}>
				What game mode is your build for?
			</p>

			<Button
				variant='contained'
				// If gamemode is selected, add button styles
				// If gamemode is disabled, add line-through, change text color, and disable button
				className={`${styles.gamemodeButton} ${
					gameMode === GameMode.NORMAL ? styles.selected : null
				} ${disabledGameMode === GameMode.NORMAL ? styles.notAvailable : null}`}
				disabled={disabledGameMode === GameMode.NORMAL ? true : false}
				onClick={() => handleGameModeChange(GameMode.NORMAL)}
			>
				Normal
			</Button>
			<Button
				variant='contained'
				// If gamemode is selected, add button styles
				// If gamemode is disabled, add line-through, change text color, and disable button
				className={`${styles.gamemodeButton} ${
					gameMode === GameMode.ARAM ? styles.selected : null
				} ${disabledGameMode === GameMode.ARAM ? styles.notAvailable : null}`}
				disabled={disabledGameMode === GameMode.ARAM ? true : false}
				onClick={() => handleGameModeChange(GameMode.ARAM)}
			>
				ARAM
			</Button>
		</Box>
	);
};

// https://redux.js.org/recipes/usage-with-typescript
const mapStateToProps = (state: RootState) => {
	return {
		gameMode: state.build.gameMode,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setGameMode: (newGameMode: string) =>
			dispatch({ type: actionTypes.BUILD_SET_GAMEMODE, data: newGameMode }),
		resetSpellsSelected: () =>
			dispatch({ type: actionTypes.BUILD_RESET_SPELLSSELECTED }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type GameModeComponentProps = PropsFromRedux;

export default connector(GameModeComponent);
