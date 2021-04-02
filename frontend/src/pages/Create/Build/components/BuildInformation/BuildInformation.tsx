import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import BuildRole from './components/BuildRole/BuildRole';
import BuildTitle from './components/BuildTitle/BuildTitle';
import BuildGameMode from './components/GameMode/GameMode';
import BuildDescription from './components/Description/Description';
// CSS
import globalstyles from '../../createbuild.module.css';
import styles from './buildinformation.module.css';

const BuildInformation = () => {
	return (
		<Grid container spacing={3} className={globalstyles.gridContainer}>
			<Grid item xs={12} sm={12}>
				<p className={globalstyles.buildStepHeader}>Tell us about your build</p>
			</Grid>
			<Grid item xs={12} sm={12}>
				<BuildTitle />
			</Grid>
			<Grid item xs={12} sm={6}>
				<BuildRole />
			</Grid>
			<Grid item xs={12} sm={6}>
				<BuildGameMode />
			</Grid>
			<Grid item xs={12} sm={12}>
				<BuildDescription />
			</Grid>
		</Grid>
	);
};

export default BuildInformation;
