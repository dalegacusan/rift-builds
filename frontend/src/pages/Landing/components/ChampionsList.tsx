import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// Types
// CSS
import styles from './championslist.module.css';

export default function ChampionsList(props: {
	championId: string;
	championName: string;
}) {
	const { championId, championName } = props;

	return (
		<Box className={styles.championImageContainer}>
			<a href={`/builds/${championId}`}>
				<LazyLoadImage
					src={`/images/wildriftchampions/${championId}.png`}
					className={styles.championImage}
					title={championName}
					alt={championName}
				/>
			</a>
			<p className={styles.championName}>{championName}</p>
		</Box>
	);
}
