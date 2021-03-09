import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
} from '../../../../../../../../utils/interfaces';

const Inspiration = (props: InspirationProps) => {
	const { handleRuneSelectChange, handleRuneExplanationChange } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runeInspiration } = props;

	return (
		<>
			<Grid item xs={12} sm={6}>
				<LazyLoadImage
					src={`/images/wildriftrunes/${runeInspiration.id}.jpg`}
					className={styles.runeImage}
				/>

				<select
					onChange={(e) =>
						handleRuneSelectChange(e, 'secondary', 'inspiration')
					}
					value={runeInspiration.id}
					className={globalstyles.buildSelectInput}
				>
					{runes
						.filter(
							(rune: RuneInterface) =>
								rune.type === 'secondary' && rune.path === 'inspiration'
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
					id='runeInspiration'
					name='runeInspiration'
					rows={5}
					value={runeInspiration.reason}
					placeholder='Explanation'
					className={styles.explanationTextArea}
					// value={itemReason}
					onChange={(e) => handleRuneExplanationChange(e, 'inspiration')}
				></textarea>
			</Grid>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		runeInspiration: state.build.runes.inspiration,
		runes: state.gameData.runes,
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type InspirationProps = PropsFromRedux & {
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

export default connector(Inspiration);
