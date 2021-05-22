import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';

// Redux
import { connect, ConnectedProps } from 'react-redux';

// Shared
import { RoleFilter } from '../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';

// Components
import Champions from './ChampionsList';
import FilterChampionsBy from './FilterChampionsBy/index';
import GoogleAd from '../../shared/components/GoogleAd/GoogleAd';
import PageHelmet from '../../shared/components/PageHelmet/index';
import PageLoading from '../../shared/components/Loading/PageLoading';

// CSS

// Types
import { ChampionInterface } from '../../shared/interfaces/GameData';
import { RootState } from '../../shared/interfaces/GlobalStore';

const Landing: React.FC<LandingProps> = (props) => {
	// Game Data PROPS
	const { champions } = props;

	// Access the query client
	const queryClient = useQueryClient();

	const [championSearched, setChampionSearched] = useState('');
	const [filteredChampions, setFilteredChampions] = useState<
		Array<ChampionInterface>
	>([]);
	const [roleFilter, setRoleFilter] = useState(RoleFilter.ALL);

	// Handler for "Search for a champion" input
	const handleChampionSearchedChange = (
		e: React.ChangeEvent<HTMLInputElement> // ChangeEvent more suitable for typing form events.
	) => {
		const { value } = e.target;
		setChampionSearched(value);
	};

	// When champions array change, reflect the same change to filteredChampions array
	useEffect(() => {
		setFilteredChampions(champions);
	}, [champions]);

	// Change state based on "All, Top, Jungle, Middle, Bottom, Support"
	useEffect(() => {
		const filteredByRole = champions.filter((champion: ChampionInterface) => {
			const { lane } = champion;

			// Check if champion has "lane" property
			if (lane) {
				// Return every champion if filter is "all"
				if (roleFilter === RoleFilter.ALL) {
					return champion;
				} else {
					for (let i = 0; i < lane.length; i++) {
						if (lane[i].toLocaleLowerCase() === roleFilter) {
							return champion;
						}
					}
				}
			}
		});

		setFilteredChampions(filteredByRole);
	}, [roleFilter]);

	// Change state based on "Search for a champion"
	useEffect(() => {
		const filterChampions = champions.filter((champion: ChampionInterface) =>
			champion.championName
				.toLocaleLowerCase()
				.includes(championSearched.toLocaleLowerCase())
		);

		setFilteredChampions(filterChampions);
	}, [championSearched]);

	return (
		<>
			<PageHelmet pageTitle='Rift Builds - League of Legends: Wild Rift Champion Builds and Guides' />

			<Box className='page-container'>
				<GoogleAd slot='2632263898' />

				<FilterChampionsBy
					championSearched={championSearched}
					handleChampionSearchedChange={handleChampionSearchedChange}
					roleFilter={roleFilter}
					setRoleFilter={setRoleFilter}
				/>

				{/* Display champions if query is not fetching and champions array is not empty */}
				{!queryClient.isFetching() && champions.length !== 0 ? (
					<Champions filteredChampions={filteredChampions} />
				) : (
					<PageLoading />
				)}

				<GoogleAd slot='8493312270' />
			</Box>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		champions: state.gameData.champions,
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LandingProps = PropsFromRedux;

export default connector(Landing);
