import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// CSS
import styles from './playerbuildheader.module.css';
// Types
import { BuildInterface } from '../../../../../shared/constants/interfaces';
type PlayerBuildHeaderProps = {
	build: BuildInterface;
};

const PlayerBuildHeader = (props: PlayerBuildHeaderProps) => {
	const { build } = props;
	const { buildTitle, buildRole, champion, rank, spells, username } = build;
	const { id: roleId, roleName } = buildRole;

	let roleToDisplay;

	switch (roleName) {
		case 'Jungle':
			roleToDisplay = roleId;
			break;
		case 'Support':
			roleToDisplay = roleId;
			break;
		case 'Top':
			roleToDisplay = roleId;
			break;
		case 'Middle':
			roleToDisplay = roleId;
			break;
		case 'Bottom':
			roleToDisplay = roleId;
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
						className={styles.buildRoleContainer}
						display='flex'
						justifyContent='center'
					> 
						<LazyLoadImage
							src={`/images/wildriftroles/${roleToDisplay}.png`}
							className={styles.buildRoleImage}
							title={buildRole}
						/> 
						<span className={styles.buildRoleText}>{buildRole}</span>
					</Box> */}
				</Box>
			</Grid>

			{/* Champion Name, Build Title, and Username */}
			<Grid item xs>
				<Box className={styles.buildInformationContainer}>
					<span className={styles.buildTitleText}>{buildTitle}</span>
					<Box>
						<p className={styles.buildByText}>
							{champion.championName} build by&nbsp;
							<span className={styles.usernameText}>{username}</span>
						</p>

						<span className={styles.buildInformationText}>
							<span className={styles.buildInformationTitle}>Lane:&nbsp;</span>
							{buildRole.roleName}
							&nbsp;|&nbsp;
							<span className={styles.buildInformationTitle}>Rank:&nbsp;</span>
							{rank.rankName}
						</span>
						<LazyLoadImage
							src={`/images/wildriftranks/${build.rank.id}.png`}
							className={styles.laneImage}
							title={rank.rankName}
						/>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
export default PlayerBuildHeader;
