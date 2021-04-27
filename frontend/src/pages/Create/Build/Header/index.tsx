import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
// Types
// CSS
import styles from './Styles.module.css';

const CreateBuildHeader = () => {
	return (
		<Box className={styles.createBuildHeaderContainer}>
			<p className={`${styles.createBuildHeader} text-bold text-white-pure`}>
				Create your build
			</p>
			<Typography variant='body2' className='text-white-primary' gutterBottom>
				To prevent an unnecessary amount of builds, we added a restriction that
				you can only create&nbsp;
				<span className={styles.textHighlight}>6 builds every 30 minutes</span>
			</Typography>
		</Box>
	);
};

export default CreateBuildHeader;
