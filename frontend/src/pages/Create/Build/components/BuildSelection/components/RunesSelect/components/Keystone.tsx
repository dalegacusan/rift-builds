import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Validation } from '../../../../../../../../shared/constants/constants';
import { Rune } from '../../../../../../../../shared/constants/constants';

// Redux
import { connect, ConnectedProps } from 'react-redux';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
// CSS
import globalstyles from '../../../../../createbuild.module.css';
import styles from './rune.module.css';
// Types
import {
	RuneInterface,
	RootState,
} from '../../../../../../../../shared/constants/interfaces';

const Keystone = (props: KeystoneProps) => {
	const { handleRuneSelectChange, handleRuneExplanationChange } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runeKeystone } = props;

	return (
		<>
			<Grid item xs={12} sm={6}>
				<LazyLoadImage
					src={`/images/wildriftrunes/${runeKeystone.id}.jpg`}
					className={styles.runeImage}
				/>

				<select
					onChange={(e) => handleRuneSelectChange(e, Rune.TYPE.KEYSTONE)}
					value={runeKeystone.id}
					className={globalstyles.buildSelectInput}
				>
					{runes
						.filter((rune: RuneInterface) => rune.type === Rune.TYPE.KEYSTONE)
						.map((rune: RuneInterface, index: number) => {
							const { id: runeId, runeName } = rune;

							return (
								<option
									key={index}
									value={runeId}
									className={globalstyles.buildSelectOption}
								>
									{runeName}
								</option>
							);
						})}
				</select>
			</Grid>
			<Grid item xs={12} sm={6}>
				<textarea
					id='runeKeystone'
					name='runeKeystone'
					rows={5}
					value={runeKeystone.reason}
					placeholder='Explanation'
					className={styles.explanationTextArea}
					maxLength={Validation.REASON.MAX_LENGTH}
					onChange={(e) => handleRuneExplanationChange(e, Rune.TYPE.KEYSTONE)}
				/>
			</Grid>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		runeKeystone: state.build.runes.keystone,
		runes: state.gameData.runes,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type KeystoneProps = PropsFromRedux & {
	handleRuneSelectChange: (
		e: React.ChangeEvent<HTMLSelectElement>,
		runeType: string,
		runePath?: string
	) => void;
	handleRuneExplanationChange: (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		runeName: string
	) => void;
};

export default connector(Keystone);
