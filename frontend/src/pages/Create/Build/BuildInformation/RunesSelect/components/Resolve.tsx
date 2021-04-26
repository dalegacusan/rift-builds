import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ImagePath } from '../../../../../../shared/utils/imagePath';
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

const Resolve = (props: ResolveProps) => {
	const { handleRuneSelectChange, handleRuneExplanationChange } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runeResolve } = props;

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
					src={ImagePath.Rune(runeResolve.id)}
					className={styles.runeImage}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				/>
				<RunePopover
					rune={runeResolve}
					anchorEl={anchorEl}
					open={open}
					handlePopoverClose={handlePopoverClose}
				/>

				<select
					onChange={(e) =>
						handleRuneSelectChange(e, Rune.TYPE.SECONDARY, Rune.PATH.RESOLVE)
					}
					value={runeResolve.id}
					className={globalstyles.buildSelectInput}
				>
					{runes
						.filter(
							(rune: RuneInterface) =>
								rune.type === Rune.TYPE.SECONDARY &&
								rune.path === Rune.PATH.RESOLVE
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
					maxLength={RequiredLength.REASON.MAX_LENGTH}
					onChange={(e) => handleRuneExplanationChange(e, Rune.PATH.RESOLVE)}
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
