import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';
import { URL } from '../../../shared/constants/constants';
import axios from 'axios';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// Components
import BuildItem from './components/BuildItem/BuildItem';
import CopyLink from './components/CopyLink/CopyLink';
import RuneItem from './components/RuneItem/RuneItem';
import SpellItem from './components/Spellitem/SpellItem';
import PlayerBuildHeader from './components/PlayerBuildHeader/PlayerBuildHeader';
import PlayerBuildFooter from './components/PlayerBuildFooter/PlayerBuildFooter';
import SectionDivider from './components/SectionDivider/SectionDivider';
// Types
import {
	BuildInterface,
	ItemInterface,
} from '../../../shared/constants/interfaces';
// CSS
import styles from './playerbuild.module.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden',
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

// === CHANGE PROPS TYPE === //
const PlayerBuild = (props: any) => {
	const classes = useStyles();

	const { match } = props;
	const [build, setBuild] = useState<BuildInterface>();

	useEffect(() => {
		axios.get(`${URL.SERVER}/api/build/${match.params.buildId}`).then((res) => {
			const { data } = res;

			setBuild(data);
		});
	}, []);

	return (
		<div className={classes.root}>
			{build ? (
				<>
					<Helmet>
						<title>
							{build.buildTitle} - {build.champion.championName} Build and Guide
							| Rift Builds
						</title>
					</Helmet>
					<Box className={styles.playerBuildContainer}>
						{/* Display Build ID */}
						{build.id ? <CopyLink buildId={build.id} /> : null}

						<PlayerBuildHeader build={build} />

						{/* PRIMARY ITEMS */}
						<SectionDivider title='Primary Items' />
						<Grid container spacing={3}>
							<Grid item xs={12}>
								{build.itemsConfirmed
									.filter((item: ItemInterface) => item.type !== 'optional')
									.map((item: ItemInterface, index) => {
										return <BuildItem key={index} item={item} />;
									})}
							</Grid>
						</Grid>

						{/* OPTIONAL ITEMS */}
						<SectionDivider title='Optional Items' />
						<Grid container spacing={3}>
							<Grid item xs={12}>
								{build.itemsConfirmed
									.filter((item: ItemInterface) => item.type !== 'primary')
									.map((item: ItemInterface, index) => {
										return <BuildItem key={index} item={item} />;
									})}
							</Grid>
						</Grid>

						{/* RUNES */}
						<SectionDivider title='Runes' />
						<Grid container spacing={3}>
							<Grid item xs={12}>
								{/* KEYSTONE RUNE */}
								<RuneItem rune={build.runes.keystone} />

								{/* DOMINATION RUNE */}
								<RuneItem rune={build.runes.domination} />

								{/* RESOLVE RUNE */}
								<RuneItem rune={build.runes.resolve} />

								{/* INSPIRATION RUNE BOX */}
								<RuneItem rune={build.runes.inspiration} />
							</Grid>
						</Grid>

						{/* SPELLS */}
						<SectionDivider title='Summoner Spells' />
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Box p={1}>
									<SpellItem spell={build.spells.spellOne} />
									<SpellItem spell={build.spells.spellTwo} />
								</Box>
							</Grid>
						</Grid>

						{/* FOOTER*/}
						<PlayerBuildFooter dateSubmitted={build.dateSubmitted} />
					</Box>
				</>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default withRouter(PlayerBuild);
