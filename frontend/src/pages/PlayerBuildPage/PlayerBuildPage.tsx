import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';
import axios from 'axios';

import { ItemType } from '../../shared/constants/constants';
import { URL } from '../../shared/config/config';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import BuildDescription from './BuildDescription/BuildDescription';
import BuildItem from './BuildItem/BuildItem';
import LoadingCircle from '../../shared/components/Loading/ComponentLoading';
import RuneItem from './RuneItem/RuneItem';
import SectionDivider from './SectionDivider/SectionDivider';
import SpellItem from './Spellitem/SpellItem';
import PageNotFound from '../../shared/components/PageError/PageNotFound/PageNotFound';
import PlayerBuildHeader from './PlayerBuildHeader/PlayerBuildHeader';
import PlayerBuildFooter from './PlayerBuildFooter/PlayerBuildFooter';
// Types
import { BuildInterface } from '../../shared/interfaces/Build';
import { ItemInterface } from '../../shared/interfaces/GameData';
// CSS
import styles from './playerbuildpage.module.css';
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
	const { match } = props;
	const classes = useStyles();

	const [build, setBuild] = useState<BuildInterface>();

	const [renderErrorComponent, setRenderErrorComponent] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`${URL.SERVER}/api/build/${match.params.buildId}`)
			.then((res) => {
				const { data } = res;

				setIsLoading(!isLoading);

				setBuild(data);
			})
			.catch((err) => {
				setIsLoading(!isLoading);

				setRenderErrorComponent(true);
			});
	}, []);

	return (
		<div className={classes.root}>
			{renderErrorComponent ? <PageNotFound /> : null}

			{!isLoading && !renderErrorComponent && build ? (
				<>
					<Helmet>
						<title>
							{build.champion.championName} Build and Guide by {build.username}
							&nbsp;| Rift Builds
						</title>
					</Helmet>
					<Box className={styles.playerBuildContainer}>
						{/* Display Build ID */}
						<PlayerBuildHeader build={build} />

						<BuildDescription description={build.description} />

						{/* PRIMARY ITEMS */}
						<SectionDivider title='Primary Items' />
						<Grid container spacing={3}>
							<Grid item xs={12}>
								{build.itemsConfirmed
									.filter(
										(item: ItemInterface) => item.type !== ItemType.OPTIONAL
									)
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
									.filter(
										(item: ItemInterface) => item.type !== ItemType.PRIMARY
									)
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
						<PlayerBuildFooter
							buildId={build.id}
							championName={build.champion.championName}
						/>
					</Box>
				</>
			) : null}

			{isLoading ? <LoadingCircle /> : null}
		</div>
	);
};

export default withRouter(PlayerBuild);
