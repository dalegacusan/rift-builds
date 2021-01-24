import React from 'react';

// MaterialUI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
// CSS
//Types

export default function Header() {
	return (
		<>
			<header>
				<Grid container style={{ padding: '16px 0' }}>
					<Grid item xs={12}>
						<Box>
							<Typography
								variant='h4'
								component='a'
								href='/'
								style={{ color: '#000000', textDecoration: 'none' }}
								gutterBottom
							>
								Wild Rift Community Builds
							</Typography>
							<Box
								style={{
									marginTop: '8px',
								}}
							>
								<Typography component='a' href='/'>
									Home
								</Typography>{' '}
								&nbsp;
								<Typography component='a' href='/builds'>
									View builds
								</Typography>{' '}
								&nbsp;
								<Typography component='a' href='/create'>
									Create a build
								</Typography>{' '}
								&nbsp;
							</Box>
						</Box>
					</Grid>
				</Grid>
				<hr />
			</header>
		</>
	);
}
