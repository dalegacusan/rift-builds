import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import PlayerUsername from './PlayerUsername';
import PlayerRank from './PlayerRank';
import PlayerServer from './PlayerRegion';
// Types
// CSS

const PlayerInformation = () => {
	return (
		<Grid container spacing={3} style={{ color: '#EBEBEB' }}>
			<Grid item xs={12} sm={6}>
				<PlayerUsername />
			</Grid>
			<Grid item xs={12} sm={6}>
				<PlayerRank />
			</Grid>
			<Grid item xs={12} sm={6}>
				<PlayerServer />
			</Grid>
		</Grid>
	);
};

export default PlayerInformation;
