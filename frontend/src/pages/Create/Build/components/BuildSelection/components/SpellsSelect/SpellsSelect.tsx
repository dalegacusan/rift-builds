import React from 'react';

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
import {
	SpellInterface,
	RootState,
} from '../../../../../../../utils/interfaces';

const SpellsSelect = (props: SpellsSelectProps) => {
	const { formControl } = props;
	// Game Data PROPS
	const { spells } = props;
	// Build PROPS
	const { spellsSelected, setSpellsSelected } = props;

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
					setSpellsSelected('spellOne', getSpell);
					break;
				case 2:
					setSpellsSelected('spellTwo', getSpell);
					break;
			}
		}
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>6. Summoner Spells</p>
			<p className={globalstyles.inputDescription}>
				Select the spells for your build
			</p>

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

const mapStateToProps = (state: RootState) => {
	return {
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

type SpellsSelectProps = PropsFromRedux & {
	formControl: string;
};

export default connector(SpellsSelect);
