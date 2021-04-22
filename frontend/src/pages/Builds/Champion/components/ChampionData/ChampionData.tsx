import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Components
import Counters from './components/Counters/Counters';
import Lanes from './components/Lanes/Lanes';
// CSS
import styles from './championdata.module.css';
// Types
import { ChampionInterface } from '../../../../../shared/interfaces/Build';
type ChampionDataProps = {
	championData: ChampionInterface;
	buildsCount: number;
};

const BuildCountHeader = (props: ChampionDataProps) => {
	const { championData, buildsCount } = props;
	const { id: championId, championName, title } = championData; // Strings
	const { counters, tier } = championData; // Object
	const { lane } = championData; // Arrays

	return (
		<Box
			style={{
				margin: '40px 0 0 0',
			}}
		>
			<Grid container spacing={2}>
				<Grid item>
					<Box className={styles.championImageContainer}>
						<LazyLoadImage
							src={`/images/wildriftchampions/${championId}.jpg`}
							alt={championName}
							title={championName}
							className={styles.championImage}
						/>
					</Box>

					<Box className={styles.buildsCountContainer}>
						<p style={{ textAlign: 'center', margin: 0 }}>
							{buildsCount} {buildsCount === 1 ? 'Build' : 'Builds'}
						</p>
					</Box>
				</Grid>
				<Grid item xs>
					<Box style={{ padding: '5px 0' }}>
						<Typography variant='body1'>
							<span className={styles.championNameText}>{championName}</span>
						</Typography>
						<Typography variant='body1'>
							<span className={styles.championTitle}>The {title}</span>
						</Typography>
					</Box>

					<Lanes lane={lane} tier={tier} />
				</Grid>
				<Grid item xs={12} sm={6} style={{ color: '#CFCFCF' }}>
					<Counters counters={counters} championName={championName} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default BuildCountHeader;
