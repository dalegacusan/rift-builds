import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import BuildBox from './components/BuildBox/BuildBox';
import NoBuilds from './components/NoBuilds/NoBuilds';
// CSS
import styles from './buildslist.module.css';
// Types
import {
	BuildInterface,
	ChampionInterface,
} from '../../../../../shared/interfaces/interfaces';
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
