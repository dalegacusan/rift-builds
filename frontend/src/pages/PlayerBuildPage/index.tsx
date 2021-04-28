import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';

// Shared
import { getPlayerBuild } from '../../shared/services/buildsRequests';
import { ItemType } from '../../shared/constants/constants';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Components
import BuildDescription from './BuildDescription';
import BuildItem from './BuildItem';
import ComponentLoading from '../../shared/components/Loading/ComponentLoading';
import PageNotFound from '../../shared/components/PageError/PageNotFound/PageNotFound';
import PlayerBuildHeader from './PlayerBuildHeader';
import PlayerBuildFooter from './PlayerBuildFooter';
import RuneItem from './RuneItem';
import SectionDivider from './SectionDivider';
import SpellItem from './Spellitem';

// Types
import { BuildInterface } from '../../shared/interfaces/Build';
import { ItemInterface } from '../../shared/interfaces/GameData';

// CSS

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

interface MatchParams {
	buildId: string;
}

interface PlayerBuildProps extends RouteComponentProps<MatchParams> {}

const PlayerBuild = (props: PlayerBuildProps) => {
	const { match } = props;
	const classes = useStyles();

	// Access the query client
	const queryClient = useQueryClient();

	const { data, status, error, isError } = useQuery('playerBuild', () =>
		getPlayerBuild(match.params.buildId)
	);

	const [build, setBuild] = useState<BuildInterface>();

	const [renderErrorComponent, setRenderErrorComponent] = useState(false);

	useEffect(() => {
		// "&& data" to get rid of "data.data is possibly undefined"
		if (status === 'success' && data) {
			setBuild(data.data);
		} else if (isError && error) {
			setRenderErrorComponent(true);
		}
	}, [status]);

	return (
		<div className={`${classes.root} page-container`}>
			{!queryClient.isFetching() && !renderErrorComponent && build ? (
				<>
					<Helmet>
						<title>
							{build.champion.championName} Build and Guide by {build.username}
							&nbsp;| Rift Builds
						</title>
					</Helmet>
					<Box className='text-white-pure'>
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
			) : (
				<ComponentLoading />
			)}
		</div>
	);
};

export default withRouter(PlayerBuild);
