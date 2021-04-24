import React, { useState } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
// Components
import ItemPopover from '../../../../../../shared/components/Popover/ItemPopover';
// Types
import { ItemInterface } from '../../../../../../shared/interfaces/GameData';
// CSS
import styles from './Styles.module.css';

type BuildItemProps = {
	item: ItemInterface;
	handleDeleteItemClick: (itemId: string) => void;
};

const BuildItem = (props: BuildItemProps) => {
	const { item, handleDeleteItemClick } = props;
	const { id: itemId, itemName } = item;

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
		<Grow
			in={true}
			style={{ transformOrigin: '0 0 0' }}
			{...(true ? { timeout: 200 } : {})}
		>
			<Box className={styles.itemContainer}>
				<Box className={styles.itemImageContainer}>
					<LazyLoadImage
						title={itemName}
						className={styles.itemImage}
						src={`/images/wildriftitems/${itemId}.png`}
						onClick={() => handleDeleteItemClick(itemId)}
						onMouseEnter={handlePopoverOpen}
						onMouseLeave={handlePopoverClose}
					/>
					<ItemPopover
						item={item}
						anchorEl={anchorEl}
						open={open}
						handlePopoverClose={handlePopoverClose}
					/>
				</Box>
			</Box>
		</Grow>
	);
};

export default BuildItem;
