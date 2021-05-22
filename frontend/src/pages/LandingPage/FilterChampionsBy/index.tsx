import React from 'react';

// Shared

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Shared
import { RoleFilter } from '../../../shared/constants/constants';

// Components
import RoleFilterItem from './RoleFilterItem/index';

// CSS
import styles from './Styles.module.css';

// Types
type FilterChampionsByProps = {
	championSearched: string;
	handleChampionSearchedChange(e: React.ChangeEvent<HTMLInputElement>): void;
	roleFilter: string;
	setRoleFilter(role: string): void;
};

const roleFilters = [
	RoleFilter.ALL,
	RoleFilter.TOP,
	RoleFilter.JUNGLE,
	RoleFilter.MIDDLE,
	RoleFilter.BOTTOM,
	RoleFilter.SUPPORT,
];

const FilterChampionsBy = (props: FilterChampionsByProps) => {
	const {
		championSearched,
		handleChampionSearchedChange,
		roleFilter,
		setRoleFilter,
	} = props;

	return (
		<Box className={styles.filterContainer}>
			<Grid container>
				<Grid item xs={12} sm={10}>
					<Box className={styles.rolesListContainer}>
						<ul className={`${styles.rolesList} text-white-primary`}>
							{roleFilters.map((role: string) => {
								return (
									<RoleFilterItem
										roleName={role}
										roleFilter={roleFilter}
										setRoleFilter={setRoleFilter}
									/>
								);
							})}
						</ul>
					</Box>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Box className={styles.searchForChampionContainer}>
						<input
							type='text'
							value={championSearched}
							onChange={handleChampionSearchedChange}
							placeholder='Search a Champion'
							className={`${styles.searchForChampionInput} text-white-secondary`}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterChampionsBy;
