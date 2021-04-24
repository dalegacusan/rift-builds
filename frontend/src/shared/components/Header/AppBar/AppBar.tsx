import React from 'react';

import RiftBuildsTextImage from '../assets/rift_builds_text.png';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// Components
// CSS
import styles from './appbar.module.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuLinks: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));
//Types

function HideOnScroll(props: any) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

const AppBarComponent = (props: any) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<HideOnScroll {...props}>
				<AppBar className={styles.header}>
					<Toolbar>
						<a href='/' className={classes.title}>
							<img
								src={RiftBuildsTextImage}
								className={styles.headerLogo}
								alt='Rift Builds Logo'
							/>
						</a>
						<a href='/' className={styles.headerLink}>
							<p className={classes.menuLinks}>Home</p>
						</a>
						<a href='/build/create' className={styles.headerLink}>
							<Button
								variant='contained'
								color='primary'
								className={styles.createBuildButton}
							>
								Create a build
							</Button>
						</a>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar />
		</div>
	);
};

export default AppBarComponent;
