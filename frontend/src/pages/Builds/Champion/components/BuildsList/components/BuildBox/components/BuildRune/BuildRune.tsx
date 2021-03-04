import React, { useState } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Components
import RunePopover from '../../../../../../../../../components/Popover/RunePopover';
// CSS
import styles from './buildrune.module.css';
// Types
import { RuneInterface } from '../../../../../../../../../utils/interfaces';
type BuildRuneProps = {
	rune: RuneInterface;
};

const BuildRune = (props: BuildRuneProps) => {
	const { rune } = props;

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
			<LazyLoadImage
				src={`/images/wildriftrunes/${rune.id}.jpg`}
				className={styles.runeImage}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			/>
			<RunePopover
				rune={rune}
				anchorEl={anchorEl}
				open={open}
				handlePopoverClose={handlePopoverClose}
			/>
		</>
	);
};

export default BuildRune;
