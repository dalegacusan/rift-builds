import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
				<LazyLoadImage
					src='/images/no_data.svg'
					width='120'
					className={styles.championImage}
				/>
				<Typography gutterBottom>
					There are no builds for this champion yet.{' '}
					<a href='/create' className={styles.createBuildLink}>
						Create a build
					</a>
				</Typography>
			</Box>
		</Box>
	);
}
