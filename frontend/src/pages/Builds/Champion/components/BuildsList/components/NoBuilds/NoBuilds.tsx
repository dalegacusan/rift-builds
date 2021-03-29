import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
// Types
// CSS
import styles from './nobuilds.module.css';

export default function NoBuilds() {
	return (
		<Box
			className={styles.noBuildsContainer}
			display='flex'
			justifyContent='center'
		>
			<Box>
				<img
					src='/images/empty.svg'
					className={styles.noBuildImage}
					alt='no builds'
					title='no builds'
				/>
				<Typography gutterBottom>
					There are no builds for this champion yet.{' '}
					<a href='/build/create' className={styles.createBuildLink}>
						Create a build
					</a>
				</Typography>
			</Box>
		</Box>
	);
}
