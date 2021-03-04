import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import BuildBox from './components/BuildBox/BuildBox';
import NoBuilds from './components/NoBuilds/NoBuilds';
// CSS
// Types
import { BuildInterface } from '../../../../../utils/interfaces';
type BuildsListProps = {
	builds: Array<BuildInterface>;
};

const BuildsList = (props: BuildsListProps) => {
	const { builds } = props;

	return (
		<Box
			style={{
				margin: '60px 0 0 0',
			}}
		>
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
