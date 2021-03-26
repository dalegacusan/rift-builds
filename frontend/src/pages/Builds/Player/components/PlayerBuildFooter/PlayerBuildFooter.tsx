import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import CopyBuildLink from './components/CopyBuildLink/CopyBuildLink';
import ViewMoreBuilds from './components/ViewMoreBuilds/ViewMoreBuilds';
// CSS
import styles from './playerbuildfooter.module.css';
// Types
type PlayerBuildFooterProps = {
	buildId: string | undefined;
};

const PlayerBuildFooter = (props: PlayerBuildFooterProps) => {
	const { buildId } = props;

	return (
		<Box display='flex' className={styles.playerBuildFooterContainer}>
			<Box flexGrow={1} className={styles.playerBuildFooterBody}>
				<CopyBuildLink buildId={buildId} />
				<ViewMoreBuilds buildId={buildId} />
			</Box>
		</Box>
	);
};

export default PlayerBuildFooter;
