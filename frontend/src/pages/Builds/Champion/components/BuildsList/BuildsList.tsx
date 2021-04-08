import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import BuildBox from './components/BuildBox/BuildBox';
import NoBuilds from './components/NoBuilds/NoBuilds';
// CSS
import styles from './buildslist.module.css';
// Types
import { BuildInterface } from '../../../../../shared/interfaces/interfaces';
type BuildsListProps = {
	builds: Array<BuildInterface>;
};

const BuildsList = (props: BuildsListProps) => {
	const { builds } = props;

	return (
		<Box className={styles.buildsListContainer}>
			{builds.length !== 0 ? (
				<>
					{builds.map((build, index) => {
						return <BuildBox key={index} build={build} />;
					})}
				</>
			) : (
				<NoBuilds />
			)}
		</Box>
	);
};

export default BuildsList;
