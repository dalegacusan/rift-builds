import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

// Shared
import { useQueriesTyped } from '../../shared/services/useQueriesTyped';
import { getOneChampion } from '../../shared/services/gameDataRequests';
import { getBuildsForChampion } from '../../shared/services/buildsRequests';
import { storeItem } from '../../shared/utils/sessionStorage';

// MaterialUI

// Components
import Box from '@material-ui/core/Box';
import BuildsList from './BuildsList';
import Button from '@material-ui/core/Button';
import ChampionData from './Header/index';
import ComponentLoading from '../../shared/components/Loading/PageLoading';
import GoogleAd from '../../shared/components/GoogleAd/GoogleAd';
import PageNotFound from '../../shared/components/PageError/PageNotFound/PageNotFound';

// CSS
import styles from './Styles.module.css';

// Types

interface ChampionBuildsProps
	extends RouteComponentProps<{ championName: string }> {}

const ChampionBuildsPage: React.FC<ChampionBuildsProps> = (props) => {
	const { match } = props;
	const { championName } = match.params;

	const [championInformation, setChampionInformation] = useState({
		championBuilds: [],
		championBuildsCount: 0,
		championData: {
			id: '',
			championName: '',
			counters: {
				weakAgainst: [],
				strongAgainst: [],
			},
			lane: [],
			tier: {
				Top: '',
				Jungle: '',
				Middle: '',
				Bottom: '',
				Support: '',
			},
			title: '',
		},
	});
	const [renderErrorComponent, setRenderErrorComponent] = useState(false);
	const [getMoreBuildsClick, setGetMoreBuildsClick] = useState(false);
	const [disableLoadMoreBuilds, setDisableLoadMoreBuilds] = useState(false);

	// For pagination
	const page = useRef(1);

	const getMoreBuilds = () => {
		setGetMoreBuildsClick(true);

		return getBuildsForChampion(championName, page.current);
	};

	const handleCreateMoreBuildsForChampion = () => {
		storeItem('championToCreateBuild', championInformation.championData);
	};

	const championBuildsQueries = useQueriesTyped([
		{
			queryKey: 'championBuilds',
			queryFn: () => getBuildsForChampion(championName, page.current),
			onError: () => setRenderErrorComponent(true),
		},
		{
			queryKey: 'championData',
			queryFn: () => getOneChampion(championName),
			onError: () => setRenderErrorComponent(true),
		},
	]);

	const eachQueryHasLoaded = championBuildsQueries.every(
		(query) => query.isFetched && query.isSuccess
	);

	// Query to get more builds
	const { data: newBuildsRetrieved, status, error, isError } = useQuery(
		'moreBuilds',
		getMoreBuilds,
		{
			enabled: getMoreBuildsClick,
		}
	);

	useEffect(() => {
		if (
			championBuildsQueries[0].data && // Champion Builds
			championBuildsQueries[1].data && // Champion Data
			eachQueryHasLoaded
		) {
			const [
				{ data: championBuilds },
				{ data: championData },
			] = championBuildsQueries;
			const { buildsCount, builds } = championBuilds.data;

			setChampionInformation({
				championBuilds: builds,
				championBuildsCount: buildsCount,
				championData: championData.data[0],
			});
		}
	}, [eachQueryHasLoaded]);

	useEffect(() => {
		if (newBuildsRetrieved) {
			const { data } = newBuildsRetrieved;
			const { hasNextPage, builds: newBuilds } = data;

			// REMOVES LOAD MORE BUTTON
			// If there is no more next page
			if (!hasNextPage) {
				setDisableLoadMoreBuilds(true);
			}

			// but still display the remaining builds from the previous pages
			setChampionInformation((prev: any) => {
				return {
					...prev,
					championBuilds: [...prev.championBuilds, ...newBuilds],
				};
			});
		}
	}, [newBuildsRetrieved]);

	useEffect(() => {
		page.current = page.current + 1;

		if (getMoreBuildsClick) {
			setGetMoreBuildsClick(false);
		}
	}, [getMoreBuildsClick]);

	return (
		<>
			<Helmet>
				<title>
					{championInformation.championData.championName} Builds and Guides -
					League of Legends: Wild Rift | Rift Builds
				</title>
			</Helmet>

			<div className='page-container'>
				<GoogleAd slot='2632263898' />

				{renderErrorComponent ? <PageNotFound /> : null}

				{!eachQueryHasLoaded && !renderErrorComponent ? (
					<ComponentLoading />
				) : null}

				{eachQueryHasLoaded && !renderErrorComponent ? (
					<>
						{/* Champion Data */}
						<ChampionData
							championData={championInformation.championData}
							buildsCount={championInformation.championBuildsCount}
						/>
						{/* Builds */}
						<BuildsList
							builds={championInformation.championBuilds}
							championData={championInformation.championData}
						/>

						{/* 
							Load More Button 
								- Display button if length of builds is greater than or equal to five
								  which is the number of items per load AND haven't viewed all the builds yet
						*/}
						{championInformation.championBuilds.length >= 5 &&
						!disableLoadMoreBuilds ? (
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
									{status === 'loading' ? 'Loading...' : 'Load more builds'}
								</Button>
							</Box>
						) : null}

						{disableLoadMoreBuilds && (
							<p className={`${styles.noMoreBuildsCTA} text-white-secondary`}>
								There are no more builds available.{' '}
								<span className='text-primary'>
									<a
										href='/build/create'
										onClick={handleCreateMoreBuildsForChampion}
										className='text-primary'
									>
										Create a build for&nbsp;
										{championInformation.championData.championName}
									</a>
								</span>
								&nbsp;instead.
							</p>
						)}
					</>
				) : null}

				<GoogleAd slot='8493312270' />
			</div>
		</>
	);
};

export default withRouter(ChampionBuildsPage);
