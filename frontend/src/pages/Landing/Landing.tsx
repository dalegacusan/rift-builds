import React from 'react';

// MaterialUI
import Typography from '@material-ui/core/Typography';
// Components
// CSS
// Types

export default function Landing() {
	return (
		<>
			<Typography>Hello, challengers!</Typography>

			<Typography>FAQ</Typography>
			<Typography>
				<b>Tell me more about this</b>
			</Typography>
			<Typography>
				It's a platform where players can share their builds to the community.
				Get started by <a href='/create'>creating a build</a>
			</Typography>
			<Typography>
				<b>
					Is this directly related to RIOT Games or League of Legends: Wild
					Rift?
				</b>
			</Typography>
			<Typography>No.</Typography>
		</>
	);
}
