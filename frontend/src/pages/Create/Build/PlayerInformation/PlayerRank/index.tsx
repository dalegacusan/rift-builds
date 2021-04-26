import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ImagePath } from '../../../../../shared/utils/imagePath';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../shared/store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// Types
import { RankInterface } from '../../../../../shared/interfaces/GameData';
import { RootState } from '../../../../../shared/interfaces/GlobalStore';
// CSS
import globalstyles from '../../Styles.module.css';
import styles from './Styles.module.css';

const PlayerRank = (props: PlayerRankProps) => {
	// Game Data PROPS
	const { ranks } = props;
	// Build PROPS
	const { rankSelected, setRankSelected } = props;

	// =============== Rank =============== //
	const handleRankSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const getRank = ranks.find(
			(rank: RankInterface) => rank.id === e.target.value
		);

		if (!getRank) {
			return;
		} else {
			setRankSelected(getRank);
		}
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>10. Rank</p>
			<p className={globalstyles.inputDescription}>
				What is your current rank?
			</p>

			<Box>
				<LazyLoadImage
					src={ImagePath.Rank(rankSelected.id)}
					className={styles.rankImage}
				/>

				<select
					value={rankSelected.id}
					onChange={handleRankSelectChange}
					className={globalstyles.buildSelectInput}
				>
					{ranks.map((rank: RankInterface, index) => {
						const { id: rankId, rankName } = rank;

						return (
							<option
								key={index}
								value={rankId}
								className={globalstyles.buildSelectOption}
							>
								{rankName}
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
		rankSelected: state.build.rank,
		ranks: state.gameData.ranks,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setRankSelected: (newRank: RankInterface) =>
			dispatch({ type: actionTypes.BUILD_SET_RANKSELECTED, data: newRank }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PlayerRankProps = PropsFromRedux;

export default connector(PlayerRank);
