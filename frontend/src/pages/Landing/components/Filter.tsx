import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Types
// CSS
import styles from './filter.module.css';

export default function Filter(props: any) {
	const { setRoleFilter, championSearch, handleChampionSearchChange } = props;

	return (
		<Box className={styles.filterContainer}>
			<Grid container>
				<Grid item xs={12} sm={10}>
					<Box className={styles.rolesListContainer}>
						<ul className={styles.rolesList}>
							<li>
								<span onClick={() => setRoleFilter('all')}>All</span>
							</li>
							<li>
								<span onClick={() => setRoleFilter('top')}>Top</span>
							</li>
							<li onClick={() => setRoleFilter('jungle')}>Jungle</li>
							<li onClick={() => setRoleFilter('middle')}>Middle</li>
							<li onClick={() => setRoleFilter('bottom')}>Bottom</li>
							<li onClick={() => setRoleFilter('support')}>Support</li>
						</ul>
					</Box>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Box className={styles.searchForChampionContainer}>
						<TextField
							value={championSearch}
							onChange={handleChampionSearchChange}
							label='Search a Champion'
							variant='outlined'
							size='small'
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
