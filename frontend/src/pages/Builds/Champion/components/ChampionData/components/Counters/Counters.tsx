import React from 'react';
// @ts-ignore - No types for this module
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// react-tabs
import 'react-tabs/style/react-tabs.css';
// MaterialUI
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
// Components
// CSS
import styles from './counters.module.css';
// Types
type ChampionCounterType = {
	id: String;
	championName: String;
};
type CountersProps = {
	counters: {
		strongAgainst: Array<ChampionCounterType>;
		weakAgainst: Array<ChampionCounterType>;
	};
	championName: String;
};

const Counters = (props: CountersProps) => {
	const { counters, championName } = props;
	const { strongAgainst, weakAgainst } = counters;

	// For path='/builds/champion/:championName'
	const convertChampionNameToAlphabet = (champName: String) => {
		return champName
			.toLocaleLowerCase()
			.split(' ')
			.filter((char) => char !== '.' && char !== "'")
			.join('')
			.replace('.', '')
			.replace("'", '');
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
			}}
		>
			<Tabs style={{ width: '24rem' }}>
				{/* Can't use external CSS on <TabList> and <Tab> because it doesn't overwrite even with !important */}
				<TabList
					style={{
						backgroundColor: '#121212',
						border: 'none',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Tab
						style={{
							padding: '5px 10px',
							borderRadius: 0,
							width: '100%',
							textAlign: 'center',
							color: 'rgb(255,255,255, 60%)',
						}}
					>
						Weak against
					</Tab>
					<Tab
						style={{
							padding: '5px 10px',
							borderRadius: 0,
							width: '100%',
							textAlign: 'center',
							color: 'rgb(255,255,255, 60%)',
						}}
					>
						Strong against
					</Tab>
				</TabList>

				{/* Weak against */}
				<TabPanel style={{ marginTop: '20px', padding: '0 15px' }}>
					{weakAgainst.map((champ, index) => {
						const { id: championId, championName } = champ;
						const allAlphabetChampionName = convertChampionNameToAlphabet(
							championName
						);

						return (
							<a
								key={index}
								href={`/builds/champion/${allAlphabetChampionName}`}
								className={styles.championCounterLink}
							>
								<Box display='flex' className={styles.championCounterContainer}>
									<Box display='flex' flexGrow={1}>
										<Avatar
											variant='square'
											src={`/images/wildriftchampions/${championId}.jpg`}
											className={styles.championCounterImage}
										/>
										<span className={styles.championCounterName}>
											{championName}
										</span>
									</Box>
									<span className={styles.goToBuildText}>
										Builds
										<ArrowForwardIosIcon className={styles.goToBuildArrow} />
									</span>
								</Box>
							</a>
						);
					})}
				</TabPanel>

				{/* Strong against */}
				<TabPanel style={{ marginTop: '20px', padding: '0 15px' }}>
					{strongAgainst.map((champ, index) => {
						const { id: championId, championName } = champ;
						const allAlphabetChampionName = convertChampionNameToAlphabet(
							championName
						);

						return (
							<a
								key={index}
								href={`/builds/champion/${allAlphabetChampionName}`}
								className={styles.championCounterLink}
							>
								<Box display='flex' className={styles.championCounterContainer}>
									<Box display='flex' flexGrow={1}>
										<Avatar
											variant='square'
											src={`/images/wildriftchampions/${championId}.jpg`}
											className={styles.championCounterImage}
										/>
										<span className={styles.championCounterName}>
											{championName}
										</span>
									</Box>
									<span className={styles.goToBuildText}>
										Builds
										<ArrowForwardIosIcon className={styles.goToBuildArrow} />
									</span>
								</Box>
							</a>
						);
					})}
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default Counters;
