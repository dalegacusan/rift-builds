import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ImagePath } from '../../../../../shared/utils/imagePath';
import {
	ItemType,
	ItemStatus,
} from '../../../../../shared/constants/constants';
import { DefaultSelectedState } from '../../../../../shared/constants/defaultSelectedState';
import { RequiredLength } from '../../../../../shared/constants/requiredLength';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../shared/store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// Components
import ItemsSelected from '../ItemsSelected';
// CSS
import globalstyles from '../../Styles.module.css';
import styles from './Styles.module.css';
// Types
import { ItemInterface } from '../../../../../shared/interfaces/GameData';
import { RootState } from '../../../../../shared/interfaces/GlobalStore';

const ItemsSelect = (props: ItemsSelectProps) => {
	// Game Data PROPS
	const { items } = props;
	// Build PROPS
	const { itemsConfirmed, setItemsConfirmed } = props;

	const [itemSelected, setItemSelected] = useState<ItemInterface>(
		// Defaults to Item: 'Abyssal Mask' which is the first option
		DefaultSelectedState.ITEM
	);
	const [itemType, setItemType] = useState(ItemType.PRIMARY);
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
			<p className={globalstyles.inputLabel}>
				6. Items <span className={globalstyles.requiredInput}>*</span>
			</p>
			<p className={globalstyles.inputDescription}>
				Select the items for your build&nbsp;
			</p>

			<Box>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Box>
							{/* ITEM IMAGE */}
							<LazyLoadImage
								src={ImagePath.Item(itemSelected.id)}
								className={styles.itemImage}
							/>

							{/* <SELECT> */}
							<select
								onChange={handleItemSelectChange}
								className={globalstyles.buildSelectInput}
							>
								{items.map((item: ItemInterface, index: number) => {
									const { id: itemId, itemName, status } = item;

									if (status !== ItemStatus.REMOVED) {
										return (
											<option
												key={index}
												value={itemId}
												className={globalstyles.buildSelectOption}
											>
												{itemName}
											</option>
										);
									}
								})}
							</select>

							{/* ITEM TYPE */}
							<Box>
								<RadioGroup
									row
									name='position'
									defaultValue={ItemType.PRIMARY}
									className={styles.radioGroup}
									onChange={handleItemTypeChange}
								>
									<FormControlLabel
										value={ItemType.PRIMARY}
										control={
											<Radio color='primary' className={styles.radioButton} />
										}
										label='Primary'
										labelPlacement='end'
										className={styles.radioButtonContainer}
									/>
									<FormControlLabel
										value={ItemType.OPTIONAL}
										control={
											<Radio color='primary' className={styles.radioButton} />
										}
										label='Optional'
										labelPlacement='end'
										className={styles.radioButtonContainer}
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
								rows={5}
								value={itemReason}
								placeholder='Explanation'
								className={styles.explanationTextArea}
								maxLength={RequiredLength.REASON.MAX_LENGTH}
								onChange={(e) => handleItemExplanationChange(e)}
							/>
							<Box
								display='flex'
								flexDirection='row-reverse'
								className={styles.addItemButtonContainer}
							>
								<Button
									variant='contained'
									style={{ backgroundColor: '#326cac' }}
									onClick={handleAddItemClick}
									className={styles.addItemButton}
								>
									Add Item
								</Button>
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

type ItemsSelectProps = PropsFromRedux;

export default connector(ItemsSelect);
