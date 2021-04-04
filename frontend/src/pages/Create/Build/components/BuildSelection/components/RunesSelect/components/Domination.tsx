import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { RequiredLength } from '../../../../../../../../shared/constants/requiredLength';
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
} from '../../../../../../../../shared/interfaces/interfaces';

const Domination = (props: DominationProps) => {
	const { handleRuneSelectChange, handleRuneExplanationChange } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runeDomination } = props;

	return (
		<>
			<Grid item xs={12} sm={6}>
				<LazyLoadImage
					src={`/images/wildriftrunes/${runeDomination.id}.jpg`}
					className={styles.runeImage}
				/>

				<select
					onChange={(e) =>
						handleRuneSelectChange(e, Rune.TYPE.SECONDARY, Rune.PATH.DOMINATION)
					}
					value={runeDomination.id}
					className={globalstyles.buildSelectInput}
				>
					{runes
						.filter(
							(rune: RuneInterface) =>
								rune.type === Rune.TYPE.SECONDARY &&
								rune.path === Rune.PATH.DOMINATION
						)
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
					id='runeDomination'
					name='runeDomination'
					rows={5}
					value={runeDomination.reason}
					placeholder='Explanation'
					className={styles.explanationTextArea}
					maxLength={RequiredLength.REASON.MAX_LENGTH}
					onChange={(e) => handleRuneExplanationChange(e, Rune.PATH.DOMINATION)}
				/>
			</Grid>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		runeDomination: state.build.runes.domination,
		runes: state.gameData.runes,
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type DominationProps = PropsFromRedux & {
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

export default connector(Domination);
