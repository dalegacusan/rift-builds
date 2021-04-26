import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ImagePath } from '../../../../../shared/utils/imagePath';

// Components
import SpellPopover from '../../../../../shared/components/Popover/SpellPopover';
// CSS
import styles from './Styles.module.css';
// Types
import { SpellInterface } from '../../../../../shared/interfaces/GameData';
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
				src={ImagePath.Spell(spell.id)}
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
