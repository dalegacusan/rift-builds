import React from 'react';

// MaterialUI
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// Components
// CSS
import styles from './Styles.module.css';
// Types
type ViewMoreBuildsProps = {
	championName: string;
};

const ViewMoreBuilds = (props: ViewMoreBuildsProps) => {
	const { championName } = props;

	return (
		<Box
			display='flex'
			justifyContent='center'
			className={styles.viewMoreBuildsContainer}
		>
			<Box>
				<a
					href={`/builds/champion/${championName
						.toLocaleLowerCase()
						.split(' ')
						.filter((char) => char !== '.' && char !== "'")
						.join('')
						.replace('.', '')
						.replace("'", '')}`}
					style={{ textDecoration: 'none' }}
				>
					<Button
						variant='contained'
						// color='secondary'
						className={styles.viewMoreBuildsButton}
						endIcon={<KeyboardArrowRightIcon />}
					>
						View more builds for {championName}
					</Button>
				</a>
			</Box>
		</Box>
	);
};

export default ViewMoreBuilds;
