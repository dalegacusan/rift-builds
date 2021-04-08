import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';
import { URL } from '../../../shared/config/config';
import axios from 'axios';

// MaterialUI
// Components
import Box from '@material-ui/core/Box';
import BuildsList from './components/BuildsList/BuildsList';
import Button from '@material-ui/core/Button';
import ChampionData from './components/ChampionData/ChampionData';
// CSS
import styles from './championbuilds.module.css';
// Types
import {
	BuildInterface,
	ChampionInterface,
} from '../../../shared/interfaces/interfaces';
type PathParamsType = {
	championName: string;
};
type ChampionBuildsType = {
	builds: Array<BuildInterface>;
	buildsCount: number;
};
type HeroBuildsProps = RouteComponentProps<PathParamsType> & {};

// For pagination (used in POST requests)
let page = 5;

const HeroBuilds = (props: HeroBuildsProps) => {
	const { match } = props;
	const { championName } = match.params;

	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMoreBuilds, setIsLoadingMoreBuilds] = useState(false);
	const [championBuilds, setChampionBuilds] = useState<ChampionBuildsType>({
		builds: [],
		buildsCount: 0,
	});
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

	const getBuildsForChampion = () => {
		return axios.post(`${URL.SERVER}/api/build/all/${championName}`, { page });
	};
	const getMoreBuilds = async () => {
		setIsLoadingMoreBuilds(true);

		page += 5;

		const moreBuildsRequest = await getBuildsForChampion();
		const { data } = moreBuildsRequest;
		const { buildsCount: newBuildsCount, builds: newBuilds } = data;

		setChampionBuilds((prev: ChampionBuildsType) => {
			const { builds: previousBuilds } = prev;
			return {
				builds: [...previousBuilds, ...newBuilds],
				buildsCount: newBuildsCount,
			};
		});
		setIsLoadingMoreBuilds(false);
	};

	useEffect(() => {
		const getOneChampion = axios.get(
			`${URL.SERVER}/api/champion/${championName}`
		);

		Promise.all([getBuildsForChampion(), getOneChampion]).then((values) => {
			const [{ data: buildsForChampion }, { data: dataForChampion }] = values;
			const { buildsCount, builds } = buildsForChampion;

			setChampionBuilds({ builds, buildsCount });
			setChampionData(dataForChampion[0]);

			setIsLoading(!isLoading);
		});
	}, []);

	return (
		<>
			{!isLoading ? (
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
						buildsCount={championBuilds.buildsCount}
					/>
					{/* Builds */}
					<BuildsList builds={championBuilds.builds} />

					{/* Load More Button */}
					{championBuilds.buildsCount !== 0 &&
					championBuilds.builds.length !== 0 ? (
						<Box
							display='flex'
							justifyContent='center'
							className={styles.loadMoreContainer}
						>
							<Button
								onClick={getMoreBuilds}
								variant='contained'
								className={styles.loadMoreButton}
							>
								{isLoadingMoreBuilds ? 'Loading...' : 'Load more builds'}
							</Button>
						</Box>
					) : null}
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default withRouter(HeroBuilds);
