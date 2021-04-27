import React from 'react';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ImagePath } from '../../../shared/utils/imagePath';
import { GameMode } from '../../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import BuildChip from './BuildChip';
// CSS
import styles from './Styles.module.css';
// Types
import { BuildInterface } from '../../../shared/interfaces/Build';
type PlayerBuildHeaderProps = {
	build: BuildInterface;
};

const PlayerBuildHeader = (props: PlayerBuildHeaderProps) => {
	const { build } = props;
	const {
		buildTitle,
		buildRole,
		champion,
		dateSubmitted,
		gameMode,
		patchVersion,
		rank,
		region,
		username,
	} = build;
	const { id: roleId, roleName } = buildRole;

	let gameModeToDisplay;
	switch (gameMode) {
		case GameMode.NORMAL:
			gameModeToDisplay = 'Normal';
			break;
		case GameMode.ARAM:
			gameModeToDisplay = 'ARAM';
			break;
	}

	return (
		<Grid container spacing={2} className={styles.playerBuildHeaderContainer}>
			{/* Champion Image */}
			<Grid item>
				<Box className={styles.championImageContainer}>
					<LazyLoadImage
						src={ImagePath.Champion(champion.id)}
						className={styles.championImage}
						title={champion.championName}
					/>
					{/* <Box
						className={styles.buildChampionContainer}
						display='flex'
						justifyContent='center'
					>
						<LazyLoadImage
							src={`/images/wildriftroles/${roleId}.png`}
							className={styles.buildRoleImage}
							title={roleName}
						/>
						<span className={`${styles.buildChampionText} text-white-primary`}>
							{champion.championName}
						</span>
					</Box> */}
				</Box>
			</Grid>

			{/* Champion Name, Build Title, and Username */}
			<Grid item xs={12} sm>
				<Box
					className={`${styles.buildInformationContainer} text-white-primary playerBuildBuildInformationContainer`}
				>
					<p
						className={`${styles.buildTitleText} text-white-secondary text-bold`}
					>
						{buildTitle.toString()}&nbsp;
					</p>
					<Box>
						<Box>
							<p className={`${styles.usernameText} text-white-primary`}>
								Build by {username}
							</p>
						</Box>
						<Box className={styles.buildChipsContainer}>
							{/* Capitalize first letter of Game Mode */}
							<BuildChip property='Mode' value={gameModeToDisplay} />
							<BuildChip property='Lane' value={buildRole.roleName} />
							<BuildChip property='Rank' value={rank.rankName} />
							<BuildChip property='Region' value={region.toUpperCase()} />
						</Box>
					</Box>
				</Box>
			</Grid>

			<Grid item xs={12} sm className='playerBuildHeaderMiscDataGrid'>
				<Box
					className={`${styles.miscellaneousDataContainer} playerBuildHeaderMiscDataContainer`}
				>
					<p className={`${styles.patchText} buildPatchText`}>
						Patch {patchVersion}
					</p>
					<p
						className={`${styles.buildDateSubmitted} text-white-secondary buildDateSubmittedText`}
					>
						{moment(dateSubmitted).format('MM/DD/YYYY')}
					</p>
				</Box>
			</Grid>
		</Grid>
	);
};

export default PlayerBuildHeader;
