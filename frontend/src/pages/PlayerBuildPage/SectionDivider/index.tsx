import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// css
import styles from './Styles.module.css';

const SectionDivider = (props: { title: string }) => {
	const { title } = props;

	return (
		<Box className={styles.dividerContainer}>
			<Typography className='text-bold text-white-primary' variant='subtitle1'>
				{title}
			</Typography>
		</Box>
	);
};

export default SectionDivider;
