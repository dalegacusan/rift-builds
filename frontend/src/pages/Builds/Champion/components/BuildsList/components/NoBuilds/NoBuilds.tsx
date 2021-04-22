import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
// CSS
import styles from './nobuilds.module.css';
// Types
import { ChampionInterface } from '../../../../../../../shared/interfaces/Build';
type NoBuildsProps = {
	championData: ChampionInterface;
};

export default function NoBuilds(props: NoBuildsProps) {
	const { championData } = props;

	// Set session data to current champion a user will create a build for
	// This session data gets used in CreateBuild.tsx to automatically set the selected champion to the current champion a user will create a build for
	// This one is used if there are no builds for a champion and a user wants to create a build for that champion
	const handleCreateBuildClick = () => {
		sessionStorage.setItem(
			'championToCreateBuild',
			JSON.stringify(championData)
		);
	};

	return (
		<Box
			className={styles.noBuildsContainer}
			display='flex'
			justifyContent='center'
		>
			<Box>
				<img
					src='/images/empty.svg'
					className={styles.noBuildImage}
					alt='no builds'
					title='no builds'
				/>
				<Typography gutterBottom>
					There are no builds for this champion yet.&nbsp;
					<a
						href='/build/create'
						onClick={handleCreateBuildClick}
						className={styles.createBuildLink}
					>
						Create a build for {championData.championName}
					</a>
				</Typography>
			</Box>
		</Box>
	);
}
