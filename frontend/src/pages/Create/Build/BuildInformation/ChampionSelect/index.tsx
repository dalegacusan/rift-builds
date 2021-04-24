import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../shared/store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// CSS
import globalstyles from '../../Styles.module.css';
import styles from './Styles.module.css';
// Types
import { ChampionInterface } from '../../../../../shared/interfaces/GameData';
import { RootState } from '../../../../../shared/interfaces/GlobalStore';

const ChampionSelect = (props: ChampionSelectProps) => {
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
			<p className={globalstyles.inputLabel}>5. Champion</p>
			<p className={globalstyles.inputDescription}>Select a champion</p>

			<Box className={styles.championSelectContainer}>
				{/* Display Champion Image */}
				<LazyLoadImage
					src={`/images/wildriftchampions/${championSelected.id}.jpg`}
					className={styles.championImage}
				/>

				<select
					onChange={handleChampSelectChange}
					className={globalstyles.buildSelectInput}
					value={championSelected.id}
				>
					{champions.map((champion: ChampionInterface, index: number) => {
						const { id: championId, championName } = champion;

						return (
							<option
								key={index}
								value={championId}
								className={globalstyles.buildSelectOption}
							>
								{championName}
							</option>
						);
					})}
				</select>
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

type ChampionSelectProps = PropsFromRedux & {};

export default connector(ChampionSelect);
