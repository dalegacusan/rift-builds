import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Alerts (react-hot-toast)
import toast, { Toaster } from 'react-hot-toast';
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
// Components
import Layout from '../../../components/Layout';
// CSS
import styles from './CreateBuild.module.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));
// Types
interface ChampionInterface {
	id: string;
	championName: string;
	url: string;
}
interface ItemInterface {
	id: string;
	itemName: string;
	reason?: string;
	type: string;
	url: string;
}
interface BuildInterface {
	username: string;
	champion: ChampionInterface;
	items: ItemInterface[];
}

export default function Landing() {
	const [champions, setChampions] = useState<Array<ChampionInterface>>([]);
	const [items, setItems] = useState<Array<ItemInterface>>([]);
	const [championSelected, setChampionSelected] = useState<ChampionInterface>(
		// Defaults to Champion: 'Ahri' - which is the first option
		{
			id: '48ca031a-d92e-44e6-b7b6-f3eb1dbe644c',
			championName: 'Ahri',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Ahri_wild_rift.png',
		}
	);
	const [itemSelected, setItemSelected] = useState<ItemInterface>(
		// Defaults to Item: 'Abyssal Mask' which is the first option
		{
			id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
			itemName: 'Abyssal Mask',
			type: 'primary',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/abyssalmask_wild_rift.png',
		}
	);
	const [itemsConfirmed, setItemsConfirmed] = useState<Array<ItemInterface>>(
		[]
	);
	const [build, setBuild] = useState<BuildInterface>();
	const [username, setUsername] = useState('');
	const [dialogItem, setDialogItem] = useState<ItemInterface>({
		id: '',
		itemName: '',
		type: 'primary',
		url: '',
	});
	const [itemType, setItemType] = useState('primary');

	const classes = useStyles();

	// Error Notifications
	const errorNoUsername = () => toast.error('Please enter your username');
	const errorNoItemsSelected = () =>
		toast.error('Please add items to your build');
	const errorItemDuplicate = () =>
		toast.error('That item is already in your build!');
	const errorBuildSaved = () => toast.error('Failed to save your build.');
	const successBuildSaved = () =>
		toast.success('Successfully saved your build!');

	useEffect(() => {
		const getChampions = axios.get('/api/champion/all');
		const getItems = axios.get('/api/item/all');

		Promise.all([getChampions, getItems]).then((values) => {
			const [{ data: championsArray }, { data: itemsArray }] = values;

			// Sort Champions
			championsArray.sort(function (
				a: ChampionInterface,
				b: ChampionInterface
			) {
				if (a.championName < b.championName) {
					return -1;
				}
				if (a.championName > b.championName) {
					return 1;
				}
				return 0;
			});
			setChampions(championsArray);

			// Sort Items
			itemsArray.sort(function (a: ItemInterface, b: ItemInterface) {
				if (a.itemName < b.itemName) {
					return -1;
				}
				if (a.itemName > b.itemName) {
					return 1;
				}
				return 0;
			});
			setItems(itemsArray);
		});
	}, []);

	// Check for duplicate items selected
	useEffect(() => {
		var itemArray = itemsConfirmed.map((item) => {
			return item.id;
		});
		var isDuplicate = itemArray.some((item, index) => {
			return itemArray.indexOf(item) != index;
		});

		// Remove duplicates from itemsConfirmed Array
		const filteredItemsConfirmed = itemsConfirmed.filter(
			(item, index, arr) => arr.findIndex((t) => t.id === item.id) === index
		);

		if (isDuplicate) {
			setItemsConfirmed(filteredItemsConfirmed);
			errorItemDuplicate();
		}
	}, [itemsConfirmed]);

	const handleChampSelectChange = (e: any) => {
		const getChampion = champions.find(
			(champ: ChampionInterface) => champ.id === e.target.value
		);

		if (!getChampion) {
			return;
		} else {
			setChampionSelected(getChampion);
		}
	};
	const handleItemSelectChange = (e: any) => {
		const getItem = items.find(
			(item: ItemInterface) => item.id === e.target.value
		);

		if (!getItem) {
			return;
		} else {
			setItemSelected(getItem);
		}
	};

	const handleAddItemClick = () => {
		// Pushes item to itemsConfirmed Array
		setItemsConfirmed([...itemsConfirmed, { ...itemSelected, type: itemType }]);
	};

	const handleItemReasonChange = (e: any) => {
		const dialogItemId = dialogItem ? dialogItem.id : null;
		setItemsConfirmed((prevState) => {
			// Create a copy of current state
			const itemsConfirmedCopy = [...prevState];

			const getItem = itemsConfirmedCopy.filter(
				(item) => item.id === dialogItemId
			)[0];
			// Get index of item in itemsConfirmedCopy Array
			const index = itemsConfirmedCopy.indexOf(getItem);

			// Set reason property to the input value
			getItem.reason = e.target.value;

			// Get object at index 'index' and set to modified item object
			itemsConfirmedCopy[index] = getItem;

			return itemsConfirmedCopy;
		});
	};

	const submitBuild = async () => {
		if (itemsConfirmed.length !== 0 && username) {
			const buildObject = {
				username: username,
				champion: championSelected,
				items: itemsConfirmed,
			};

			const saveToDatabase = await axios
				.post('/api/build/save', buildObject)
				.then((res) => {
					successBuildSaved();
					setBuild(buildObject);
				})
				.catch((err) => {
					errorBuildSaved();
				});
		} else {
			if (itemsConfirmed.length === 0) {
				errorNoItemsSelected();
			} else if (!username) {
				errorNoUsername();
			}
			return;
		}
	};

	const [openItemDialog, setOpenItemDialog] = useState(false);

	const handleClickOpen = (e: any, item: ItemInterface) => {
		setDialogItem(item);
		setOpenItemDialog(true);
	};

	const openedDialogItem = itemsConfirmed.filter(
		(item) => item.id === dialogItem.id
	)[0];
	const handleClose = (buttonClicked?: string) => {
		if (buttonClicked === 'confirm') {
			// If input value is empty, remove reason property from item object
			// ex: if user types something, a reason property is added,
			//     but once user clears the input, reason property is removed.
			if (
				openedDialogItem.reason === '' ||
				openedDialogItem.reason === undefined ||
				openedDialogItem.reason === null
			) {
				setItemsConfirmed((prevState) => {
					// Create a copy of current state
					const itemsConfirmedCopy = [...prevState];

					const getItem = itemsConfirmedCopy.filter(
						(item) => item.id === dialogItem.id
					)[0];
					// Get index of item in itemsConfirmedCopy Array
					const index = itemsConfirmedCopy.indexOf(getItem);

					// Delete reason property
					delete getItem.reason;

					// Get object at index 'index' and set to modified item object
					itemsConfirmedCopy[index] = getItem;

					return itemsConfirmedCopy;
				});
			}
		}

		setOpenItemDialog(false);
	};
	let dialogValue = openedDialogItem
		? openedDialogItem.reason
			? openedDialogItem.reason
			: ''
		: '';

	const handleClear = () => {
		setItemsConfirmed((prevState) => {
			// Create a copy of current state
			const itemsConfirmedCopy = [...prevState];

			const getItem = itemsConfirmedCopy.filter(
				(item) => item.id === dialogItem.id
			)[0];
			// Get index of item in itemsConfirmedCopy Array
			const index = itemsConfirmedCopy.indexOf(getItem);

			// Delete reason property
			delete getItem.reason;

			// Get object at index 'index' and set to modified item object
			itemsConfirmedCopy[index] = getItem;

			return itemsConfirmedCopy;
		});
	};

	const handleItemTypeChange = (e: any) => {
		setItemType(e.target.value);
	};

	return (
		<>
			<Toaster />
			<div className={classes.root}>
				<Grid container>
					<Dialog
						open={openItemDialog}
						onClose={() => handleClose()}
						aria-labelledby='form-dialog-title'
					>
						<DialogTitle id='form-dialog-title'>
							{dialogItem ? dialogItem.itemName : null}
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Let others know why you chose this item by giving an explanation
								below.
							</DialogContentText>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Explanation'
								multiline
								fullWidth
								value={dialogValue}
								onChange={(e) => handleItemReasonChange(e)}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClear} color='primary'>
								Clear
							</Button>
							<Button onClick={() => handleClose('confirm')} color='primary'>
								Confirm
							</Button>
						</DialogActions>
					</Dialog>
					{/* Select Champion */}
					<Grid item xs={6}>
						<div>
							<p>Select Champion</p>
							{/* Display Champion Image */}
							{championSelected ? (
								<img
									src={`/images/wildriftchampions/${championSelected.id}.png`}
									style={{ width: '100px' }}
								/>
							) : (
								<img
									src={`/images/wildriftchampions/48ca031a-d92e-44e6-b7b6-f3eb1dbe644c.png`}
								/>
							)}

							{
								<FormControl className={classes.formControl}>
									<InputLabel shrink htmlFor='champion-select'>
										Champion
									</InputLabel>
									<NativeSelect
										onChange={handleChampSelectChange}
										inputProps={{
											name: 'champion',
											id: 'champion-select',
										}}
									>
										{champions.map(
											({ id, championName, url }: ChampionInterface, index) => {
												return <option value={id}>{championName}</option>;
											}
										)}
									</NativeSelect>
									<FormHelperText>Select a champion</FormHelperText>
								</FormControl>
							}
						</div>
					</Grid>

					{/* Select Item */}
					<Grid item xs={6}>
						<div>
							<p>Select Item</p>

							{itemSelected ? (
								<img src={`/images/wildriftitems/${itemSelected.id}.png`} />
							) : (
								<img
									src={`/images/wildriftitems/a42bcabd-290c-47f2-ae68-258d412c6d8d.png`}
								/>
							)}

							{
								<FormControl className={classes.formControl}>
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
												return <option value={id}>{itemName}</option>;
											}
										)}
									</NativeSelect>
									<FormHelperText>Add an item to your build</FormHelperText>
								</FormControl>
							}

							<Box>
								<p>Item Type</p>
								<RadioGroup
									row
									name='position'
									defaultValue='primary'
									style={{
										display: 'inline-block',
									}}
									onChange={(e) => handleItemTypeChange(e)}
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

							<br />

							<Button
								variant='contained'
								color='secondary'
								onClick={handleAddItemClick}
							>
								Add Item
							</Button>
						</div>
					</Grid>

					{/* Items List */}
					<Grid item xs={12}>
						<div>
							<div>
								<h3>Items List</h3>

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
																		<img
																			title={currentItem.itemName}
																			className={styles.itemHover}
																			src={`/images/wildriftitems/${currentItem.id}.png`}
																			onClick={(e) =>
																				handleClickOpen(e, currentItem)
																			}
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
																			<img
																				title={currentItem.itemName}
																				className={styles.itemHover}
																				src={`/images/wildriftitems/${currentItem.id}.png`}
																				onClick={(e) =>
																					handleClickOpen(e, currentItem)
																				}
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
								<label>
									Click an item to explain why it's a part of your build
								</label>
							</div>
						</div>
					</Grid>

					{/* Other */}
					<Grid item xs={12}>
						<Box
							style={{
								padding: '10px 0',
								// backgroundColor: 'green',
							}}
						>
							<h3>Player Details</h3>
							<TextField
								id='username'
								label='Username'
								placeholder='Username'
								value={username}
								helperText='Please include your ID (ex: ABC#DEFGH)'
								variant='outlined'
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Box>

						{/* Build Box */}
						<Box>
							<Button variant='contained' color='primary' onClick={submitBuild}>
								Submit Build
							</Button>
						</Box>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
