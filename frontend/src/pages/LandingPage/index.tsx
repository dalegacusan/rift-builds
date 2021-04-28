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
import FilterBy from './FilterChampions';
import ComponentLoading from '../../shared/components/Loading/ComponentLoading';

// CSS

// Types
import { ChampionInterface } from '../../shared/interfaces/GameData';
import { RootState } from '../../shared/interfaces/GlobalStore';

const Landing = (props: LandingProps) => {
	// Game Data PROPS
	const { champions } = props;

	// Access the query client
	const queryClient = useQueryClient();

	const [championSearch, setChampionSearch] = useState('');
	const [filteredChampions, setFilteredChampions] = useState<
		Array<ChampionInterface>
	>([]);
	const [roleFilter, setRoleFilter] = useState(RoleFilter.ALL);

	// HANDLER for "Search for a champion" input
	const handleChampionSearchChange = (
		e: React.ChangeEvent<HTMLInputElement> // ChangeEvent more suitable for typing form events.
	) => {
		const { value } = e.target;
		setChampionSearch(value);
	};

	useEffect(() => {
		setFilteredChampions(champions);
	}, [champions]);

	// Change state based on "All, Top, Jungle, Middle, Bottom, Support"
	useEffect(() => {
		const filterRoles = champions.filter((champion: ChampionInterface) => {
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

		setFilteredChampions(filterRoles);
	}, [roleFilter]);

	// Change state based on "Search for a champion"
	useEffect(() => {
		const filterChampions = champions.filter((champion: ChampionInterface) =>
			champion.championName
				.toLocaleLowerCase()
				.includes(championSearch.toLocaleLowerCase())
		);

		setFilteredChampions(filterChampions);
	}, [championSearch]);

	return (
		<>
			<Box className='page-container'>
				<FilterBy
					championSearch={championSearch}
					handleChampionSearchChange={handleChampionSearchChange}
					roleFilter={roleFilter}
					setRoleFilter={setRoleFilter}
				/>

				{/* Display champions if query is not fetching and champions array is not empty */}
				{!queryClient.isFetching() && champions.length !== 0 ? (
					<Champions filteredChampions={filteredChampions} />
				) : (
					<ComponentLoading />
				)}
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
