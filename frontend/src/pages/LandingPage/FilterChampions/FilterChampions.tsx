import React from 'react';

import { RoleFilter } from '../../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
// CSS
import styles from './filterchampions.module.css';
// Types
type FilterByProps = {
	championSearch: string;
	handleChampionSearchChange(e: React.ChangeEvent<HTMLInputElement>): void;
	roleFilter: string | undefined;
	setRoleFilter(role: string): void;
};

const FilterBy = (props: FilterByProps) => {
	const {
		championSearch,
		handleChampionSearchChange,
		roleFilter,
		setRoleFilter,
	} = props;

	return (
		<Box className={styles.filterContainer}>
			<Grid container>
				<Grid item xs={12} sm={10}>
					<Box className={styles.rolesListContainer}>
						<ul className={styles.rolesList}>
							<li>
								<span
									onClick={() => setRoleFilter(RoleFilter.ALL)}
									className={
										roleFilter === RoleFilter.ALL
											? styles.selectedFilter
											: undefined
									}
								>
									All
								</span>
							</li>
							<li>
								<span
									onClick={() => setRoleFilter(RoleFilter.TOP)}
									className={
										roleFilter === RoleFilter.TOP
											? styles.selectedFilter
											: undefined
									}
								>
									Top
								</span>
							</li>
							<li>
								<span
									onClick={() => setRoleFilter(RoleFilter.JUNGLE)}
									className={
										roleFilter === RoleFilter.JUNGLE
											? styles.selectedFilter
											: undefined
									}
								>
									Jungle
								</span>
							</li>
							<li>
								<span
									onClick={() => setRoleFilter(RoleFilter.MIDDLE)}
									className={
										roleFilter === RoleFilter.MIDDLE
											? styles.selectedFilter
											: undefined
									}
								>
									Middle
								</span>
							</li>
							<li>
								<span
									onClick={() => setRoleFilter(RoleFilter.BOTTOM)}
									className={
										roleFilter === RoleFilter.BOTTOM
											? styles.selectedFilter
											: undefined
									}
								>
									Bottom
								</span>
							</li>
							<li>
								<span
									onClick={() => setRoleFilter(RoleFilter.SUPPORT)}
									className={
										roleFilter === RoleFilter.SUPPORT
											? styles.selectedFilter
											: undefined
									}
								>
									Support
								</span>
							</li>
						</ul>
					</Box>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Box className={styles.searchForChampionContainer}>
						<input
							type='text'
							value={championSearch}
							onChange={handleChampionSearchChange}
							placeholder='Search a Champion'
							className={styles.searchForChampionInput}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterBy;
