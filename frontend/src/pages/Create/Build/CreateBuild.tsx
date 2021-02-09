import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Redirect } from 'react-router-dom';

import {
	errorNoUsername,
	errorNoItemSelected,
	errorItemDuplicate,
	errorBuildSaved,
	errorPrimaryItemsLimit,
	successBuildSaved,
} from '../../../utils/errorPopups';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
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
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
// Components
import Layout from '../../../components/Layout';
// Types
import {
	ItemInterface,
	CountersInterface,
	ChampionInterface,
	RankInterface,
	RuneInterface,
	SpellInterface,
	BuildInterface,
} from '../../../utils/interfaces';
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
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

export default function Landing() {
	const [tabValue, setTabValue] = useState(0);
	const [openBackdrop, setOpenBackdrop] = useState(false);
	const [hasSubmittedBuild, setHasSubmittedBuild] = useState(false);

	const [username, setUsername] = useState('');
	const [champions, setChampions] = useState<Array<ChampionInterface>>([]);
	const [items, setItems] = useState<Array<ItemInterface>>([]);
	const [ranks, setRanks] = useState<Array<RankInterface>>([]);

	const [runes, setRunes] = useState<Array<RuneInterface>>([]);
	const [runeKeystone, setRuneKeystone] = useState<RuneInterface>({
		id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
		runeName: 'Aery',
		url:
			'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
		type: 'keystone',
		description: [
			'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
			'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
			'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
		],
	});
	const [runeDomination, setRuneDomination] = useState<RuneInterface>({
		id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
		runeName: 'Brutal',
		url:
			'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
		type: 'secondary',
		path: 'domination',
		description: [
			'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
		],
	});
	const [runeResolve, setRuneResolve] = useState<RuneInterface>({
		id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
		runeName: 'Backbone',
		url:
			'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
		type: 'secondary',
		path: 'resolve',
		description: [
			'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
		],
	});
	const [runeInspiration, setRuneInspiration] = useState<RuneInterface>({
		id: '80216900-b198-4195-ab1c-e6e309c28ff3',
		runeName: 'Hunter - Genius',
		url:
			'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
		type: 'secondary',
		path: 'inspiration',
		description: [
			'Gain 2.5 Ability Haste.',
			'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
		],
	});

	const [spells, setSpells] = useState<Array<SpellInterface>>([]);
	const [spellOne, setSpellOne] = useState<SpellInterface>({
		id: 'edbd4a33-514a-4334-8e61-01c296b8a767',
		spellName: 'Barrier',
		url:
			'/uploads/league-of-legends-wild-rift/images/summoner-spells/shield.jpg',
		description: [
			'Gain a shield that absorbs 115−465 (based on level) damage for 2 seconds.',
		],
		cooldown: '90',
	});
	const [spellTwo, setSpellTwo] = useState<SpellInterface>({
		id: 'edbd4a33-514a-4334-8e61-01c296b8a767',
		spellName: 'Barrier',
		url:
			'/uploads/league-of-legends-wild-rift/images/summoner-spells/shield.jpg',
		description: [
			'Gain a shield that absorbs 115−465 (based on level) damage for 2 seconds.',
		],
		cooldown: '90',
	});

	const [itemsConfirmed, setItemsConfirmed] = useState<Array<ItemInterface>>(
		[]
	);

	const [build, setBuild] = useState<BuildInterface>();

	const [openItemDialog, setOpenItemDialog] = useState(false);

	const [championSelected, setChampionSelected] = useState<ChampionInterface>(
		// Defaults to Champion: 'Ahri' - which is the first option
		{
			id: '48ca031a-d92e-44e6-b7b6-f3eb1dbe644c',
			championName: 'Ahri',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Ahri_wild_rift.png',
			lane: ['Middle'],
			title: 'Nine-Tailed Fox',
			counters: {
				weakAgainst: [
					{
						championName: 'Twisted Fate',
						id: '85f2909d-e3c1-425b-8398-5c8b9c145633',
					},
					{
						championName: 'Fizz',
						id: '96a64b1c-5a70-4b6c-a8ba-cf82d474a928',
					},
					{
						championName: 'Yasuo',
						id: 'e9759479-e2b8-45d4-84ce-6711c7371591',
					},
				],
				strongAgainst: [
					{
						championName: 'Akali',
						id: '5a05e0d6-9c06-44af-9df9-a1fad5a2e427',
					},
					{
						championName: 'Twisted Fate',
						id: '85f2909d-e3c1-425b-8398-5c8b9c145633',
					},
					{
						championName: 'Lux',
						id: 'fd23d139-1fb4-4dd7-860b-ef261bf13431',
					},
				],
			},
		}
	);
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
		}
	);
	const [rankSelected, setRankSelected] = useState<RankInterface>(
		// Defaults to Rank: 'Unranked' which is the first option
		{
			id: 'a4938a79-f11f-4ee1-9ec5-7741a12c4ef9',
			rankName: 'Unranked',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/3/38/Season_2019_-_Unranked.png/revision/latest/scale-to-width-down/130?cb=20190908074432',
		}
	);
	const [dialogItem, setDialogItem] = useState<ItemInterface>({
		id: '',
		category: '',
		description: [],
		itemName: '',
		reason: '',
		statistics: [],
		tier: '',
		type: '',
		url: '',
	});
	const [itemType, setItemType] = useState('primary');

	const classes = useStyles();

	useEffect(() => {
		const getChampions = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/champion/all'
			'/api/champion/all'
		);
		const getItems = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/item/all'
			'/api/item/all'
		);
		const getRanks = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/rank/all'
			'/api/rank/all'
		);
		const getRunes = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/rune/all'
			'/api/rune/all'
		);
		const getSpells = axios.get(
			// 'https://wildriftbuilds.herokuapp.com/api/spell/all'
			'/api/spell/all'
		);

		Promise.all([getChampions, getItems, getRanks, getRunes, getSpells]).then(
			(values) => {
				const [
					{ data: championsArray },
					{ data: itemsArray },
					{ data: ranksArray },
					{ data: runesArray },
					{ data: spellsArray },
				] = values;

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

				setRanks(ranksArray);

				// Sort Runes
				runesArray.sort(function (a: RuneInterface, b: RuneInterface) {
					if (a.runeName < b.runeName) {
						return -1;
					}
					if (a.runeName > b.runeName) {
						return 1;
					}
					return 0;
				});
				setRunes(runesArray);

				// Sort Spells
				spellsArray.sort(function (a: SpellInterface, b: SpellInterface) {
					if (a.spellName < b.spellName) {
						return -1;
					}
					if (a.spellName > b.spellName) {
						return 1;
					}
					return 0;
				});
				setSpells(spellsArray);
			}
		);
	}, []);

	// Check for duplicate items selected
	useEffect(() => {
		const primaryItems = itemsConfirmed.filter(
			(item) => item.type === 'primary'
		);
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
		} else if (primaryItems.length > 6) {
			errorPrimaryItemsLimit();
			setItemsConfirmed((prev) => {
				const itemsConfirmedCopy = [...prev];

				itemsConfirmedCopy.pop();

				return itemsConfirmedCopy;
			});
		}
	}, [itemsConfirmed]);

	const handleChampSelectChange = (e: any) => {
		const getChampion = champions.find(
			(champ: ChampionInterface) => champ.id === e.target.value
		);

		if (!getChampion) {
			return;
		} else {
			console.log(getChampion);
			setChampionSelected(getChampion);
		}
	};

	const handleRankSelectChange = (e: any) => {
		const getRank = ranks.find(
			(rank: RankInterface) => rank.id === e.target.value
		);

		if (!getRank) {
			return;
		} else {
			setRankSelected(getRank);
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

	const handleRuneChange = (e: any, runeType: string, runePath?: string) => {
		const getRune = runes.find(
			(rune: RuneInterface) => rune.id === e.target.value
		);

		if (!getRune) {
			return;
		} else {
			if (runeType === 'keystone') {
				setRuneKeystone(getRune);
			}
			if (runeType === 'secondary') {
				switch (runePath) {
					case 'domination':
						setRuneDomination(getRune);
						break;
					case 'resolve':
						setRuneResolve(getRune);
						break;
					case 'inspiration':
						setRuneInspiration(getRune);
						break;
				}
			}
		}
	};

	const handleAddItemClick = () => {
		// Pushes item to itemsConfirmed Array
		setItemsConfirmed([...itemsConfirmed, { ...itemSelected, type: itemType }]);
	};

	const handleClickOpen = (e: any, item: ItemInterface) => {
		setDialogItem(item);
		setOpenItemDialog(true);
	};

	const openedDialogItem = itemsConfirmed.filter(
		(item) => item.id === dialogItem.id
	)[0];
	// Handle Dialog Close
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

	const handleSpellChange = (e: any, spellNumber: string) => {
		const { value } = e.target;

		const getSpell = spells.find((spell: SpellInterface) => spell.id === value);

		if (!getSpell) {
			return;
		} else {
			switch (spellNumber) {
				case 'spellOne':
					setSpellOne(getSpell);

					break;
				case 'spellTwo':
					setSpellTwo(getSpell);
					break;
				default:
					return;
			}
		}
	};

	const submitBuild = async () => {
		if (itemsConfirmed.length !== 0 && username) {
			setOpenBackdrop(!openBackdrop);
			const buildObject = {
				dateSubmitted: new Date(),
				username: username,
				champion: championSelected,
				items: itemsConfirmed,
				rank: rankSelected,
				runes: {
					keystone: runeKeystone,
					domination: runeDomination,
					resolve: runeResolve,
					inspiration: runeInspiration,
				},
				spells: [{ ...spellOne }, { ...spellTwo }],
			};

			const saveToDatabase = await axios
				.post(
					// 'https://wildriftbuilds.herokuapp.com/api/build/save',
					'/api/build/save',
					buildObject
				)
				.then((res) => {
					successBuildSaved();
					setBuild(res.data);
					setHasSubmittedBuild(true);
				})
				.catch((err) => {
					if (
						err.response.status === 429 &&
						err.response.data ===
							"You're creating too many builds. Please try again after 30 minutes."
					) {
						errorBuildSaved(err.response.data);
					} else {
						errorBuildSaved('Something went wrong. Failed to save build.');
					}
				});
		} else {
			if (itemsConfirmed.length === 0) {
				errorNoItemSelected();
			} else if (!username) {
				errorNoUsername();
			}
			return;
		}
	};

	let dialogValue = openedDialogItem
		? openedDialogItem.reason
			? openedDialogItem.reason
			: ''
		: '';

	if (hasSubmittedBuild) {
		if (build) {
			return <Redirect to={`/build/${build.id}`} />;
		}
	}

	// =============================

	const handleTabValueChange = (
		event: React.ChangeEvent<{}>,
		newValue: number
	) => {
		setTabValue(newValue);
	};

	interface TabPanelProps {
		children?: React.ReactNode;
		index: any;
		value: any;
	}

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<Grid
				style={{ padding: '0 20px' }}
				container
				role='tabpanel'
				hidden={value !== index}
				id={`scrollable-auto-tabpanel-${index}`}
				aria-labelledby={`scrollable-auto-tab-${index}`}
				{...other}
			>
				{value === index && <>{children}</>}
			</Grid>
		);
	}

	function a11yProps(index: any) {
		return {
			id: `scrollable-auto-tab-${index}`,
			'aria-controls': `scrollable-auto-tabpanel-${index}`,
		};
	}
	// =============================

	return (
		<>
			<Backdrop className={classes.backdrop} open={openBackdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Toaster />
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

			<div className={classes.root}>
				<Grid container>
					<Grid item xs={12}>
						<Box style={{ padding: '20px 0', marginTop: '20px' }}>
							<Typography variant='h6' gutterBottom>
								Create your build
							</Typography>
							<Typography
								variant='body2'
								style={{ color: '#666666' }}
								gutterBottom
							>
								Please note that you can only create up to 5 builds every 30
								minutes.
							</Typography>
						</Box>
					</Grid>

					<AppBar
						position='static'
						style={{
							margin: '20px 0',
							color: 'inherit',
							boxShadow: 'none',
							borderStyle: 'none',
							backgroundColor: '#f7f7f7',
						}}
					>
						<Tabs
							value={tabValue}
							onChange={handleTabValueChange}
							indicatorColor='primary'
							variant='scrollable'
							scrollButtons='auto'
							aria-label='scrollable auto tabs example'
							// style={{ color: '#ffffff' }}
						>
							<Tab label='Champion' {...a11yProps(0)} />
							<Tab label='Items' {...a11yProps(1)} />
							<Tab label='Runes' {...a11yProps(2)} />
							<Tab label='Spells' {...a11yProps(3)} />
							<Tab label='Player Details' {...a11yProps(4)} />
						</Tabs>
					</AppBar>

					{/* Select Champion */}
					<TabPanel value={tabValue} index={0}>
						<Grid item xs={12} style={{ marginTop: '30px' }}>
							<Typography
								style={{ fontSize: '18px', fontWeight: 'bold' }}
								gutterBottom
							>
								Select a Champion
							</Typography>
							<Typography variant='body1'>
								Get started by selecting a champion your build is for.
							</Typography>
							<Divider style={{ margin: '15px 0 10px 0' }} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<Box style={{ marginTop: '16px' }}>
								{/* Display Champion Image */}
								{championSelected ? (
									<LazyLoadImage
										src={`/images/wildriftchampions/${championSelected.id}.png`}
										style={{ width: '100px', marginRight: '10px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftchampions/48ca031a-d92e-44e6-b7b6-f3eb1dbe644c.png`}
										style={{ width: '100px', marginRight: '10px' }}
									/>
								)}

								{
									<FormControl className={classes.formControl}>
										<InputLabel shrink htmlFor='champion-select'>
											Champion
										</InputLabel>
										<NativeSelect
											value={championSelected.id}
											onChange={handleChampSelectChange}
											inputProps={{
												name: 'champion',
												id: 'champion-select',
											}}
										>
											{champions.map(
												(
													{ id, championName, url }: ChampionInterface,
													index
												) => {
													return (
														<option key={index} value={id}>
															{championName}
														</option>
													);
												}
											)}
										</NativeSelect>
										<FormHelperText>Select a champion</FormHelperText>
									</FormControl>
								}
							</Box>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Box style={{ marginTop: '10px' }}>
								<Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
									{championSelected.championName}
								</Typography>
								<Typography gutterBottom>
									is <span style={{ color: '#cc1f1f' }}>weak against</span>
								</Typography>
								{championSelected.counters.weakAgainst.map((champion) => {
									const { id: weakAgainstChampionId, championName } = champion;

									return (
										<Box style={{ display: 'inline-block' }}>
											<a href={`/builds/${weakAgainstChampionId}`}>
												<LazyLoadImage
													src={`/images/wildriftchampions/${weakAgainstChampionId}.png`}
													alt={championName}
													title={championName}
													width='60'
													style={{ marginRight: '6px' }}
												/>
											</a>
										</Box>
									);
								})}
								<Typography gutterBottom>
									but <span style={{ color: '#3b9c3f' }}>strong against</span>
								</Typography>
								{championSelected.counters.strongAgainst.map((champion) => {
									const {
										id: strongAgainstChampionId,
										championName,
									} = champion;
									console.log(champion);

									return (
										<Box style={{ display: 'inline-block' }}>
											<a href={`/builds/${strongAgainstChampionId}`}>
												<LazyLoadImage
													src={`/images/wildriftchampions/${strongAgainstChampionId}.png`}
													alt={championName}
													title={championName}
													width='60'
													style={{ marginRight: '6px' }}
												/>
											</a>
										</Box>
									);
								})}
							</Box>
						</Grid>
					</TabPanel>

					{/* Select Item */}
					<TabPanel value={tabValue} index={1}>
						<Grid item xs={12} style={{ marginTop: '30px' }}>
							<Typography
								style={{ fontSize: '18px', fontWeight: 'bold' }}
								gutterBottom
							>
								Select Items
							</Typography>
							<Typography variant='body1'>
								Please note that you can only select up to 6 primary items.
							</Typography>
							<Divider style={{ margin: '15px 0 10px 0' }} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<Box style={{ marginTop: '16px' }}>
								{itemSelected ? (
									<LazyLoadImage
										src={`/images/wildriftitems/${itemSelected.id}.png`}
										style={{ width: '100px', marginRight: '10px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftitems/a42bcabd-290c-47f2-ae68-258d412c6d8d.png`}
										style={{ width: '100px', marginRight: '10px' }}
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
									<Typography>Item Type</Typography>
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
											style={{ margin: '0', display: 'block' }}
										/>
										<FormControlLabel
											value='optional'
											control={<Radio color='primary' />}
											label='Optional'
											labelPlacement='end'
											style={{ margin: '0', display: 'block' }}
										/>
									</RadioGroup>
								</Box>

								<Button
									variant='contained'
									color='primary'
									onClick={handleAddItemClick}
								>
									Add Item
								</Button>
							</Box>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Box style={{ marginTop: '10px' }}>
								<Typography
									style={{ fontSize: '18px', fontWeight: 'bold' }}
									gutterBottom
								>
									<span style={{ color: '#517ebd' }}>
										{itemSelected.itemName}
									</span>{' '}
									Statistics
								</Typography>

								<Box
									style={{
										width: '40px',
										height: '5px',
										margin: '10px 0 20px 0',
										backgroundColor: '#517ebd',
									}}
								>
									&nbsp;
								</Box>

								<Box>
									{itemSelected.statistics.map((stat) => {
										return (
											<Typography style={{ color: '#3b9c3f' }} gutterBottom>
												{stat}
											</Typography>
										);
									})}
								</Box>
							</Box>
						</Grid>
					</TabPanel>

					{/* Select Runes */}
					<TabPanel value={tabValue} index={2}>
						<Grid item xs={12} style={{ marginTop: '30px' }}>
							<Typography
								style={{ fontSize: '18px', fontWeight: 'bold' }}
								gutterBottom
							>
								Select Runes
							</Typography>
							<Typography variant='body1'>
								Select the runes that best fit each category.
							</Typography>
							<Divider style={{ margin: '15px 0 10px 0' }} />
						</Grid>
						<Grid container item xs={12}>
							{/* KEYSTONE Rune */}
							<Grid item xs={12} sm={3} style={{ marginTop: '10px' }}>
								{runeKeystone ? (
									<LazyLoadImage
										src={`/images/wildriftrunes/${runeKeystone.id}.png`}
										style={{ width: '95px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftrunes/feadf691-c740-4e7d-a4e8-9c705a48ea6a.png`}
										style={{ width: '95px' }}
									/>
								)}

								{
									<FormControl className={classes.formControl}>
										<InputLabel shrink htmlFor='rune-select'>
											Keystone
										</InputLabel>
										<NativeSelect
											onChange={(e) => handleRuneChange(e, 'keystone')}
											inputProps={{
												name: 'rune',
												id: 'rune-select',
											}}
										>
											{runes
												.filter((rune) => rune.type === 'keystone')
												.map(({ id, runeName, url }: RuneInterface, index) => {
													return <option value={id}>{runeName}</option>;
												})}
										</NativeSelect>
										<FormHelperText>Select a Keystone Rune</FormHelperText>
									</FormControl>
								}
							</Grid>

							{/* Secondary: Domination */}
							<Grid item xs={12} sm={3} style={{ marginTop: '10px' }}>
								{runeDomination ? (
									<LazyLoadImage
										src={`/images/wildriftrunes/${runeDomination.id}.png`}
										style={{ width: '95px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftrunes/7a61f821-168c-4817-bbdd-daf3ce5439dc.png`}
										style={{ width: '95px' }}
									/>
								)}

								{
									<FormControl className={classes.formControl}>
										<InputLabel shrink htmlFor='rune-select'>
											Domination (Slot 1)
										</InputLabel>
										<NativeSelect
											onChange={(e) =>
												handleRuneChange(e, 'secondary', 'domination')
											}
											inputProps={{
												name: 'rune',
												id: 'rune-select',
											}}
										>
											{runes
												.filter(
													(rune) =>
														rune.type === 'secondary' &&
														rune.path === 'domination'
												)
												.map(({ id, runeName, url }: RuneInterface, index) => {
													return <option value={id}>{runeName}</option>;
												})}
										</NativeSelect>
										<FormHelperText>Select a Domination Rune</FormHelperText>
									</FormControl>
								}
							</Grid>

							{/* Secondary: Resolve */}
							<Grid item xs={12} sm={3} style={{ marginTop: '10px' }}>
								{runeResolve ? (
									<LazyLoadImage
										src={`/images/wildriftrunes/${runeResolve.id}.png`}
										style={{ width: '95px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftrunes/fc2532cb-e6d9-4577-a567-4f10fff13e0a.png`}
										style={{ width: '95px' }}
									/>
								)}

								{
									<FormControl className={classes.formControl}>
										<InputLabel shrink htmlFor='rune-select'>
											Resolve (Slot 2)
										</InputLabel>
										<NativeSelect
											onChange={(e) =>
												handleRuneChange(e, 'secondary', 'resolve')
											}
											inputProps={{
												name: 'rune',
												id: 'rune-select',
											}}
										>
											{runes
												.filter(
													(rune) =>
														rune.type === 'secondary' && rune.path === 'resolve'
												)
												.map(({ id, runeName, url }: RuneInterface, index) => {
													return <option value={id}>{runeName}</option>;
												})}
										</NativeSelect>
										<FormHelperText>Select a Resolve Rune</FormHelperText>
									</FormControl>
								}
							</Grid>

							{/* Secondary: Inspiration */}
							<Grid item xs={12} sm={3} style={{ marginTop: '10px' }}>
								{runeResolve ? (
									<LazyLoadImage
										src={`/images/wildriftrunes/${runeInspiration.id}.png`}
										style={{ width: '95px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftrunes/80216900-b198-4195-ab1c-e6e309c28ff3.png`}
										style={{ width: '95px' }}
									/>
								)}

								{
									<FormControl className={classes.formControl}>
										<InputLabel shrink htmlFor='rune-select'>
											Inspiration (Slot 3)
										</InputLabel>
										<NativeSelect
											onChange={(e) =>
												handleRuneChange(e, 'secondary', 'inspiration')
											}
											inputProps={{
												name: 'rune',
												id: 'rune-select',
											}}
										>
											{runes
												.filter(
													(rune) =>
														rune.type === 'secondary' &&
														rune.path === 'inspiration'
												)
												.map(({ id, runeName, url }: RuneInterface, index) => {
													return <option value={id}>{runeName}</option>;
												})}
										</NativeSelect>
										<FormHelperText>Select a Inspiration Rune</FormHelperText>
									</FormControl>
								}
							</Grid>
						</Grid>
					</TabPanel>

					{/* Select Spells */}
					<TabPanel value={tabValue} index={3}>
						<Grid item xs={12} style={{ marginTop: '30px' }}>
							<Typography
								style={{ fontSize: '18px', fontWeight: 'bold' }}
								gutterBottom
							>
								Select Summoner Spells
							</Typography>
							<Typography variant='body1'>
								Select the summoner spells that best fit this build.
							</Typography>
							<Divider style={{ margin: '15px 0 10px 0' }} />
						</Grid>
						<Grid container item xs={12}>
							{/* Spell One */}
							<Grid item xs={12} sm={3} style={{ marginTop: '10px' }}>
								{spells ? (
									<LazyLoadImage
										src={`/images/wildriftspells/${spellOne.id}.jpg`}
										style={{ width: '90px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftspells/edbd4a33-514a-4334-8e61-01c296b8a767.jpg`}
										style={{ width: '90px' }}
									/>
								)}

								{
									<FormControl className={classes.formControl}>
										<InputLabel shrink htmlFor='spell-select'>
											Spell One
										</InputLabel>
										<NativeSelect
											onChange={(e) => handleSpellChange(e, 'spellOne')}
											inputProps={{
												name: 'spell',
												id: 'spell-select',
											}}
										>
											{spells.map(
												({ id, spellName, url }: SpellInterface, index) => {
													return <option value={id}>{spellName}</option>;
												}
											)}
										</NativeSelect>
										<FormHelperText>Select a Spell</FormHelperText>
									</FormControl>
								}
							</Grid>
							{/* Spell Two */}
							<Grid item xs={12} sm={3} style={{ marginTop: '10px' }}>
								{spells ? (
									<LazyLoadImage
										src={`/images/wildriftspells/${spellTwo.id}.jpg`}
										style={{ width: '90px' }}
									/>
								) : (
									<LazyLoadImage
										src={`/images/wildriftspells/edbd4a33-514a-4334-8e61-01c296b8a767.jpg`}
										style={{ width: '90px' }}
									/>
								)}

								{
									<FormControl className={classes.formControl}>
										<InputLabel shrink htmlFor='spell-select'>
											Spell Two
										</InputLabel>
										<NativeSelect
											onChange={(e) => handleSpellChange(e, 'spellTwo')}
											inputProps={{
												name: 'spell',
												id: 'spell-select',
											}}
										>
											{spells.map(
												({ id, spellName, url }: SpellInterface, index) => {
													return <option value={id}>{spellName}</option>;
												}
											)}
										</NativeSelect>
										<FormHelperText>Select a Spell</FormHelperText>
									</FormControl>
								}
							</Grid>
						</Grid>
					</TabPanel>

					{/* Player Details */}
					<TabPanel value={tabValue} index={4}>
						<Grid item xs={12} style={{ marginTop: '30px' }}>
							<Typography
								style={{ fontSize: '18px', fontWeight: 'bold' }}
								gutterBottom
							>
								Player Details
							</Typography>
							<Typography variant='body1'>
								Fill in the necessary information to have the build credited as
								yours.
							</Typography>
							<Divider style={{ margin: '15px 0 10px 0' }} />
						</Grid>
						<Grid container item xs={12}>
							<Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
								<Box
									style={{
										padding: '10px 0',
									}}
								>
									<Typography gutterBottom style={{ fontWeight: 'bold' }}>
										Username
									</Typography>
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
							</Grid>
							<Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
								<Box
									style={{
										padding: '10px 0',
									}}
								>
									<div>
										<Typography gutterBottom style={{ fontWeight: 'bold' }}>
											Rank
										</Typography>
										{/* Display Champion Image */}
										{rankSelected ? (
											<LazyLoadImage
												src={`/images/wildriftranks/${rankSelected.id}.png`}
												style={{ width: '100px' }}
											/>
										) : (
											<LazyLoadImage
												src={`/images/wildriftranks/a4938a79-f11f-4ee1-9ec5-7741a12c4ef9.png`}
											/>
										)}

										{
											<FormControl className={classes.formControl}>
												<InputLabel shrink htmlFor='rank-select'>
													Rank
												</InputLabel>
												<NativeSelect
													onChange={handleRankSelectChange}
													inputProps={{
														name: 'rank',
														id: 'rank-select',
													}}
												>
													{ranks.map(
														({ id, rankName, url }: RankInterface, index) => {
															return <option value={id}>{rankName}</option>;
														}
													)}
												</NativeSelect>
												<FormHelperText>Select your rank</FormHelperText>
											</FormControl>
										}
									</div>
								</Box>
							</Grid>
						</Grid>
					</TabPanel>

					{/* Items List */}
					<Grid item xs={12}>
						<Box style={{ margin: '60px 0' }}>
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
																		<LazyLoadImage
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
						</Box>
					</Grid>

					{/* Build Box */}
					<Box style={{ marginBottom: '40px' }}>
						<Button variant='contained' color='primary' onClick={submitBuild}>
							Submit Build
						</Button>
					</Box>
				</Grid>
			</div>
		</>
	);
}
