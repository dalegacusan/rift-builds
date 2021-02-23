import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// Components
// Types
import { RankInterface, RootState } from '../../../../../utils/interfaces';
// CSS
import styles from './playerinformation.module.css';

const PlayerInformation = (props: PlayerInformationProps) => {
	const { formControl } = props;
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
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>7. Username</p>
					<input
						type='text'
						value={username}
						placeholder='Username'
						onChange={(e) => handleUsernameChange(e)}
						style={{ width: '100%' }}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>8. Rank</p>

					<Box>
						<LazyLoadImage
							src={`/images/wildriftranks/${rankSelected.id}.png`}
							style={{ width: '100px' }}
						/>

						{
							<FormControl className={formControl}>
								<InputLabel shrink htmlFor='rank-select'>
									Rank
								</InputLabel>
								<NativeSelect
									value={rankSelected.id}
									onChange={handleRankSelectChange}
									inputProps={{
										name: 'rank',
										id: 'rank-select',
									}}
								>
									{ranks.map(({ id, rankName, url }: RankInterface, index) => {
										return (
											<option key={index} value={id}>
												{rankName}
											</option>
										);
									})}
								</NativeSelect>
								<FormHelperText>Select your rank</FormHelperText>
							</FormControl>
						}
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

type PlayerInformationProps = PropsFromRedux & {
	formControl: string;
};

export default connector(PlayerInformation);
