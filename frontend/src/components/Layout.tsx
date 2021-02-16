import React from 'react';

// MaterialUi
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// Components
import Footer from './Footer/Footer';
import Header from './Header/Header';
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
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
				<Footer />
			</Container>
		</div>
	);
};

export default Layout;
