import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MaterialUI
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

interface ItemInterface {
	id: string;
	itemName: string;
	reason?: string;
	url: string;
}

interface ChampionInterface {
	id: string;
	championName: string;
	url: string;
}

// https://flaviocopes.com/typescript-object-destructuring/

export default function Builds() {
	const [builds, setBuilds] = useState([]);

	useEffect(() => {
		axios.get('/api/build/all').then((res) => {
			const { data } = res;

			setBuilds(data.slice(0, 3));
		});
	}, []);

	return (
		<>
			{builds
				? builds.map((build) => {
						const {
							id: buildId,
							username,
							items,
							champion,
						}: {
							id: string;
							username: string;
							items: ItemInterface[];
							champion: ChampionInterface;
						} = build;
						const { id: championId, championName, url } = champion;

						return (
							<Card style={{ margin: '10px 0' }}>
								<CardContent>
									<Box>
										<img src={`/images/wildriftchampions/${championId}.png`} />
										<Typography>
											{championName} by {username}
										</Typography>
									</Box>
									{items.map((item) => {
										const { id: itemId, itemName, reason, url } = item;

										return (
											<Box style={{ display: 'inline-block' }}>
												<p>{itemName}</p>
												<img
													src={`/images/wildriftitems/${itemId}.png`}
													alt={championName}
												/>
												<p>Reason: {reason}</p>
											</Box>
										);
									})}
								</CardContent>
							</Card>
						);
				  })
				: null}
			<p>Builds</p>
		</>
	);
}
