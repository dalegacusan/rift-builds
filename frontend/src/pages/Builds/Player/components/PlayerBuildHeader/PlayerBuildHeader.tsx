import React from 'react';
import moment from 'moment';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GamePatch } from '../../../../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import BuildChip from './components/BuildChip/BuildChip';
// CSS
import styles from './playerbuildheader.module.css';
// Types
import { BuildInterface } from '../../../../../shared/constants/interfaces';
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
		patchVersion,
		rank,
		spells,
		username,
	} = build;
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
						className={styles.buildChampionContainer}
						display='flex'
						justifyContent='center'
					>
						<LazyLoadImage
							src={`/images/wildriftroles/${roleToDisplay}.png`}
							className={styles.buildRoleImage}
							title={buildRole}
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
					<span className={styles.buildTitleText}>{buildTitle}&nbsp;</span>
					<Box>
						<Box>
							<span className={styles.usernameText}>Build by {username}</span>
						</Box>
						<Box display='flex' className={styles.buildChipsContainer}>
							<BuildChip property='Lane' value={buildRole.roleName} />
							<BuildChip property='Rank' value={rank.rankName} />
						</Box>
					</Box>
				</Box>
			</Grid>

			<Box p={2} flexDirection='row-reverse'>
				<p className={styles.patchText}>Patch {GamePatch.VERSION}</p>
				<span className={styles.buildDateSubmitted}>
					{moment(dateSubmitted).format('MM/DD/YYYY')}
				</span>
			</Box>
		</Grid>
	);
};

export default PlayerBuildHeader;
