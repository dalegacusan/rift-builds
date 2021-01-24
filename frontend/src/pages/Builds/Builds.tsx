import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

// MaterialUI
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

interface ItemInterface {
	id: string;
	itemName: string;
	reason?: string;
	type: string;
	url: string;
}

interface ChampionInterface {
	id: string;
	championName: string;
	url: string;
}

interface BuildInterface {
	id: string;
	username: string;
	champion: ChampionInterface;
	items: ItemInterface[];
}

// https://flaviocopes.com/typescript-object-destructuring/
let page = 5;

export default function Builds() {
	const [loading, setLoading] = useState(true);
	const [builds, setBuilds] = useState<Array<BuildInterface>>([]);

	useEffect(() => {
		axios
			.post('/api/build/all', {
				page,
			})
			.then((res) => {
				const { data } = res;

				setBuilds((prev: BuildInterface[]) => [...prev, ...data]);
			});
	}, []);

	const getMoreBuilds = async () => {
		page += 5;
		const getBuilds = await axios
			.post('/api/build/all', {
				page,
			})
			.then((res) => {
				const { data } = res;

				setBuilds((prev: BuildInterface[]) => [...prev, ...data]);
			});
	};

	return (
		<>
			<InfiniteScroll
				dataLength={builds.length}
				next={getMoreBuilds}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
				{builds.length !== 0 &&
					builds.map((build) => {
						const {
							id: buildId,
							username,
							items,
							champion,
						}: BuildInterface = build;
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
					})}
			</InfiniteScroll>
		</>
	);
}
