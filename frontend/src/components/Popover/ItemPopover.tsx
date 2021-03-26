import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
// Types
import { ItemInterface } from '../../shared/constants/interfaces';
// CSS
import styles from './popover.module.css';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		popover: {
			pointerEvents: 'none',
		},
		paper: {
			padding: '20px',
			backgroundColor: '#171717',
			color: '#FFFFFF',
			width: '400px',
			boxShadow: 'none',
			border: '1px solid #505C75',
		},
	})
);

type ItemPopoverProps = {
	anchorEl: HTMLElement | null;
	handlePopoverClose: () => void;
	item: ItemInterface;
	open: boolean;
};

const ItemPopover = (props: ItemPopoverProps) => {
	const { anchorEl, handlePopoverClose, item, open } = props;
	const { description, itemName, price, statistics } = item;

	const classes = useStyles();

	return (
		<Popover
			className={classes.popover}
			classes={{
				paper: classes.paper,
			}}
			id='mouse-over-popover'
			open={open}
			onClose={handlePopoverClose}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			disableRestoreFocus
			disableScrollLock
		>
			<Typography className={styles.popoverItemName}>{itemName}</Typography>
			<LazyLoadImage
				src='/images/coin.png'
				className={styles.popoverCoinImage}
			/>
			<Typography className={styles.popoverItemPrice}>{price}</Typography>

			{/* === Statistics === */}
			<Box className={styles.popoverSectionContainer}>
				{statistics.map((stat, index) => {
					return (
						<p key={index} className={styles.popoverStatText}>
							{stat}
						</p>
					);
				})}
			</Box>

			{/* === Description === */}
			<Box className={styles.popoverSectionContainer}>
				{description &&
					description.map((desc, index) => {
						const indexOfColon = desc.indexOf(':');
						const descTitle = desc.slice(0, indexOfColon);
						const descDescription = desc.slice(indexOfColon, desc.length);

						return (
							<Box key={index} className={styles.popoverItemDescContainer}>
								<span
									style={{ color: indexOfColon < 0 ? '#CFCFCF' : '#ffb84d' }}
								>
									{descTitle}
								</span>
								<span>{descDescription}</span>
							</Box>
						);
					})}
			</Box>
		</Popover>
	);
};

export default ItemPopover;
