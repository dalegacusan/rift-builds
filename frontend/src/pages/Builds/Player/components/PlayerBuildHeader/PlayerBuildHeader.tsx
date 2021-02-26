import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// CSS
import styles from './playerbuildheader.module.css';
// Types
import { BuildInterface } from '../../../../../utils/interfaces';
type PlayerBuildHeaderProps = {
	build: BuildInterface;
};

const PlayerBuildHeader = (props: PlayerBuildHeaderProps) => {
	const { build } = props;
	const { buildTitle, buildRole, champion, rank, spells, username } = build;

	let roleToDisplay;

	switch (buildRole) {
		case 'Jungle':
			roleToDisplay = 'e4cbdb64-7118-436b-b0c6-89388731aeb5';
			break;
		case 'Support':
			roleToDisplay = '35b924df-6d60-4cc5-82a8-4e5dc85272a0';
			break;
		case 'Top':
			roleToDisplay = '53f90d2a-d970-41ec-8d5c-f8775580ad7e';
			break;
		case 'Middle':
			roleToDisplay = '6b7ca1d8-872a-4c54-b685-720e14251941';
			break;
		case 'Bottom':
			roleToDisplay = 'e3f90603-6452-4c33-afe6-466a69b6095b';
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
					<Box
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
					</Box>
				</Box>
			</Grid>
			{/* Champion Name, Build Title, and Username */}
			<Grid item xs>
				<Box className={styles.buildInformationContainer}>
					<span className={styles.championNameText}>
						{champion.championName}
					</span>
					<Box>
						<p className={styles.buildTitleText}>{buildTitle}</p>
						<span>by</span>{' '}
						<span className={styles.usernameText}>{username}</span>
						{/* <LazyLoadImage
							src={`/images/wildriftranks/${build.rank.id}.png`}
							style={{
								width: '30px',
								marginLeft: '10px',
								position: 'absolute',
							}}
							title={rank.rankName}
						/> */}
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default PlayerBuildHeader;
