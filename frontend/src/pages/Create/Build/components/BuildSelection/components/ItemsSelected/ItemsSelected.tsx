import React, { useEffect } from 'react';

import { ItemType } from '../../../../../../../shared/constants/constants';
import { RequiredLength } from '../../../../../../../shared/constants/requiredLength';
import { Message } from '../../../../../../../shared/constants/validationMessages';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import { Theme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
// Components
import BuildItem from './components/BuildItem/BuildItem';
// Types
import { ItemInterface } from '../../../../../../../shared/interfaces/Build';
import { snackbarControlsInterface } from '../../../../../../../shared/interfaces/interfaces';
import { RootState } from '../../../../../../../shared/interfaces/GlobalStore';
// CSS
import styles from './itemsselected.module.css';
const useStylesBootstrap = makeStyles((theme: Theme) => ({
	tooltip: {
		letterSpacing: '0.1px',
		backgroundColor: '#171717',
		fontSize: '12px',
		padding: '12px',
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
			(item) => item.type === ItemType.PRIMARY
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
					message: Message.ERROR.ITEM_IS_ALREADY_IN_BUILD,
					shouldOpen: true,
					snackbarType: 'error',
				},
			});
		} else if (primaryItems.length > RequiredLength.ITEMS.PRIMARY.MAX_LENGTH) {
			setSnackbarControls({
				snackbarControls: {
					message: Message.ERROR.CAN_ONLY_HAVE_SIX_PRIMARY_ITEMS,
					shouldOpen: true,
					snackbarType: 'error',
				},
			});

			const itemsConfirmedCopy = [...itemsConfirmed];

			// Remove last item added to array
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
									title={
										<div className={styles.tooltipContainer}>
											<div>
												<p>
													Primary:&nbsp;
													<span className={styles.tooltipHighlight}>
														{RequiredLength.ITEMS.PRIMARY.MIN_LENGTH}
													</span>
													&nbsp;-&nbsp;
													<span className={styles.tooltipHighlight}>
														{RequiredLength.ITEMS.PRIMARY.MAX_LENGTH}
													</span>
													&nbsp;items
												</p>

												<p>
													Optional:&nbsp;
													<span className={styles.tooltipHighlight}>
														{RequiredLength.ITEMS.OPTIONAL.MIN_LENGTH}
													</span>
													&nbsp;-&nbsp;
													<span className={styles.tooltipHighlight}>
														{RequiredLength.ITEMS.OPTIONAL.MAX_LENGTH}
													</span>
													&nbsp;items
												</p>
											</div>
											<div>
												<p className={styles.tooltipWarning}>
													Click on an item to <i>delete</i> it from your list
												</p>
											</div>
										</div>
									}
									placement='top'
									classes={classes}
									arrow
								>
									<InfoIcon className={styles.infoIcon} />
								</Tooltip>
							</Box>
						</Box>

						{/* TYPE: PRIMARY */}
						<Grid item xs={12}>
							{itemsConfirmed
								.filter((item: ItemInterface) => item.type === ItemType.PRIMARY)
								.map((item: ItemInterface, index: number) => {
									return (
										<BuildItem
											key={index}
											item={item}
											handleDeleteItemClick={handleDeleteItemClick}
										/>
									);
								})}
						</Grid>

						{/* TYPE: OPTIONAL */}
						<p className={styles.itemsSelectedHeader}>Optional Items</p>
						<Grid item xs={12}>
							{itemsConfirmed
								.filter(
									(item: ItemInterface) => item.type === ItemType.OPTIONAL
								)
								.map((item: ItemInterface, index: number) => {
									return (
										<BuildItem
											key={index}
											item={item}
											handleDeleteItemClick={handleDeleteItemClick}
										/>
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
