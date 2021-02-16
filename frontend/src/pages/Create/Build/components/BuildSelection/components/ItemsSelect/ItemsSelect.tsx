import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// Components
import ItemsSelected from '../ItemsSelected/ItemsSelected';
// CSS
import styles from './itemsselect.module.css';
// Types
import { ItemInterface } from '../../../../../../../utils/interfaces';
type ItemsSelectProps = {
	formControl: string;
	items: Array<ItemInterface>;
	itemsConfirmed: Array<ItemInterface>;
	itemSelected: ItemInterface;
	handleAddItemClick(): void;
	handleDeleteItemClick(itemId: string): void;
	handleItemExplanationChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
	handleItemSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
	handleItemTypeChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const ItemsSelect = (props: ItemsSelectProps) => {
	const {
		formControl,
		items,
		itemsConfirmed,
		itemSelected,
		handleAddItemClick,
		handleDeleteItemClick,
		handleItemExplanationChange,
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
							{/* ITEM IMAGE */}
							{itemSelected ? (
								<LazyLoadImage
									src={`/images/wildriftitems/${itemSelected.id}.png`}
									className={styles.itemImage}
								/>
							) : (
								// Defaults to "Abyssal Mask" image if no item is selected
								<LazyLoadImage
									src={`/images/wildriftitems/a42bcabd-290c-47f2-ae68-258d412c6d8d.png`}
									className={styles.itemImage}
								/>
							)}

							{/* <SELECT> */}
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

							{/* ITEM TYPE */}
							<Box>
								<span>Item Type</span>
								<RadioGroup
									row
									name='position'
									defaultValue='primary'
									className={styles.radioGroup}
									onChange={handleItemTypeChange}
								>
									<FormControlLabel
										value='primary'
										control={<Radio color='primary' />}
										label='Primary'
										labelPlacement='end'
										className={styles.radioButton}
									/>
									<FormControlLabel
										value='optional'
										control={<Radio color='primary' />}
										label='Optional'
										labelPlacement='end'
										className={styles.radioButton}
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
								className={styles.explanationTextArea}
								// value={dialogValue}
								onChange={(e) => handleItemExplanationChange(e)}
							></textarea>
							<Box display='flex' flexDirection='row-reverse'>
								<Box>
									<Button
										variant='contained'
										color='primary'
										onClick={handleAddItemClick}
									>
										Add Item
									</Button>
								</Box>
							</Box>
						</Box>
					</Grid>

					{/* Items List */}
					<Grid item xs={12}>
						<ItemsSelected
							itemsConfirmed={itemsConfirmed}
							handleDeleteItemClick={handleDeleteItemClick}
						/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default ItemsSelect;
