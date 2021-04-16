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
		<Box className={styles.createBuildHeaderContainer}>
			<p className={styles.createBuildHeader}>Create your build</p>
			<Typography
				variant='body2'
				className={styles.createBuildSubHeader}
				gutterBottom
			>
				You can only create up to&nbsp;
				<span className={styles.textHighlight}>6 builds every 30 minutes</span>
			</Typography>
		</Box>
	);
};

export default CreateBuildHeader;
