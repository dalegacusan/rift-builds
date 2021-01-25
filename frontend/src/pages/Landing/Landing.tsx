import React from 'react';

// MaterialUI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// Components
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));
// Types

export default function Landing() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} style={{ position: 'relative' }}>
					<Box
						style={{
							margin: '100px 0',
							padding: '5px',
						}}
					>
						<Typography
							variant='h4'
							gutterBottom
							style={{ fontWeight: 'bold', margin: '0 0 25px 0' }}
						>
							Lorem ipsum dolor sit amet consectetur adipiscing elit
						</Typography>
						<Typography
							variant='subtitle1'
							gutterBottom
							style={{ margin: '0 0 45px 0' }}
						>
							Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
							enim ad minim veniam quis nostrud exercitation ullamco
						</Typography>
						<a href='/create'>
							<Button variant='contained' color='primary'>
								Create your build
							</Button>
						</a>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<img
						src='/images/yasuo.png'
						style={{ width: '90%', marginTop: '-20px' }}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
