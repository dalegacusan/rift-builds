import React, { useState } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// Components
// CSS
import styles from './championselect.module.css';
// Types
import {
	ChampionInterface,
	RootState,
} from '../../../../../../../utils/interfaces';

const ChampionSelect = (props: ChampionSelectProps) => {
	const { formControl } = props;
	// Game Data PROPS
	const { champions } = props;
	// Build PROPS
	const { championSelected, setChampionSelected } = props;

	const handleChampSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value: championId } = e.target;

		const getChampion = champions.find(
			(champ: ChampionInterface) => champ.id === championId
		);

		if (getChampion) {
			setChampionSelected(getChampion);
		}
	};

	return (
		<Box>
			<p>3. Champion</p>

			<Box className={styles.championSelectContainer}>
				{/* Display Champion Image */}
				<LazyLoadImage
					src={`/images/wildriftchampions/${championSelected.id}.png`}
					className={styles.championImage}
				/>

				{
					<FormControl className={formControl}>
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
								({ id, championName }: ChampionInterface, index) => {
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
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		championSelected: state.build.champion,
		champions: state.gameData.champions,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setChampionSelected: (champion: ChampionInterface) =>
			dispatch({
				type: actionTypes.BUILD_SET_CHAMPIONSELECTED,
				data: champion,
			}),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ChampionSelectProps = PropsFromRedux & {
	formControl: string;
};

export default connector(ChampionSelect);
