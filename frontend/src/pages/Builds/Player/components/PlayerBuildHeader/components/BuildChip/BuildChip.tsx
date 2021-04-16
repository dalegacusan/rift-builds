import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
// CSS
import styles from './buildchip.module.css';
// Types
type BuildChipProps = {
	property: string;
	value: string | undefined;
};

const BuildChip = (props: BuildChipProps) => {
	const { property, value } = props;

	return (
		<Box className={styles.BuildChipContainer}>
			<span className={styles.buildChipValue}>
				{property} &nbsp;
				<span className={styles.chipValue}>{value ? value : '?'}</span>
			</span>
		</Box>
	);
};

export default BuildChip;
