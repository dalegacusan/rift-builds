import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

// MaterialUI
// Components
import BuildsList from './components/BuildsList/BuildsList';
import ChampionData from './components/ChampionData/ChampionData';
// CSS
import styles from './championbuilds.module.css';
// Types
import { ChampionInterface } from '../../../utils/interfaces';
type PathParamsType = {
	championName: string;
};
type HeroBuildsProps = RouteComponentProps<PathParamsType> & {};

const HeroBuilds = (props: HeroBuildsProps) => {
	const { match } = props;
	const { championName } = match.params;

	const [isLoading, setIsLoading] = useState(true);
	const [championBuilds, setChampionBuilds] = useState({
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
		url: '',
	});

	useEffect(() => {
		const getAllBuildsForChampion = axios.post(
			// `/api/build/${match.params.buildId}`
			`/api/build/all/${championName}`,
			{ page: 5 }
		);
		const getOneChampion = axios.get(`/api/champion/${championName}`);

		Promise.all([getAllBuildsForChampion, getOneChampion]).then((values) => {
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
					{/* Champion Data */}
					<ChampionData
						championData={championData}
						buildsCount={championBuilds.buildsCount}
					/>
					{/* Builds */}
					<BuildsList builds={championBuilds.builds} />
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default withRouter(HeroBuilds);
