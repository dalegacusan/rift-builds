import React from 'react';

import { ItemType } from '../../../../shared/constants/constants';
import { RequiredLength } from '../../../../shared/constants/requiredLength';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import BuildDate from './BuildDate';
import BuildItem from './BuildItem';
import BuildRankUser from './BuildRankUser';
import BuildRune from './BuildRune';
import BuildSpell from './BuildSpell';
import Divider from '@material-ui/core/Divider';
// Types
import { BuildInterface } from '../../../../shared/interfaces/Build';
import { ItemInterface } from '../../../../shared/interfaces/GameData';
// CSS
import styles from './Styles.module.css';

type BuildBoxProps = {
	build: BuildInterface;
};

const BuildBox = (props: BuildBoxProps) => {
	const { build } = props;
	const { id: buildId, dateSubmitted, username } = build; // Strings
	const { champion, rank, runes, spells } = build; // Objects
	const { id: championId, championName } = champion;
	const { spellOne, spellTwo } = spells;
	const { itemsConfirmed } = build; // Arrays

	// Display primary items PLUS optional items (if primary items is less than 6)
	// Primary items are prioritized - meaning that only optional items are
	// going to be added and primary items will be displayed by default
	const buildItemsToDisplay = () => {
		const primaryItems = itemsConfirmed.filter(
			(item: ItemInterface) => item.type === ItemType.PRIMARY
		);
		const optionalItems = itemsConfirmed.filter(
			(item: ItemInterface) => item.type === ItemType.OPTIONAL
		);
		const numberOfOptionalItemsToAdd =
			RequiredLength.ITEMS.PRIMARY.MAX_LENGTH - primaryItems.length;

		const itemsToDisplay = [...primaryItems];

		// Check if length of primary items is less than max length of primary items
		// If TRUE, add one optional item at a time UNTIL it reaches the
		// calculated numberOfOptionalItemsToAdd
		if (primaryItems.length < RequiredLength.ITEMS.PRIMARY.MAX_LENGTH) {
			for (let i = 0; i < numberOfOptionalItemsToAdd; i++) {
				itemsToDisplay.push(optionalItems[i]);
			}
		}

		// Filters undefined because it's possible that the optionalItems length
		// is less than numberOfOptionalItemsToAdd
		return itemsToDisplay.filter((item: ItemInterface) => item !== undefined);
	};

	return (
		<>
			<a
				href={`/build/${buildId}`}
				target='_blank'
				rel='noreferrer'
				style={{ textDecoration: 'none' }}
			>
				<Grid
					container
					spacing={1}
					className={`${styles.buildBoxContainer} buildBoxContainer`}
				>
					{/* Date Submitted */}
					<Grid item xs sm className='buildBoxDateContainer'>
						<BuildDate dateSubmitted={dateSubmitted} />
					</Grid>
					{/* Champion Icon */}
					<Grid
						item
						container
						alignItems='center'
						xs={2}
						sm={1}
						className='buildBoxChampionImageContainer'
					>
						<img
							alt={championName}
							title={championName}
							src={`/images/wildriftchampions/${championId}.jpg`}
							className={styles.championImage}
						/>
					</Grid>

					{/* Items */}
					<Grid
						item
						container
						alignItems='center'
						xs={10}
						sm={4}
						className='buildBoxItemsContainer'
					>
						{buildItemsToDisplay().map((item, index) => {
							return <BuildItem key={index} item={item} />;
						})}
					</Grid>

					{/* Rune */}
					<Grid
						item
						container
						alignItems='center'
						xs={2}
						sm={1}
						className='buildBoxRuneContainer'
					>
						<BuildRune runes={runes} />
					</Grid>

					{/* Spells  */}
					<Grid
						item
						container
						alignItems='center'
						xs={4}
						sm
						className='buildBoxSpellContainer'
					>
						<BuildSpell spell={spellOne} />
						<BuildSpell spell={spellTwo} />
					</Grid>

					{/* Rank and Username */}
					<Grid
						item
						container
						alignItems='center'
						xs
						sm
						className='buildBoxRankUsernameContainer'
					>
						<BuildRankUser username={username} rank={rank} />
					</Grid>
				</Grid>
				<Divider variant='fullWidth' className={styles.divider} />
			</a>
		</>
	);
};

export default BuildBox;
