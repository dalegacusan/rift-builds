import React from 'react';

// MaterialUI
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
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

export default function AppBarComponent(props: any) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<HideOnScroll {...props}>
				<AppBar className={styles.header}>
					<Toolbar>
						<a href='/' className={classes.title}>
							<img src='/images/riftbuilds.png' style={{ width: '100px' }} />
						</a>
						<a href='/' className={styles.headerLink}>
							<p className={classes.menuLinks}>Home</p>
						</a>
						<a href='/create' className={styles.headerLink}>
							<p className={classes.menuLinks}>Create</p>
						</a>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar />
		</div>
	);
}
