import React from 'react';

// MaterialUi
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// Components
import Footer from './Footer/Footer';
import Header from './Header/Header';
// CSS
// Types

export default function Layout(props: { children: React.ReactNode }) {
	const { children } = props;

	return (
		<>
			<React.Fragment>
				<CssBaseline />
				<Container maxWidth='lg'>
					<Header />

					<section>{children}</section>

					<Footer />
				</Container>
			</React.Fragment>
		</>
	);
}
