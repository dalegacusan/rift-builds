import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

// Shared
import { getOneChampion } from '../../shared/services/gameDataRequests';
import { getBuildsForChampion } from '../../shared/services/buildsRequests';

// MaterialUI

// Components
import Box from '@material-ui/core/Box';
import BuildsList from './BuildsList';
import Button from '@material-ui/core/Button';
import ChampionData from './Header/index';
import PageNotFound from '../../shared/components/PageError/PageNotFound/PageNotFound';
import ComponentLoading from '../../shared/components/Loading/ComponentLoading';

// CSS
import styles from './Styles.module.css';

// Types
import { ChampionInterface } from '../../shared/interfaces/GameData';
import { BuildInterface } from '../../shared/interfaces/Build';

type PathParamsType = {
	championName: string;
};
type ChampionBuildsProps = RouteComponentProps<PathParamsType> & {};

const ChampionBuildsPage = (props: ChampionBuildsProps) => {
	const { match } = props;
	const { championName } = match.params;

	const [championBuilds, setChampionBuilds] = useState<Array<BuildInterface>>(
		[]
	);
	const [championBuildsCount, setChampionBuildsCount] = useState(0);
	const [championData, setChampionData] = useState<ChampionInterface>({
		id: '',
		championName: '',
		counters: {
			weakAgainst: [],
			strongAgainst: [],
		},
		lane: [],
		tier: {},
		title: '',
	});

	const [renderErrorComponent, setRenderErrorComponent] = useState(false);
	const [isLoadingPage, setIsLoadingPage] = useState(true);
	const [isLoadingMoreBuilds, setIsLoadingMoreBuilds] = useState(false);
	const [disableLoadMoreBuilds, setDisableLoadMoreBuilds] = useState(false);

	// For pagination
	const page = useRef(1);

	const getMoreBuilds = async () => {
		setIsLoadingMoreBuilds(true);

		page.current = page.current + 1;

		const moreBuildsRequest = await getBuildsForChampion(
			championName,
			page.current
		);
		const { data } = moreBuildsRequest;
		const { hasNextPage, builds: newBuilds } = data;

		setIsLoadingMoreBuilds(false);

		// REMOVES LOAD MORE BUTTON
		// If there is no more next page
		if (!hasNextPage) {
			setDisableLoadMoreBuilds(true);
		}

		// but still display the remaining builds from the previous pages
		setChampionBuilds((prev: Array<BuildInterface>) => {
			return [...prev, ...newBuilds];
		});
	};

	// Load builds and champion data
	useEffect(() => {
		Promise.all([
			getBuildsForChampion(championName, page.current),
			getOneChampion(championName),
		])
			.then((values) => {
				const [{ data: buildsForChampion }, { data: dataForChampion }] = values;
				const { buildsCount, builds } = buildsForChampion;

				setChampionBuilds([...builds]);
				setChampionBuildsCount(buildsCount);

				setChampionData(dataForChampion[0]);

				setIsLoadingPage(!isLoadingPage);
			})
			.catch((err) => {
				setIsLoadingPage(!isLoadingPage);

				setRenderErrorComponent(true);
			});
	}, []);

	return (
		<div className='page-container'>
			{renderErrorComponent ? <PageNotFound /> : null}

			{isLoadingPage ? <ComponentLoading /> : null}

			{!isLoadingPage && !renderErrorComponent ? (
				<>
					<Helmet>
						<title>
							{championData.championName} Builds and Guides - League of Legends:
							Wild Rift | Rift Builds
						</title>
					</Helmet>
					{/* Champion Data */}
					<ChampionData
						championData={championData}
						buildsCount={championBuildsCount}
					/>
					{/* Builds */}
					<BuildsList builds={championBuilds} championData={championData} />

					{/* 
							Load More Button 
								- Display button if length of builds is greater than or equal to five
								  which is the number of items per load AND haven't viewed all the builds yet
						*/}
					{championBuilds.length >= 5 && !disableLoadMoreBuilds ? (
						<Box
							display='flex'
							justifyContent='center'
							className={styles.loadMoreContainer}
						>
							<Button
								onClick={getMoreBuilds}
								variant='contained'
								className={`${styles.loadMoreButton} text-white-primary`}
								disabled={disableLoadMoreBuilds}
							>
								{isLoadingMoreBuilds ? 'Loading...' : 'Load more builds'}
							</Button>
						</Box>
					) : null}
				</>
			) : null}
		</div>
	);
};

export default withRouter(ChampionBuildsPage);
