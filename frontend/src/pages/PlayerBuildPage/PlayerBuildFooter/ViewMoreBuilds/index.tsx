import React from 'react';

// Shared
import { championNameToUrlString } from '../../../../shared/utils/championNameToUrlString';

// MaterialUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

// Components

// CSS
import styles from './Styles.module.css';

// Types
type ViewMoreBuildsProps = {
	championName: string;
};

const ViewMoreBuilds = (props: ViewMoreBuildsProps) => {
	const { championName } = props;

	return (
		<Box
			display='flex'
			justifyContent='center'
			className={styles.viewMoreBuildsContainer}
		>
			<Box>
				<a
					href={`/builds/champion/${championNameToUrlString(championName)}`}
					className={styles.viewMoreBuildsLink}
				>
					<Button
						variant='contained'
						className={styles.viewMoreBuildsButton}
						endIcon={<KeyboardArrowRightIcon />}
					>
						View more builds for {championName}
					</Button>
				</a>
			</Box>
		</Box>
	);
};

export default ViewMoreBuilds;
