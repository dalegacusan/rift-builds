import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// CSS
import styles from './buildchip.module.css';
// Types
type BuildChipProps = {
	property: string;
	value: string;
};

const BuildChip = (props: BuildChipProps) => {
	const { property, value } = props;

	return (
		<Box className={styles.BuildChipContainer}>
			<span>
				{property} &nbsp;<span className={styles.chipValue}>{value}</span>
			</span>
		</Box>
	);
};

export default BuildChip;
