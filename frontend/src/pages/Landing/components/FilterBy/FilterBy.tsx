import React from 'react';

import { RoleFilter } from '../../../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
// CSS
import styles from './filterby.module.css';
// Types
type FilterByProps = {
	championSearch: string;
	handleChampionSearchChange(e: React.ChangeEvent<HTMLInputElement>): void;
	setRoleFilter(role: string): void;
};

const FilterBy = (props: FilterByProps) => {
	const { championSearch, handleChampionSearchChange, setRoleFilter } = props;

	return (
		<Box className={styles.filterContainer}>
			<Grid container>
				<Grid item xs={12} sm={10}>
					<Box className={styles.rolesListContainer}>
						<ul className={styles.rolesList}>
							<li>
								<span onClick={() => setRoleFilter(RoleFilter.ALL)}>All</span>
							</li>
							<li>
								<span onClick={() => setRoleFilter(RoleFilter.TOP)}>Top</span>
							</li>
							<li>
								<span onClick={() => setRoleFilter(RoleFilter.JUNGLE)}>
									Jungle
								</span>
							</li>
							<li>
								<span onClick={() => setRoleFilter(RoleFilter.MIDDLE)}>
									Middle
								</span>
							</li>
							<li>
								<span onClick={() => setRoleFilter(RoleFilter.BOTTOM)}>
									Bottom
								</span>
							</li>
							<li>
								<span onClick={() => setRoleFilter(RoleFilter.SUPPORT)}>
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
