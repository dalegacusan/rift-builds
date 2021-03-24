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
} from '../../../../../../../../shared/constants/interfaces';

const Resolve = (props: ResolveProps) => {
	const { handleRuneSelectChange, handleRuneExplanationChange } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runeResolve } = props;

	return (
		<>
			<Grid item xs={12} sm={6}>
				<LazyLoadImage
					src={`/images/wildriftrunes/${runeResolve.id}.jpg`}
					className={styles.runeImage}
				/>

				<select
					onChange={(e) => handleRuneSelectChange(e, 'secondary', 'resolve')}
					value={runeResolve.id}
					className={globalstyles.buildSelectInput}
				>
					{runes
						.filter(
							(rune: RuneInterface) =>
								rune.type === 'secondary' && rune.path === 'resolve'
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
					id='runeResolve'
					name='runeResolve'
					rows={5}
					value={runeResolve.reason}
					placeholder='Explanation'
					className={styles.explanationTextArea}
					maxLength={400}
					onChange={(e) => handleRuneExplanationChange(e, 'resolve')}
				/>
			</Grid>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		runeResolve: state.build.runes.resolve,
		runes: state.gameData.runes,
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ResolveProps = PropsFromRedux & {
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

export default connector(Resolve);
