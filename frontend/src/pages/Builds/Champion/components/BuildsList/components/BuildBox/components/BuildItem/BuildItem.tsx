import React, { useState } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Components
import ItemPopover from '../../../../../../../../../shared/components/Popover/ItemPopover';
// CSS
import styles from './builditem.module.css';
// Types
import { ItemInterface } from '../../../../../../../../../shared/interfaces/Build';
type BuildItemsProps = {
	item: ItemInterface;
};

const BuildItems = (props: BuildItemsProps) => {
	const { item } = props;

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
				src={`/images/wildriftitems/${item.id}.png`}
				className={styles.itemImage}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			/>
			<ItemPopover
				item={item}
				anchorEl={anchorEl}
				open={open}
				handlePopoverClose={handlePopoverClose}
			/>
		</>
	);
};

export default BuildItems;
