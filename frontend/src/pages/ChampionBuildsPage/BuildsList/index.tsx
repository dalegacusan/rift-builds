import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';

// Components
import BuildBox from './BuildBox';
import NoBuilds from './NoBuilds';

// CSS
import styles from './Styles.module.css';

// Types
import { ChampionInterface } from '../../../shared/interfaces/GameData';
import { BuildInterface } from '../../../shared/interfaces/Build';

type BuildsListProps = {
	builds: Array<BuildInterface>;
	championData: ChampionInterface;
};

const BuildsList = (props: BuildsListProps) => {
	const { builds, championData } = props;

	return (
		<Box className={styles.buildsListContainer}>
			{builds.length !== 0 ? (
				<>
					{builds.map((build, index) => {
						return <BuildBox key={index} build={build} />;
					})}
				</>
			) : (
				<NoBuilds championData={championData} />
			)}
		</Box>
	);
};

export default BuildsList;
