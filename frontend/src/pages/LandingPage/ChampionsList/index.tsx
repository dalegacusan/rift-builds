import React, { FunctionComponent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Shared
import { ImagePath } from '../../../shared/utils/imagePath';
import { championNameToUrlString } from '../../../shared/utils/championNameToUrlString';

// MaterialUI
import Box from '@material-ui/core/Box';

// Components

// CSS
import styles from './Styles.module.css';

// Types
import { ChampionInterface } from '../../../shared/interfaces/GameData';

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
						<a
							href={`/builds/champion/${championNameToUrlString(championName)}`}
							className={styles.championLink}
						>
							<LazyLoadImage
								src={ImagePath.Champion(championId)}
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
