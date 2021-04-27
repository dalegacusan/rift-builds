import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';

// Components
import CopyBuildLink from './CopyBuildLink';
import ViewMoreBuilds from './ViewMoreBuilds';

// CSS
import styles from './Styles.module.css';

// Types
type PlayerBuildFooterProps = {
	buildId: string | undefined;
	championName: string;
};

const PlayerBuildFooter = (props: PlayerBuildFooterProps) => {
	const { buildId, championName } = props;

	return (
		<Box display='flex' className={styles.playerBuildFooterContainer}>
			<Box flexGrow={1} className={styles.playerBuildFooterBody}>
				<CopyBuildLink buildId={buildId} />
				<ViewMoreBuilds championName={championName} />
			</Box>
		</Box>
	);
};

export default PlayerBuildFooter;
