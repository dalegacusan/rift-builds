import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// CSS
import styles from './Styles.module.css';

// Types
type SectionDividerProps = {
	title: string;
};

const SectionDivider = (props: SectionDividerProps) => {
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
