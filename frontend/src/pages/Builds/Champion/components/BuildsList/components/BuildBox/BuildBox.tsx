import React from 'react';

// MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// Components
import BuildDate from './components/BuildDate/BuildDate';
import BuildItem from './components/BuildItem/BuildItem';
import BuildLearnMoreButton from './components/BuildLearnMoreButton/BuildLearnMoreButton';
import BuildRankUser from './components/BuildRankUser/BuildRankUser';
import BuildRune from './components/BuildRune/BuildRune';
import BuildSpell from './components/BuildSpell/BuildSpell';
// Types
import { BuildInterface } from '../../../../../../../utils/interfaces';
// CSS
import styles from './buildbox.module.css';

type BuildBoxProps = {
	build: BuildInterface;
};

const BuildBox = (props: BuildBoxProps) => {
	const { build } = props;
	const { id: buildId, buildRole, buildTitle, dateSubmitted, username } = build; // Strings
	const { champion, rank, runes, spells } = build; // Objects
	const { id: championId, championName } = champion;
	const { id: rankId, rankName } = rank;
	const { domination, inspiration, keystone, resolve } = runes;
	const { spellOne, spellTwo } = spells;
	const { itemsConfirmed } = build; // Arrays

	return (
		<Grid
			container
			direction='row'
			justify='center'
			alignItems='center'
			className={styles.buildBoxContainer}
		>
			{/* Date Submitted */}
			<Grid item xs={2} sm={2}>
				<BuildDate dateSubmitted={dateSubmitted} />
			</Grid>

			{/* Champion Icon */}
			<Grid
				container
				item
				direction='row'
				justify='center'
				alignItems='center'
				xs={1}
				sm={1}
			>
				<Avatar
					alt={championName}
					title={championName}
					src={`/images/wildriftchampions/${championId}.jpg`}
				/>
			</Grid>

			{/* Items */}
			<Grid
				container
				item
				direction='row'
				justify='center'
				alignItems='center'
				xs={3}
				sm={3}
			>
				{itemsConfirmed
					.filter((item) => item.type === 'primary')
					.map((item, index) => {
						return <BuildItem key={index} item={item} />;
					})}
			</Grid>

			{/* Spells */}
			<Grid
				container
				item
				direction='row'
				justify='center'
				alignItems='center'
				xs={1}
				sm={1}
			>
				<BuildSpell spell={spellOne} />
				<BuildSpell spell={spellTwo} />
			</Grid>

			{/* Rune */}
			<Grid
				container
				item
				direction='row'
				justify='center'
				alignItems='center'
				xs={1}
				sm={1}
			>
				<BuildRune rune={keystone} />
			</Grid>

			{/* Rank and Username */}
			<Grid item xs={2} sm={2}>
				<BuildRankUser username={username} rank={rank} />
			</Grid>

			{/* Learn more Button */}
			<Grid
				container
				item
				direction='row'
				justify='flex-start'
				alignItems='center'
				xs={2}
				sm={2}
			>
				<BuildLearnMoreButton buildId={buildId} />
			</Grid>
		</Grid>
	);
};

export default BuildBox;
