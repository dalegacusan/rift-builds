import React, { useState } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

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
import {
	ItemInterface,
	RootState,
} from '../../../../../../../utils/interfaces';

const ItemsSelect = (props: ItemsSelectProps) => {
	const { formControl } = props;
	// Game Data PROPS
	const { items } = props;
	// Build PROPS
	const { itemsConfirmed, setItemsConfirmed } = props;

	const [itemSelected, setItemSelected] = useState<ItemInterface>(
		// Defaults to Item: 'Abyssal Mask' which is the first option
		{
			id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
			itemName: 'Abyssal Mask',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/abyssalmask_wild_rift.png',
			category: 'defense',
			tier: 'upgraded',
			statistics: [
				'+300 Max Health',
				'+40 Magic Resistance',
				'+300 Max Mana',
				'+10 Ability Haste',
			],
			description: [
				'Eternity: Restore Mana equal to 15% of the damage taken from champions. Regen Health equal to 20% of Mana spent. Capped at 25 Health per cast.',
				'Abyssal: Nearby enemy champions take 15% bonus magic damage.',
			],
			price: 2800,
		}
	);
	const [itemType, setItemType] = useState('primary');
	const [itemReason, setItemReason] = useState('');

	const handleItemSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value: itemId } = e.target;

		const getItem = items.find((item: ItemInterface) => item.id === itemId);

		if (getItem) {
			setItemSelected(getItem);
		}
	};

	const handleItemTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setItemType(e.target.value);
	};

	const handleItemExplanationChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setItemReason(e.target.value);
	};

	const handleDeleteItemClick = (itemId: string) => {
		const filteredItems = itemsConfirmed.filter(
			(item: ItemInterface) => item.id !== itemId
		);

		if (filteredItems) {
			setItemsConfirmed(filteredItems);
		}
	};

	const handleAddItemClick = () => {
		// Pushes item to itemsConfirmed Array
		setItemsConfirmed([
			...itemsConfirmed,
			{ ...itemSelected, type: itemType, reason: itemReason },
		]);
		setItemReason('');
	};

	return (
		<Box>
			<p>4. Items</p>

			<Box>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Box>
							{/* ITEM IMAGE */}
							<LazyLoadImage
								src={`/images/wildriftitems/${itemSelected.id}.png`}
								className={styles.itemImage}
							/>

							{/* <SELECT> */}
							{
								<FormControl className={formControl}>
									<InputLabel shrink htmlFor='item-select'>
										Item
									</InputLabel>
									<NativeSelect
										value={itemSelected.id}
										onChange={handleItemSelectChange}
										inputProps={{
											name: 'item',
											id: 'item-select',
										}}
									>
										{items.map(
											({ id, itemName }: ItemInterface, index: number) => {
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

					{/* Item Explanation */}
					<Grid item xs={12} sm={6}>
						<Box>
							<textarea
								id='itemReason'
								name='itemReason'
								rows={6}
								value={itemReason}
								placeholder='Add an explanation for this item'
								className={styles.explanationTextArea}
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
						<ItemsSelected handleDeleteItemClick={handleDeleteItemClick} />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		itemsConfirmed: state.build.itemsConfirmed,
		items: state.gameData.items,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setItemsConfirmed: (items: Array<ItemInterface>) =>
			dispatch({ type: actionTypes.BUILD_SET_ITEMSCONFIRMED, data: items }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ItemsSelectProps = PropsFromRedux & {
	formControl: string;
};

export default connector(ItemsSelect);
