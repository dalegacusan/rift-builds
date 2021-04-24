import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import BuildRole from './BuildRole';
import BuildTitle from './BuildTitle';
import BuildGameMode from './BuildGameMode';
import BuildDescription from './BuildDescription';
// CSS
import globalstyles from '../Styles.module.css';
import styles from './Styles.module.css';

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
