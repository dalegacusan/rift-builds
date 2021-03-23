import React, { useState } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Components
import SpellPopover from '../../../../../../../../../components/Popover/SpellPopover';
// CSS
import styles from './buildspell.module.css';
// Types
import { SpellInterface } from '../../../../../../../../../shared/constants/interfaces';
type BuildSpellProps = {
	spell: SpellInterface;
};

const BuildSpell = (props: BuildSpellProps) => {
	const { spell } = props;

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
				src={`/images/wildriftspells/${spell.id}.jpg`}
				className={styles.spellImage}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			/>
			<SpellPopover
				spell={spell}
				anchorEl={anchorEl}
				open={open}
				handlePopoverClose={handlePopoverClose}
			/>
		</>
	);
};

export default BuildSpell;
