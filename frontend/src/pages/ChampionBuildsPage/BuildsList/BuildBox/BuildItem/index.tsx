import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Shared
import { ImagePath } from '../../../../../shared/utils/imagePath';

// Components
import ItemPopover from '../../../../../shared/components/Popover/ItemPopover';

// CSS
import styles from './Styles.module.css';

// Types
import { ItemInterface } from '../../../../../shared/interfaces/GameData';

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
				src={ImagePath.Item(item.id)}
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
