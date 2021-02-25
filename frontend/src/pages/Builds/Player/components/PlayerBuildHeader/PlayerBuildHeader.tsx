import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { BuildInterface } from '../../../../../utils/interfaces';

type PlayerBuildHeaderProps = {
	build: BuildInterface;
};

const PlayerBuildHeader = (props: PlayerBuildHeaderProps) => {
	const { build } = props;
	const { buildTitle, buildRole, champion, rank, spells, username } = build;

	let roleToDisplay;

	switch (buildRole) {
		case 'Jungle':
			roleToDisplay = 'e4cbdb64-7118-436b-b0c6-89388731aeb5';
			break;
		case 'Support':
			roleToDisplay = '35b924df-6d60-4cc5-82a8-4e5dc85272a0';
			break;
		case 'Top':
			roleToDisplay = '53f90d2a-d970-41ec-8d5c-f8775580ad7e';
			break;
		case 'Middle':
			roleToDisplay = '6b7ca1d8-872a-4c54-b685-720e14251941';
			break;
		case 'Bottom':
			roleToDisplay = 'e3f90603-6452-4c33-afe6-466a69b6095b';
			break;
	}

	return (
		<Grid
			container
			wrap='nowrap'
			spacing={2}
			style={{ margin: '20px 0 40px 0' }}
		>
			<Grid item>
				<LazyLoadImage
					src={`/images/wildriftchampions/${champion.id}.jpg`}
					title={champion.championName}
					style={{ width: '80%', float: 'left', marginRight: '20px' }}
				/>
			</Grid>
			<Grid item xs>
				<Box>
					<span
						style={{
							color: '#517ebd',
							fontWeight: 'bold',
							fontSize: '36px',
							margin: 0,
							padding: 0,
						}}
					>
						{champion.championName}
					</span>
					<LazyLoadImage
						src={`/images/wildriftroles/${roleToDisplay}.png`}
						style={{ width: '26px', marginLeft: '10px' }}
						title={buildRole}
					/>

					<Typography variant='body1'>
						<p
							style={{
								margin: 0,
								fontWeight: 'bold',
								fontSize: '20px',
								color: '#CFCFCF',
							}}
						>
							{buildTitle}
						</p>
						<span style={{ color: '#CFCFCF' }}>by</span>{' '}
						<span style={{ color: '#FFB84D' }}>{username}</span>
						{/* <Avatar
							style={{
								// backgroundColor: '#232831',
								width: '40px',
							}}
						>
							<LazyLoadImage
								src={`/images/wildriftranks/${build.rank.id}.png`}
								style={{ width: '80%' }}
								title={rank.rankName}
							/>
						</Avatar> */}
					</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

export default PlayerBuildHeader;
