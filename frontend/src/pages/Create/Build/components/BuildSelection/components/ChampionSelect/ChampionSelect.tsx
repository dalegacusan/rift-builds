import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// Components
// CSS
import styles from './championselect.module.css';
// Types
import { ChampionInterface } from '../../../../../../../utils/interfaces';
type ChampionSelectProps = {
	champions: Array<ChampionInterface>;
	championSelected: ChampionInterface;
	handleChampSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
	formControl: string;
};

const ChampionSelect = (props: ChampionSelectProps) => {
	const {
		champions,
		championSelected,
		handleChampSelectChange,
		formControl,
	} = props;

	return (
		<Box>
			<p>3. Champion</p>

			<Box className={styles.championSelectContainer}>
				{/* Display Champion Image */}
				{championSelected ? (
					<LazyLoadImage
						src={`/images/wildriftchampions/${championSelected.id}.png`}
						className={styles.championImage}
					/>
				) : (
					// Defaults to "Ahri"'s image if no champion selected
					<LazyLoadImage
						src={`/images/wildriftchampions/48ca031a-d92e-44e6-b7b6-f3eb1dbe644c.png`}
						className={styles.championImage}
					/>
				)}

				{
					<FormControl className={formControl}>
						<InputLabel shrink htmlFor='champion-select'>
							Champion
						</InputLabel>
						<NativeSelect
							value={championSelected.id}
							onChange={handleChampSelectChange}
							inputProps={{
								name: 'champion',
								id: 'champion-select',
							}}
						>
							{champions.map(
								({ id, championName }: ChampionInterface, index) => {
									return (
										<option key={index} value={id}>
											{championName}
										</option>
									);
								}
							)}
						</NativeSelect>
						<FormHelperText>Select a champion</FormHelperText>
					</FormControl>
				}
			</Box>
		</Box>
	);
};

export default ChampionSelect;
