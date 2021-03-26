import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// Components
// CSS
import styles from './viewmorebuilds.module.css';
// Types
type ViewMoreBuildsProps = {
	buildId: string | undefined;
};

const ViewMoreBuilds = (props: ViewMoreBuildsProps) => {
	const { buildId } = props;

	return (
		<Box
			display='flex'
			justifyContent='center'
			className={styles.viewMoreBuildsContainer}
		>
			<Box>
				<a href={`/build/${buildId}`} style={{ textDecoration: 'none' }}>
					<Button
						variant='contained'
						color='secondary'
						className={styles.viewMoreBuildsButton}
					>
						View more builds for this champion
					</Button>
				</a>
			</Box>
		</Box>
	);
};

export default ViewMoreBuilds;
