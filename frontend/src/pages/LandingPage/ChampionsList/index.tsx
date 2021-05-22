import React, { FunctionComponent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

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

type ChampionListProps = {
	filteredChampions: Array<ChampionInterface>;
};

const ChampionList: FunctionComponent<ChampionListProps> = (props) => {
	const { filteredChampions } = props;

	return (
		<Box display='flex' flexWrap='wrap' className={styles.championsContainer}>
			{filteredChampions.map((champion: ChampionInterface) => {
				const { id: championId, championName } = champion;

				return (
					<Box key={championId} className={styles.championImageContainer}>
						<Link
							to={`/builds/champion/${championNameToUrlString(championName)}`}
							className={styles.championLink}
						>
							<LazyLoadImage
								src={ImagePath.Champion(championId)}
								className={styles.championImage}
								title={championName}
								alt={championName}
							/>
							<p className={styles.championName}>{championName}</p>
						</Link>
					</Box>
				);
			})}
		</Box>
	);
};

export default ChampionList;
