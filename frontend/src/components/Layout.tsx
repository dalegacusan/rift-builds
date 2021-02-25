import React from 'react';

// MaterialUi
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// Components
import Footer from './Footer/Footer';
import Header from './Header/Header';
// CSS
import styles from './layout.module.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.secondary.light,
	},
}));
// Types

const Layout = (props: { children: React.ReactNode }) => {
	const classes = useStyles();
	const { children } = props;

	return (
		<div className={classes.root}>
			<Header />
			<Container maxWidth='lg'>
				<section>{children}</section>
			</Container>
			<div className={styles.footerPush} />
			<Footer />
		</div>
	);
};

export default Layout;
