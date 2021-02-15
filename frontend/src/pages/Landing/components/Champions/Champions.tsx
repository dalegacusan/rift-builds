import React, { FunctionComponent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// Components
// Types
import { ChampionInterface } from '../../../../utils/interfaces';
// CSS
import styles from './champions.module.css';

type ChampionsProps = {
	filteredChampions: Array<ChampionInterface>;
};

const Champions: FunctionComponent<ChampionsProps> = (props) => {
	const { filteredChampions } = props;

	return (
		<Box display='flex' flexWrap='wrap' className={styles.championsContainer}>
			{filteredChampions.map((champion: ChampionInterface, index) => {
				const { id: championId, championName } = champion;

				return (
					<Box key={index} className={styles.championImageContainer}>
						<a href={`/builds/${championId}`} className={styles.championLink}>
							<LazyLoadImage
								src={`/images/wildriftchampions/${championId}.png`}
								className={styles.championImage}
								title={championName}
								alt={championName}
							/>
							<p className={styles.championName}>{championName}</p>
						</a>
					</Box>
				);
			})}
		</Box>
	);
};

export default Champions;
