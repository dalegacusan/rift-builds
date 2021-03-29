import React, { useState, useEffect } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ERROR } from '../../../../../../../shared/utils/messages';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import { Theme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
// Components
import ItemPopover from '../../../../../../../components/Popover/ItemPopover';
// Types
import {
	ItemInterface,
	snackbarControlsInterface,
	RootState,
} from '../../../../../../../shared/constants/interfaces';
// CSS

import styles from './itemsselected.module.css';
const useStylesBootstrap = makeStyles((theme: Theme) => ({
	tooltip: {
		letterSpacing: '0.3px',
	},
}));

const ItemsSelected = (props: ItemsSelectedProps) => {
	const { handleDeleteItemClick } = props;
	// Build PROPS
	const { itemsConfirmed, setItemsConfirmed } = props;
	// Snackbar Control PROPS
	const { setSnackbarControls } = props;

	const classes = useStylesBootstrap();

	// Check for duplicate items selected
	// Check for primary items limit
	useEffect(() => {
		const primaryItems = itemsConfirmed.filter(
			(item) => item.type === 'primary'
		);

		var itemArray = itemsConfirmed.map((item) => {
			return item.id;
		});
		var isDuplicate = itemArray.some((item, index) => {
			return itemArray.indexOf(item) !== index;
		});

		// Remove duplicates from itemsConfirmed Array
		const filteredItemsConfirmed = itemsConfirmed.filter(
			(item, index, arr) => arr.findIndex((t) => t.id === item.id) === index
		);

		if (isDuplicate) {
			setItemsConfirmed(filteredItemsConfirmed);

			setSnackbarControls({
				snackbarControls: {
					message: ERROR.HAS_DUPLICATE_ITEMS,
					shouldOpen: true,
					snackbarType: 'error',
				},
			});
		} else if (primaryItems.length > 6) {
			setSnackbarControls({
				snackbarControls: {
					message: ERROR.CAN_ONLY_HAVE_SIX_PRIMARY_ITEMS,
					shouldOpen: true,
					snackbarType: 'error',
				},
			});

			const itemsConfirmedCopy = [...itemsConfirmed];

			itemsConfirmedCopy.pop();

			setItemsConfirmed(itemsConfirmedCopy);
		}
	}, [itemsConfirmed]);

	return (
		<Box>
			<Box className={styles.itemsSelectedContainer}>
				{itemsConfirmed.length !== 0 ? (
					<>
						{/* TYPE: MAIN */}
						<Box display='flex'>
							<Box flexGrow={1}>
								<p className={styles.itemsSelectedHeader}>Primary Items</p>
							</Box>
							<Box>
								<Tooltip
									title='Click on an item to delete it from your list'
									placement='top'
									classes={classes}
									arrow
								>
									<InfoIcon className={styles.infoIcon} />
								</Tooltip>
							</Box>
						</Box>

						<Grid item xs={12}>
							{itemsConfirmed
								.filter((item: ItemInterface) => item.type !== 'optional')
								.map((currentItem, index) => {
									return (
										<Grow
											key={index}
											in={true}
											style={{ transformOrigin: '0 0 0' }}
											{...(true ? { timeout: 200 } : {})}
										>
											<Box className={styles.itemContainer}>
												<Box className={styles.itemImageContainer}>
													<LazyLoadImage
														title={currentItem.itemName}
														className={styles.itemImage}
														src={`/images/wildriftitems/${currentItem.id}.png`}
														onClick={() =>
															handleDeleteItemClick(currentItem.id)
														}
													/>
												</Box>
											</Box>
										</Grow>
									);
								})}
						</Grid>

						{/* TYPE: OPTIONAL */}
						<p className={styles.itemsSelectedHeader}>Optional Items</p>
						<Grid item xs={12}>
							{itemsConfirmed
								.filter((item: ItemInterface) => item.type !== 'primary')
								.map((currentItem: ItemInterface, index) => {
									return (
										<Grow
											key={index}
											in={true}
											style={{ transformOrigin: '0 0 0' }}
											{...(true ? { timeout: 200 } : {})}
										>
											<Box className={styles.itemContainer}>
												<Box className={styles.itemImageContainer}>
													<LazyLoadImage
														title={currentItem.itemName}
														className={styles.itemImage}
														src={`/images/wildriftitems/${currentItem.id}.png`}
														onClick={() =>
															handleDeleteItemClick(currentItem.id)
														}
													/>
												</Box>
											</Box>
										</Grow>
									);
								})}
						</Grid>
					</>
				) : (
					<p>You haven't added any items to your build yet.</p>
				)}
			</Box>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		itemsConfirmed: state.build.itemsConfirmed,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setItemsConfirmed: (newItemsConfirmed: Array<ItemInterface>) =>
			dispatch({
				type: actionTypes.BUILD_SET_ITEMSCONFIRMED,
				data: newItemsConfirmed,
			}),
		setSnackbarControls: (newControls: snackbarControlsInterface) =>
			dispatch({
				type: actionTypes.SNACKBAR_SET_CONTROLS,
				data: newControls.snackbarControls,
			}),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ItemsSelectedProps = PropsFromRedux & {
	handleDeleteItemClick: (itemId: string) => void;
};

export default connector(ItemsSelected);
