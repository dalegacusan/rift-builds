import React from 'react';

import {
	GameMode,
	Maps,
	SpellNumber,
} from '../../../../../../../shared/constants/constants';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import Spell from './components/Spell';
// CSS
import globalstyles from '../../../../createbuild.module.css';
import styles from './spellsselect.module.css';
// Types
import { SpellInterface } from '../../../../../../../shared/interfaces/Build';
import { RootState } from '../../../../../../../shared/interfaces/GlobalStore';

const SpellsSelect = (props: SpellsSelectProps) => {
	// Game Data PROPS
	const { spells } = props;
	// Build PROPS
	const { gameMode, spellsSelected, setSpellsSelected } = props;

	const handleSpellSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		spellNumber: number
	) => {
		const { value: spellId } = e.target;

		const getSpell = spells.find(
			(spell: SpellInterface) => spell.id === spellId
		);

		if (getSpell) {
			switch (spellNumber) {
				case 1:
					setSpellsSelected(SpellNumber.SPELL_ONE, getSpell);
					break;
				case 2:
					setSpellsSelected(SpellNumber.SPELL_TWO, getSpell);
					break;
			}
		}
	};

	// Filter spells to display based on game mode selected
	// Gamemode = NORMAL ? w/o Mark n Dash, Clarity
	// Gamemode = ARAM ? w/o Smite
	// GameMode = NORMAL ? Display spells that has wild_rift applicable map
	// GameMode = ARAM ? Display spells that has howling_abyss applicable map
	const buildSpellsToDisplay = spells.filter((spell: SpellInterface) => {
		const { applicableMaps } = spell;

		const hasHowlingAbyss = applicableMaps.some(
			(map) => map === Maps.HOWLING_ABYSS
		);
		const hasWildRift = applicableMaps.some((map) => map === Maps.WILD_RIFT);

		if (gameMode === GameMode.NORMAL && hasWildRift) {
			return spell;
		} else if (gameMode === GameMode.ARAM && hasHowlingAbyss) {
			return spell;
		}
	});

	return (
		<Box>
			<p className={globalstyles.inputLabel}>8. Summoner Spells</p>
			<p className={globalstyles.inputDescription}>
				Select the spells for your build
			</p>

			<Grid container item xs={12}>
				{/* Spell One */}
				<Spell
					spells={buildSpellsToDisplay}
					spellNumber={1}
					spellsSelected={spellsSelected}
					handleSpellSelectChange={handleSpellSelectChange}
				/>

				{/* Spell Two */}
				<Spell
					spells={buildSpellsToDisplay}
					spellNumber={2}
					spellsSelected={spellsSelected}
					handleSpellSelectChange={handleSpellSelectChange}
				/>
			</Grid>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		gameMode: state.build.gameMode,
		spellsSelected: state.build.spells,
		spells: state.gameData.spells,
	};
};

const mapDispatchToprops = (dispatch: any) => {
	return {
		setSpellsSelected: (spellKey: string, data: SpellInterface) =>
			dispatch({ type: actionTypes.BUILD_SET_SPELLSSELECTED, spellKey, data }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToprops);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SpellsSelectProps = PropsFromRedux;

export default connector(SpellsSelect);
