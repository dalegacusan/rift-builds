import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Components
// CSS
import styles from './itemsselected.module.css';
// Types
import { ItemInterface } from '../../../../../../../utils/interfaces';
type ItemsSelectedProps = {
	itemsConfirmed: Array<ItemInterface>;
	handleDeleteItemClick(itemId: string): void;
};

const ItemsSelected = (props: ItemsSelectedProps) => {
	const { itemsConfirmed, handleDeleteItemClick } = props;

	return (
		<Box>
			<Typography gutterBottom>Items List</Typography>

			<Box className={styles.itemsSelectedContainer}>
				{itemsConfirmed.length !== 0 ? (
					<>
						{/* TYPE: MAIN */}
						<p>Primary Items</p>
						<Grid item xs={12}>
							{itemsConfirmed
								.filter((item) => item.type !== 'optional')
								.map((currentItem, index) => {
									return (
										<Grow
											key={index}
											in={true}
											style={{ transformOrigin: '0 0 0' }}
											{...(true ? { timeout: 200 } : {})}
										>
											<Tooltip title='Delete'>
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
											</Tooltip>
										</Grow>
									);
								})}
						</Grid>

						{/* TYPE: OPTIONAL */}
						<p>Optional Items</p>
						<Grid item xs={12}>
							{itemsConfirmed
								.filter((item) => item.type !== 'primary')
								.map((currentItem: ItemInterface, index) => {
									return (
										<Grow
											key={index}
											in={true}
											style={{ transformOrigin: '0 0 0' }}
											{...(true ? { timeout: 200 } : {})}
										>
											<Tooltip title='Delete'>
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
											</Tooltip>
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

export default ItemsSelected;
