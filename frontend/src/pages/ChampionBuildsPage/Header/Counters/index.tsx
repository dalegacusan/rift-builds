import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { ImagePath } from '../../../../shared/utils/imagePath';

// MaterialUI
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
// Components
// CSS
import styles from './Styles.module.css';
// Types
type ChampionCounterType = {
	id: string;
	championName: string;
};
type CountersProps = {
	counters: {
		strongAgainst: Array<ChampionCounterType>;
		weakAgainst: Array<ChampionCounterType>;
	};
	championName: string;
};

const Counters = (props: CountersProps) => {
	const { counters } = props;
	const { strongAgainst, weakAgainst } = counters;

	// For path='/builds/champion/:championName'
	const convertChampionNameToAlphabet = (champName: string) => {
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
							<CounterContent
								key={index}
								championId={championId}
								allAlphabetChampionName={allAlphabetChampionName}
								championName={championName}
							/>
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
							<CounterContent
								key={index}
								championId={championId}
								allAlphabetChampionName={allAlphabetChampionName}
								championName={championName}
							/>
						);
					})}
				</TabPanel>
			</Tabs>
		</div>
	);
};

const CounterContent = (props: {
	championId: string;
	allAlphabetChampionName: string;
	championName: string;
}) => {
	const { championId, allAlphabetChampionName, championName } = props;

	return (
		<a
			href={`/builds/champion/${allAlphabetChampionName}`}
			className={styles.championCounterLink}
			title={championName}
		>
			<Box display='flex' className={styles.championCounterContainer}>
				<Box display='flex' flexGrow={1}>
					<Avatar
						variant='square'
						src={ImagePath.Champion(championId)}
						className={styles.championCounterImage}
					/>
					<span className={styles.championCounterName}>{championName}</span>
				</Box>
				<span className={styles.goToBuildText}>
					Builds
					<ArrowForwardIosIcon className={styles.goToBuildArrow} />
				</span>
			</Box>
		</a>
	);
};

export default Counters;
