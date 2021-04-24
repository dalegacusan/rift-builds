import React, { FunctionComponent } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// Types
import { ChampionInterface } from '../../../shared/interfaces/GameData';
// CSS
import styles from './Styles.module.css';

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
							href={`/builds/champion/${championName
								.toLocaleLowerCase()
								.split(' ')
								.filter((char) => char !== '.' && char !== "'")
								.join('')
								.replace('.', '')
								.replace("'", '')}`}
							className={styles.championLink}
						>
							<LazyLoadImage
								src={`/images/wildriftchampions/${championId}.jpg`}
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
