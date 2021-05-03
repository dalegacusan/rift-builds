import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

// Redux
import { connect, ConnectedProps } from 'react-redux';

// Shared
import { signInWithGoogle, logout } from '../../../services/firebaseApp';
import { isValidUser } from '../../../utils/isValidUser';

// Images
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

//Types
import { RootState } from '../../../../shared/interfaces/GlobalStore';

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

const AppBarComponent: React.FC<AppBarProps> = (props) => {
	// User PROPS
	const { user } = props;
	// React-Router PROPS
	const { history } = props;

	const classes = useStyles();

	console.log(user);

	return (
		<div className={classes.root}>
			<HideOnScroll {...props}>
				<AppBar className={styles.header}>
					<Toolbar>
						<Link to='/'>
							<img
								src={RiftBuildsTextImage}
								className={styles.headerLogo}
								alt='Rift Builds Logo'
							/>
						</Link>

						<Link to='/'>
							<p className={`${classes.menuLinks} ${styles.headerItem}`}>
								Home
							</p>
						</Link>

						{/* 
						Checks if user is logged in 
						*/}
						{isValidUser(user) ? (
							<>
								<p
									className={`${classes.menuLinks} ${styles.headerItem}`}
									onClick={logout}
								>
									Logout
								</p>
								<img src={user.photoURL} alt={user.displayName} />
							</>
						) : (
							<p
								className={`${classes.menuLinks} ${styles.headerItem}`}
								onClick={signInWithGoogle}
							>
								Login
							</p>
						)}

						<Button
							variant='contained'
							color='primary'
							className={styles.createBuildButton}
							onClick={() => {
								history.push('/build/create');
							}}
						>
							Create a build
						</Button>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar />
		</div>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		user: state.user,
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppBarProps = PropsFromRedux & RouteComponentProps;

export default connector(withRouter(AppBarComponent));
