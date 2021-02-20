import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
// Components
// Types
import { BuildInterface, RankInterface } from '../../../../../utils/interfaces';
// CSS
import styles from './playerinformation.module.css';
type PlayerInformationProps = {
	formControl: string;
	ranks: Array<RankInterface>;
	setBuild: (newBuild: any) => void;
};

const PlayerInformation = (props: PlayerInformationProps) => {
	const { formControl, ranks, setBuild } = props;

	// =============== Username =============== //
	const [username, setUsername] = useState('');
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setUsername(value);
	};

	// =============== Rank =============== //
	const [rankSelected, setRankSelected] = useState<RankInterface>(
		// Defaults to Rank: 'Unranked' which is the first option
		{
			id: 'a4938a79-f11f-4ee1-9ec5-7741a12c4ef9',
			rankName: 'Unranked',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/3/38/Season_2019_-_Unranked.png/revision/latest/scale-to-width-down/130?cb=20190908074432',
		}
	);
	const handleRankSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const getRank = ranks.find(
			(rank: RankInterface) => rank.id === e.target.value
		);

		if (!getRank) {
			return;
		} else {
			setRankSelected(getRank);
		}
	};

	// Handler for setBuild()
	useEffect(() => {
		setBuild((prev: any) => {
			return { ...prev, username, rank: rankSelected };
		});
	}, [username, rankSelected]);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>7. Username</p>
					<input
						type='text'
						placeholder='Username'
						onChange={(e) => handleUsernameChange(e)}
						style={{ width: '100%' }}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>8. Rank</p>

					<Box>
						<LazyLoadImage
							src={`/images/wildriftranks/${rankSelected.id}.png`}
							style={{ width: '100px' }}
						/>

						{
							<FormControl className={formControl}>
								<InputLabel shrink htmlFor='rank-select'>
									Rank
								</InputLabel>
								<NativeSelect
									onChange={handleRankSelectChange}
									inputProps={{
										name: 'rank',
										id: 'rank-select',
									}}
								>
									{ranks.map(({ id, rankName, url }: RankInterface, index) => {
										return (
											<option key={index} value={id}>
												{rankName}
											</option>
										);
									})}
								</NativeSelect>
								<FormHelperText>Select your rank</FormHelperText>
							</FormControl>
						}
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default PlayerInformation;
