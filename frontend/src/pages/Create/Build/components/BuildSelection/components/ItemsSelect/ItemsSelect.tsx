import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
// Components
// CSS
import styles from './itemsselect.module.css';
// Types
import { ItemInterface } from '../../../../../../../utils/interfaces';
type ItemsSelectProps = {
	formControl: string;
	items: Array<ItemInterface>;
	itemsConfirmed: Array<ItemInterface>;
	itemSelected: ItemInterface;
	handleItemSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
	handleItemTypeChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const ItemsSelect = (props: ItemsSelectProps) => {
	const {
		formControl,
		items,
		itemsConfirmed,
		itemSelected,
		handleItemSelectChange,
		handleItemTypeChange,
	} = props;

	return (
		<Box>
			<p>4. Items</p>

			<Box>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Box>
							{itemSelected ? (
								<LazyLoadImage
									src={`/images/wildriftitems/${itemSelected.id}.png`}
									style={{ width: '100px', marginRight: '10px' }}
								/>
							) : (
								// Defaults to "Abyssal Mask" image if no item selected
								<LazyLoadImage
									src={`/images/wildriftitems/a42bcabd-290c-47f2-ae68-258d412c6d8d.png`}
									style={{ width: '100px', marginRight: '10px' }}
								/>
							)}

							{
								<FormControl className={formControl}>
									<InputLabel shrink htmlFor='item-select'>
										Item
									</InputLabel>
									<NativeSelect
										onChange={handleItemSelectChange}
										inputProps={{
											name: 'item',
											id: 'item-select',
										}}
									>
										{items.map(
											({ id, itemName, url }: ItemInterface, index) => {
												return (
													<option key={index} value={id}>
														{itemName}
													</option>
												);
											}
										)}
									</NativeSelect>
									<FormHelperText>Add an item to your build</FormHelperText>
								</FormControl>
							}

							<Box>
								<span>Item Type</span>
								<RadioGroup
									row
									name='position'
									defaultValue='primary'
									style={{
										display: 'inline-block',
									}}
									onChange={handleItemTypeChange}
								>
									<FormControlLabel
										value='primary'
										control={<Radio color='primary' />}
										label='Primary'
										labelPlacement='end'
										style={{ margin: '0' }}
									/>
									<FormControlLabel
										value='optional'
										control={<Radio color='primary' />}
										label='Optional'
										labelPlacement='end'
										style={{ margin: '0' }}
									/>
								</RadioGroup>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box>
							<textarea
								id='w3review'
								name='w3review'
								rows={6}
								placeholder='Add an explanation for this item'
								style={{ width: '100%' }}
							></textarea>
							<Box display='flex' flexDirection='row-reverse'>
								<Box>
									<Button
										variant='contained'
										color='primary'
										// onClick={handleAddItemClick}
									>
										Add Item
									</Button>
								</Box>
							</Box>
						</Box>
					</Grid>

					{/* Items List */}
					<Grid item xs={12}>
						<Box>
							<Typography gutterBottom>Items List</Typography>

							<Box
								style={{
									backgroundColor: '#e6e6e6',
									padding: '20px',
								}}
							>
								{itemsConfirmed.length !== 0 ? (
									<>
										{/* TYPE: MAIN */}
										<p>Primary Items</p>
										<Grid item xs={12}>
											{itemsConfirmed
												.filter((item) => item.type !== 'optional')
												.map((currentItem) => {
													return (
														<Grow in={true}>
															<Box
																style={{
																	display: 'inline-block',
																	margin: '0px 3px',
																}}
															>
																<Box
																	style={{
																		display: 'flex',
																		justifyContent: 'center',
																	}}
																>
																	<LazyLoadImage
																		title={currentItem.itemName}
																		className={styles.itemHover}
																		src={`/images/wildriftitems/${currentItem.id}.png`}
																	/>
																</Box>
															</Box>
														</Grow>
													);
												})}
										</Grid>

										<p>Optional Items</p>
										{/* TYPE: OPTIONAL */}
										<Grid item xs={12}>
											{itemsConfirmed
												.filter((item) => item.type !== 'primary')
												.map((currentItem: ItemInterface) => {
													return (
														<>
															<Grow in={true}>
																<Box
																	style={{
																		display: 'inline-block',
																		margin: '0px 3px',
																	}}
																>
																	<Box
																		style={{
																			display: 'flex',
																			justifyContent: 'center',
																		}}
																	>
																		<LazyLoadImage
																			title={currentItem.itemName}
																			className={styles.itemHover}
																			src={`/images/wildriftitems/${currentItem.id}.png`}
																		/>
																	</Box>
																</Box>
															</Grow>
														</>
													);
												})}
										</Grid>
									</>
								) : (
									<p>You haven't added any items to your build yet.</p>
								)}
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default ItemsSelect;
