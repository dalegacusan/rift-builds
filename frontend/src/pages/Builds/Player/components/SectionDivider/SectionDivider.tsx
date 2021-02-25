import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// css
import styles from './sectiondivider.module.css';

const SectionDivider = (props: { title: string }) => {
	const { title } = props;

	return (
		<Box className={styles.dividerContainer}>
			<Typography
				className={styles.sectionTitle}
				variant='subtitle1'
				gutterBottom
			>
				{title}
			</Typography>
		</Box>
	);
};

export default SectionDivider;
