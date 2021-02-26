import React, { useState, useEffect } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
	errorItemDuplicate,
	errorPrimaryItemsLimit,
} from '../../../../../../../utils/alertpopups';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
// Components
import ItemPopover from '../../../../../../../components/Popover/ItemPopover';
// CSS
import styles from './itemsselected.module.css';
// Types
import {
	ItemInterface,
	RootState,
} from '../../../../../../../utils/interfaces';

const ItemsSelected = (props: ItemsSelectedProps) => {
	const { handleDeleteItemClick } = props;
	// Build PROPS
	const { itemsConfirmed, setItemsConfirmed } = props;

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
			errorItemDuplicate();
		} else if (primaryItems.length > 6) {
			errorPrimaryItemsLimit();

			const itemsConfirmedCopy = [...itemsConfirmed];

			itemsConfirmedCopy.pop();

			setItemsConfirmed(itemsConfirmedCopy);
		}
	}, [itemsConfirmed]);

	return (
		<Box>
			<Typography gutterBottom>Items List</Typography>
			<i>Click on an item to delete it from your list</i>

			<Box className={styles.itemsSelectedContainer}>
				{itemsConfirmed.length !== 0 ? (
					<>
						{/* TYPE: MAIN */}
						<p>Primary Items</p>
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
														className={styles.itemHover}
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
						<p>Optional Items</p>
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
														className={styles.itemHover}
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
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ItemsSelectedProps = PropsFromRedux & {
	handleDeleteItemClick: (itemId: string) => void;
};

export default connector(ItemsSelected);
