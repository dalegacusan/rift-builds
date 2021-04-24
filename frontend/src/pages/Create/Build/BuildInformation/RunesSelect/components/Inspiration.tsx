import React, { useState } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { RequiredLength } from '../../../../../../shared/constants/requiredLength';
import { Rune } from '../../../../../../shared/constants/constants';

// Redux
import { connect, ConnectedProps } from 'react-redux';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import RunePopover from '../../../../../../shared/components/Popover/RunePopover';
// CSS
import globalstyles from '../../../Styles.module.css';
import styles from './rune.module.css';
// Types
import { RuneInterface } from '../../../../../../shared/interfaces/GameData';
import { RootState } from '../../../../../../shared/interfaces/GlobalStore';

const Inspiration = (props: InspirationProps) => {
	const { handleRuneSelectChange, handleRuneExplanationChange } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runeInspiration } = props;

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const handlePopoverOpen = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Grid item xs={12} sm={6}>
				<LazyLoadImage
					src={`/images/wildriftrunes/${runeInspiration.id}.jpg`}
					className={styles.runeImage}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				/>
				<RunePopover
					rune={runeInspiration}
					anchorEl={anchorEl}
					open={open}
					handlePopoverClose={handlePopoverClose}
				/>

				<select
					onChange={(e) =>
						handleRuneSelectChange(
							e,
							Rune.TYPE.SECONDARY,
							Rune.PATH.INSPIRATION
						)
					}
					value={runeInspiration.id}
					className={globalstyles.buildSelectInput}
				>
					{runes
						.filter(
							(rune: RuneInterface) =>
								rune.type === Rune.TYPE.SECONDARY &&
								rune.path === Rune.PATH.INSPIRATION
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
					maxLength={RequiredLength.REASON.MAX_LENGTH}
					onChange={(e) =>
						handleRuneExplanationChange(e, Rune.PATH.INSPIRATION)
					}
				/>
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
