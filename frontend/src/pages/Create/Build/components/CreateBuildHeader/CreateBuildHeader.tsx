import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
// Types
// CSS
import styles from './createbuildheader.module.css';

const CreateBuildHeader = () => {
	return (
		<Box>
			<Box className={styles.createBuildHeaderContainer}>
				<Typography
					variant='h6'
					className={styles.createBuildHeader}
					gutterBottom
				>
					Create your build
				</Typography>
				<Typography
					variant='body2'
					className={styles.createBuildSubHeader}
					gutterBottom
				>
					Please note that you can only create up to 5 builds every 30 minutes.
				</Typography>
			</Box>
			<Box className={styles.createBuildHeaderDivider}>&nbsp;</Box>
		</Box>
	);
};

export default CreateBuildHeader;
