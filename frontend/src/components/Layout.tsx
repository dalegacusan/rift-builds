import React from 'react';

// MaterialUi
import Container from '@material-ui/core/Container';
// Components
import Footer from './Footer/Footer';
import Header from './Header/Header';
// CSS
// Types

const Layout = (props: { children: React.ReactNode }) => {
	const { children } = props;

	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<section>{children}</section>
				<Footer />
			</Container>
		</>
	);
};

export default Layout;
