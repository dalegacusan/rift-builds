import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
// Types
import {
	BuildInterface,
	CountersInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RuneInterface,
	SpellInterface,
} from '../../../../../utils/interfaces';
// CSS
import styles from './createbuild.module.css';

const BuildInformation = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>1. Build Title</p>
					<input
						type='text'
						placeholder='Build title'
						style={{ width: '100%' }}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>2. Role</p>
					<input type='text' placeholder='Role' style={{ width: '100%' }} />
				</Box>
			</Grid>
		</Grid>
	);
};

export default BuildInformation;
