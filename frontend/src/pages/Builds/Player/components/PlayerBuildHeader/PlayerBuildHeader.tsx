import React from 'react';
import moment from 'moment';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { GameMode } from '../../../../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import BuildChip from './components/BuildChip/BuildChip';
// CSS
import styles from './playerbuildheader.module.css';
// Types
import { BuildInterface } from '../../../../../shared/interfaces/interfaces';
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
		description,
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
		<Grid
			container
			wrap='nowrap'
			spacing={2}
			className={styles.playerBuildHeaderContainer}
		>
			{/* Champion Image */}
			<Grid item>
				<Box className={styles.championImageContainer}>
					<LazyLoadImage
						src={`/images/wildriftchampions/${champion.id}.jpg`}
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
						<span className={styles.buildChampionText}>
							{champion.championName}
						</span>
					</Box> */}
				</Box>
			</Grid>

			{/* Champion Name, Build Title, and Username */}
			<Grid item xs>
				<Box className={styles.buildInformationContainer}>
					<p className={styles.buildTitleText}>{buildTitle}&nbsp;</p>
					<Box>
						<Box>
							<p className={styles.usernameText}>Build by {username}</p>
						</Box>
						<Box display='flex' className={styles.buildChipsContainer}>
							{/* Capitalize first letter of Game Mode */}
							<BuildChip property='Mode' value={gameModeToDisplay} />
							<BuildChip property='Lane' value={buildRole.roleName} />
							<BuildChip property='Rank' value={rank.rankName} />
							<BuildChip property='Region' value={region.toUpperCase()} />
						</Box>
					</Box>
				</Box>
			</Grid>

			<Box
				p={2}
				flexDirection='row-reverse'
				className={styles.miscellaneousDataContainer}
			>
				<p className={styles.patchText}>Patch {patchVersion}</p>
				<span className={styles.buildDateSubmitted}>
					{moment(dateSubmitted).format('MM/DD/YYYY')}
				</span>
			</Box>
		</Grid>
	);
};

export default PlayerBuildHeader;
