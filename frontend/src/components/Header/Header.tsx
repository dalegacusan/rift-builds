import React from 'react';

// MaterialUI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import AppBar from './AppBar';
// CSS
//Types

export default function Header() {
	return (
		<>
			<header>
				<Grid container>
					<AppBar />
				</Grid>
			</header>
		</>
	);
}
