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
	champions: Array<ChampionInterface>;
};

const Champions: FunctionComponent<ChampionsProps> = ({ champions }) => {
	return (
		<Box display='flex' flexWrap='wrap' className={styles.heroesContainer}>
			{champions.map((champion: ChampionInterface) => {
				const { id: championId, championName } = champion;

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
						<Typography className={styles.championName}>
							{championName}
						</Typography>
					</Box>
				);
			})}
		</Box>
	);
};

export default Champions;
