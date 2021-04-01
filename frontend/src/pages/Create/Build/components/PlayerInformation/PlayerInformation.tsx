import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Validation } from '../../../../../shared/constants/validation';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
// Types
import {
	RankInterface,
	RootState,
} from '../../../../../shared/constants/interfaces';
// CSS
import globalstyles from '../../createbuild.module.css';
import styles from './playerinformation.module.css';

const PlayerInformation = (props: PlayerInformationProps) => {
	// Game Data PROPS
	const { ranks } = props;
	// Build PROPS
	const { rankSelected, setRankSelected, username, setUsername } = props;

	// =============== Username =============== //
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setUsername(value);
	};

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
		<Grid container spacing={3} style={{ color: '#EBEBEB' }}>
			<Grid item xs={12} sm={6}>
				<Box>
					<p className={globalstyles.inputLabel}>
						7. Username <span className={globalstyles.requiredInput}>*</span>
					</p>
					<p className={globalstyles.inputDescription}>
						What is your in-game name (IGN)?
					</p>
					<input
						type='text'
						value={username}
						placeholder='Username'
						onChange={(e) => handleUsernameChange(e)}
						className={globalstyles.buildInput}
						maxLength={Validation.USERNAME.MAX_LENGTH}
					/>
					<p
						className={globalstyles.inputDescription}
						style={{ fontStyle: 'italic' }}
					>
						Please include your ID (i.e. ABC#DEFGH)
					</p>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box>
					<p className={globalstyles.inputLabel}>8. Rank</p>
					<p className={globalstyles.inputDescription}>
						What is your current rank?
					</p>

					<Box>
						<LazyLoadImage
							src={`/images/wildriftranks/${rankSelected.id}.png`}
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
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		rankSelected: state.build.rank,
		ranks: state.gameData.ranks,
		username: state.build.username,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setRankSelected: (newRank: RankInterface) =>
			dispatch({ type: actionTypes.BUILD_SET_RANKSELECTED, data: newRank }),
		setUsername: (newUsername: string) =>
			dispatch({ type: actionTypes.BUILD_SET_USERNAME, data: newUsername }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PlayerInformationProps = PropsFromRedux;

export default connector(PlayerInformation);
