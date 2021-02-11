const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); // Express application is imported

// The express application is wrapped inside the supertest function (called superagent object)
// Tests can use this 'api' variable for making HTTP requests to the backend
const api = supertest(app);

const Build = require('../models/Build');

// To run tests for THIS FILE ONLY,
// npm test -- tests/build.test.js

// To run a SPECIFIC TEST ONLY, 
// npm test -- -t 'There should be 5 items returned'

// To run a DESCRIBE BLOCK ONLY
// npm test -- -t 'Check for DUPLICATED items'

const initialBuilds = [
	{
		items: [
			{
				id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
				itemName: 'Abyssal Mask',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/abyssalmask_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: [
					'+300 Max Health',
					'+40 Magic Resistance',
					'+300 Max Mana',
					'+10 Ability Haste',
				],
				description: [
					'Eternity: Restore Mana equal to 15% of the damage taken from champions. Regen Health equal to 20% of Mana spent. Capped at 25 Health per cast.',
					'Abyssal: Nearby enemy champions take 15% bonus magic damage.',
				],
				type: 'primary',
			},
			{
				id: '736b4258-0328-4912-b5cb-ac5c03b289dd',
				itemName: "Archangel's Staff",
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/archangelsstaff_wild_rift.png',
				category: 'magic',
				tier: 'upgraded',
				statistics: ['+35 Ability Power', '+500 Max Mana', '+25 Ability Haste'],
				description: [
					'Awe: Grants Ability Power equal to 1% of max Mana and refunds 25% of all Mana spent.',
					'Mana Charge: Increases max Mana by 12 every time mana is spent. Caps at 700 bonus Mana, transforming Archangel’s Staff into Seraph’s Embrace. Triggers up to 3 times every 12 seconds. You may only carry one Tears of the Goddess item at a time.',
					'Lifeline: (additional passve granted when the item transform into Seraph’s embrace.) Damage that puts you under 35% Health consumes 15% of your current Mana to grant a shield equal to that amount +150 for 2 seconds. (90s Cooldown)',
				],
				type: 'primary',
			},
			{
				id: 'ff11137c-d8bc-4363-b01e-fa1ed781fef7',
				itemName: 'Blasting Wand',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/blastingwand_wild_rift.png',
				category: 'magic',
				tier: 'mid',
				statistics: ['+45 Ability Power'],
				type: 'primary',
			},
			{
				id: 'b64ce612-424e-483c-8c5e-ea381a55f638',
				itemName: 'Black Cleaver',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/blackcleaver.png',
				category: 'physical',
				tier: 'upgraded',
				statistics: [
					'+350 Max Health',
					'+30 Attack Damage',
					'+25 Ability Haste',
				],
				description: [
					'Sunder: Dealing physical damage to a champion reduces their Armor by 4% for 6 seconds, stacking 6 times for 24% reduction.',
					'Rage: Attacks grant 20 Move Speed and kills grant 60 Move Speed for 2 seconds. Bonuses do not stack. Ranged champions gain halved values.',
				],
				type: 'primary',
			},
			{
				id: 'ed4cb95a-f5f3-46bc-a5cb-2c89e18922ab',
				itemName: 'Haunting Guise',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/hauntingguise_wild_rift.png',
				category: 'magic',
				tier: 'mid',
				statistics: ['+200 Max Health', '+35 Ability Power'],
				description: [
					'Madness: Deal 2% more damage for each secon in combat against champions, capped at 10% after 5 seconds.',
				],
				type: 'primary',
			},
			{
				id: '5b28a218-06f0-41f1-a05b-3a539beaa091',
				itemName: 'Lich Bane',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/lichbane.png',
				category: 'magic',
				tier: 'upgraded',
				statistics: ['+80 Ability Power', '+300 Max Mana', '+10 Ability Haste'],
				description: [
					'Spellblade: Using an ability causes the next attack used within 10 seconds to deal bonus magic damage equal to 75% base AD + 50% AP. (1.5s Cooldown) Damage is reduced vs. structures.',
					'Bane: +5% Move Speed',
				],
				type: 'primary',
			},
			{
				id: '28759de0-3f55-4afe-b31a-3ce6e8e38532',
				itemName: "Rylai's Crystal Scepter",
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/rylaiscrystalscepter_wild_rift.png',
				category: 'magic',
				tier: 'upgraded',
				statistics: ['+350 Max Health', '+70 Ability Power'],
				description: [
					'Icy: Damaging active abilities and empowered attacks slow enemies by 20% for 1 second.',
				],
				type: 'optional',
			},
		],
		spells: [
			{
				id: '13e5a25d-0de7-4481-bf75-381c013e73b9',
				spellName: 'Exhaust',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/exhaust.jpg',
				description: [
					'Exhausts target enemy champion, reducing their movement speed by 20% and their damage dealt by 40% for 2.5 seconds.',
				],
				cooldown: '105',
			},
			{
				id: 'dd6ff556-3b07-4be0-bd1f-c2dd9c9ce1dd',
				spellName: 'Flash',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/flash.jpg',
				description: [
					'Teleport a short distance forward or towards the aimed direction.',
				],
				cooldown: '150',
			},
		],
		dateSubmitted: '2021-02-09T09:11:36.126+00:00',
		username: 'Michael',
		champion: {
			id: '5a05e0d6-9c06-44af-9df9-a1fad5a2e427',
			championName: 'Akali',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Akali_wild_rift.png',
		},
		rank: {
			id: '0e62f6a2-1473-4885-a09f-ca0a59be0c8a',
			rankName: 'Challenger',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png/revision/latest/scale-to-width-down/130?cb=20181229234913',
		},
		runes: {
			keystone: {
				id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
				runeName: 'Aery',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
				type: 'keystone',
				description: [
					'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
					'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
					'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
				],
			},
			domination: {
				id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
				runeName: 'Brutal',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
				type: 'secondary',
				path: 'domination',
				description: [
					'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
				],
			},
			resolve: {
				id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
				runeName: 'Backbone',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
				type: 'secondary',
				path: 'resolve',
				description: [
					'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
				],
			},
			inspiration: {
				id: '80216900-b198-4195-ab1c-e6e309c28ff3',
				runeName: 'Hunter - Genius',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
				type: 'secondary',
				path: 'inspiration',
				description: [
					'Gain 2.5 Ability Haste.',
					'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
				],
			},
		},
	},
	{
		items: [
			{
				id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
				itemName: 'Abyssal Mask',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/abyssalmask_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: [
					'+300 Max Health',
					'+40 Magic Resistance',
					'+300 Max Mana',
					'+10 Ability Haste',
				],
				description: [
					'Eternity: Restore Mana equal to 15% of the damage taken from champions. Regen Health equal to 20% of Mana spent. Capped at 25 Health per cast.',
					'Abyssal: Nearby enemy champions take 15% bonus magic damage.',
				],
				type: 'primary',
			},
			{
				id: 'a00c4098-bbd3-423a-9dd6-9dd1ad49c0dd',
				itemName: "Bami's Cinder",
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/bamiscinder_wild_rift.png',
				category: 'defense',
				tier: 'mid',
				statistics: ['+250 Max Health'],
				description: [
					'Immolate: Deals 25-40 magic damage per second to nearby enemies. Deals 50% bonus damage to minions and monsters.',
				],
				type: 'primary',
			},
			{
				id: '259d861d-fd0f-4913-a8cf-a806e35ea1bb',
				itemName: 'Fiendish Codex',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/fiendishcodex_wild_rift.png',
				category: 'magic',
				tier: 'mid',
				statistics: ['+35 Ability Power', '+10 Ability Haste'],
				type: 'primary',
			},
			{
				id: '02152b6f-2d25-4cec-90f5-b82bec5953bb',
				itemName: 'Iceborn Gauntlet',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/iceborngauntlet_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: ['+50 Armor', '+450 Max Mana', '+25 Ability Haste'],
				description: [
					'Spellblade: Using an ability causes the next attack used within 10 seconds to deal bonus physical damage equal to 100% base AD in an area. It also creates an icy field for 2 seconds that slows enemies inside by 30%. Armor increases the size of the ice field. (1.5s Cooldown) Damage is reduced vs. structures.',
				],
				type: 'primary',
			},
			{
				id: '086049f3-d76f-4eb6-96bd-e0083a4a3f5a',
				itemName: 'Dagger',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/dagger_wild_rift.png',
				category: 'physical',
				tier: 'basic',
				statistics: ['+15% Attack Speed'],
				type: 'primary',
			},
			{
				id: '3dda6dad-0a78-4d60-99ef-e920785af2b2',
				itemName: 'Oblivion Orb',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/oblivionorb_wild_rift.png',
				category: 'magic',
				tier: 'mid',
				statistics: ['+125 Max Health', '+25 Ability Power'],
				description: ['Death Touch: +15 Magic Penetration'],
				type: 'primary',
			},
		],
		spells: [
			{
				id: 'dd6ff556-3b07-4be0-bd1f-c2dd9c9ce1dd',
				spellName: 'Flash',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/flash.jpg',
				description: [
					'Teleport a short distance forward or towards the aimed direction.',
				],
				cooldown: '150',
			},
			{
				id: 'aeb37ecd-ccb5-41fc-ad9c-c9b6bef39e34',
				spellName: 'Ignite',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/ignite.jpg',
				description: [
					'Ignites target enemy champion, dealing 60−410 (based on level) true damage over 5 seconds and inflincting them with Grievous Wounds.',
					'Grievous Wounds reduces healing effects by 50%',
				],
				cooldown: '90',
			},
		],
		dateSubmitted: '2021-02-09T09:12:23.028+00:00',
		username: 'Slomoose',
		champion: {
			id: '626c90aa-36e2-441a-8cba-b909281306f8',
			championName: 'Ezreal',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Ezreal_wild_rift.png',
		},
		rank: {
			id: '21effcae-a056-45b1-aac0-38b8960fd301',
			rankName: 'Platinum',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png/revision/latest/scale-to-width-down/130?cb=20181229234932',
		},
		runes: {
			keystone: {
				id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
				runeName: 'Aery',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
				type: 'keystone',
				description: [
					'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
					'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
					'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
				],
			},
			domination: {
				id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
				runeName: 'Brutal',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
				type: 'secondary',
				path: 'domination',
				description: [
					'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
				],
			},
			resolve: {
				id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
				runeName: 'Backbone',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
				type: 'secondary',
				path: 'resolve',
				description: [
					'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
				],
			},
			inspiration: {
				id: '80216900-b198-4195-ab1c-e6e309c28ff3',
				runeName: 'Hunter - Genius',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
				type: 'secondary',
				path: 'inspiration',
				description: [
					'Gain 2.5 Ability Haste.',
					'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
				],
			},
		},
	},
	{
		items: [
			{
				id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
				itemName: 'Abyssal Mask',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/abyssalmask_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: [
					'+300 Max Health',
					'+40 Magic Resistance',
					'+300 Max Mana',
					'+10 Ability Haste',
				],
				description: [
					'Eternity: Restore Mana equal to 15% of the damage taken from champions. Regen Health equal to 20% of Mana spent. Capped at 25 Health per cast.',
					'Abyssal: Nearby enemy champions take 15% bonus magic damage.',
				],
				type: 'primary',
			},
			{
				id: '4836a904-52b4-4d84-94c3-6799db927ff7',
				itemName: 'Blade of the Ruined King',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/bladeoftheruinedking_wild_rift.png',
				category: 'physical',
				tier: 'upgraded',
				statistics: ['+30 Attack Damage', '+30% Attack Speed'],
				description: [
					'Thirst: +10% Physical Vamp.',
					"Ruined Strikes: Attacks deal bonus physical damage equal to 6% of the enemy's current Health. Deals at least 15 damage, and against monsters deals a max of 60 damage.",
					'Drain: Hitting a champion with 3 attacks or abilities deals 30-100 magic damage and steals 25% of their move speed for 3 seconds. (60s Cooldown)',
				],
				type: 'primary',
			},
			{
				id: 'c2e92377-15f4-4579-bfa3-59353274c643',
				itemName: "Jaurim's Fist",
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/jaurimsfist_wild_rift.png',
				category: 'defense',
				tier: 'mid',
				statistics: ['+200 Max Health', '+15 Attack Damage'],
				type: 'primary',
			},
			{
				id: '1120090e-2528-456f-b6bb-1e5c2f5b8c96',
				itemName: 'Negatron Cloak',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/negatroncloak_wild_rift.png',
				category: 'defense',
				tier: 'mid',
				statistics: ['+40 Magic Resistance'],
				type: 'primary',
			},
			{
				id: '4699809c-2b88-4f83-b24d-58fd628f11e9',
				itemName: 'Protobelt Enchant',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/protobeltenchant_wild_rift.png',
				category: 'boots',
				tier: 'enchantment',
				statistics: ['Protobelt Active'],
				description: [
					'Protobelt (Active): Dash forward and unleash a cone of missiles that deal 75-145 magic damage. If champions or monsters are hit by more than one missile, the additional missiles deal only 10% damage. (60s Cooldown)',
				],
				type: 'primary',
			},
			{
				id: '71502b33-9258-4489-9077-65286ff26f39',
				itemName: "Liandry's Torment",
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/liandrystorment_wild_rift.png',
				category: 'magic',
				tier: 'upgraded',
				statistics: ['+250 Max Health', '+90 Ability Power'],
				description: [
					'Madness: Deals 2% more damage for each second in combat against champions, capped at 10% after 5 seconds.',
					'Torment: Damaging abilities and empowered attacks deal 1% of an enemy’s max Health as bonus magic damage over 3 seconds. This damage doubles if they are slowed or immobilized.',
				],
				type: 'primary',
			},
			{
				id: '5b28a218-06f0-41f1-a05b-3a539beaa091',
				itemName: 'Lich Bane',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/lichbane.png',
				category: 'magic',
				tier: 'upgraded',
				statistics: ['+80 Ability Power', '+300 Max Mana', '+10 Ability Haste'],
				description: [
					'Spellblade: Using an ability causes the next attack used within 10 seconds to deal bonus magic damage equal to 75% base AD + 50% AP. (1.5s Cooldown) Damage is reduced vs. structures.',
					'Bane: +5% Move Speed',
				],
				type: 'optional',
			},
			{
				id: '602849f1-9432-45b6-b780-a2b6a1be5ae7',
				itemName: 'Amplifying Tome',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/amplifyingtome_wild_rift.png',
				category: 'magic',
				tier: 'basic',
				statistics: ['+25 Ability Power'],
				type: 'optional',
			},
		],
		spells: [
			{
				id: 'edbd4a33-514a-4334-8e61-01c296b8a767',
				spellName: 'Barrier',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/shield.jpg',
				description: [
					'Gain a shield that absorbs 115−465 (based on level) damage for 2 seconds.',
				],
				cooldown: '90',
			},
			{
				id: '13e5a25d-0de7-4481-bf75-381c013e73b9',
				spellName: 'Exhaust',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/exhaust.jpg',
				description: [
					'Exhausts target enemy champion, reducing their movement speed by 20% and their damage dealt by 40% for 2.5 seconds.',
				],
				cooldown: '105',
			},
		],
		dateSubmitted: '2021-02-09T11:21:23.860+00:00',
		username: 'Tric',
		champion: {
			id: 'da46dd41-8225-4895-9e74-e099fa893b1e',
			championName: 'Darius',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Darius_wild_rift.png',
		},
		rank: {
			id: '5de35075-6090-4f95-91f6-8dd43d847fae',
			rankName: 'Diamond',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png/revision/latest/scale-to-width-down/130?cb=20181229234917',
		},
		runes: {
			keystone: {
				id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
				runeName: 'Aery',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
				type: 'keystone',
				description: [
					'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
					'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
					'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
				],
			},
			domination: {
				id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
				runeName: 'Brutal',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
				type: 'secondary',
				path: 'domination',
				description: [
					'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
				],
			},
			resolve: {
				id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
				runeName: 'Backbone',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
				type: 'secondary',
				path: 'resolve',
				description: [
					'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
				],
			},
			inspiration: {
				id: '80216900-b198-4195-ab1c-e6e309c28ff3',
				runeName: 'Hunter - Genius',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
				type: 'secondary',
				path: 'inspiration',
				description: [
					'Gain 2.5 Ability Haste.',
					'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
				],
			},
		},
	},
	{
		items: [
			{
				id: '349f8ff7-22fa-4d56-9eb8-5b42ec66b41a',
				itemName: 'Adaptive Helm',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: [
					'+300 Max Health',
					'+100% Health Regen',
					'+60 Magic Resistance',
				],
				description: [
					'Adaptive: Taking magic damage reduces all subsequent magic damage from that same ability or effect by 15% for 4 seconds.',
				],
				type: 'primary',
			},
			{
				id: '94e8b484-a47f-4675-bc86-47f903e3301e',
				itemName: 'Awakened Soulstealer',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/awakenedsoulstealer_wild_rift.png',
				category: 'magic',
				tier: 'upgraded',
				statistics: ['+65 Ability Power', '+200 Max Mana', '+25 Ability Haste'],
				description: [
					'Soul Charged: Unique takedowns reduce the cooldown of your ultimate by 3%, capping at 15% after 5 stacks.',
				],
				type: 'primary',
			},
			{
				id: 'a55251fd-f697-4c88-9503-3d6f45d4b557',
				itemName: 'Hexdrinker',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/hexdrinker_wild_rift.png',
				category: 'defense',
				tier: 'mid',
				statistics: ['+15 Attack Damage', '+30 Magic Resistance'],
				description: [
					'Lifeline: Magic damage that puts you under 35% Health grants a shield that absorbs 350 magic damage for 5 seconds. (90s Cooldown)',
				],
				type: 'primary',
			},
		],
		spells: [
			{
				id: 'dd6ff556-3b07-4be0-bd1f-c2dd9c9ce1dd',
				spellName: 'Flash',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/flash.jpg',
				description: [
					'Teleport a short distance forward or towards the aimed direction.',
				],
				cooldown: '150',
			},
			{
				id: 'edbd4a33-514a-4334-8e61-01c296b8a767',
				spellName: 'Barrier',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/shield.jpg',
				description: [
					'Gain a shield that absorbs 115−465 (based on level) damage for 2 seconds.',
				],
				cooldown: '90',
			},
		],
		dateSubmitted: '2021-02-09T11:21:47.136+00:00',
		username: 'yy',
		champion: {
			id: '48ca031a-d92e-44e6-b7b6-f3eb1dbe644c',
			championName: 'Ahri',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Ahri_wild_rift.png',
		},
		rank: {
			id: 'a4938a79-f11f-4ee1-9ec5-7741a12c4ef9',
			rankName: 'Unranked',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/3/38/Season_2019_-_Unranked.png/revision/latest/scale-to-width-down/130?cb=20190908074432',
		},
		runes: {
			keystone: {
				id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
				runeName: 'Aery',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
				type: 'keystone',
				description: [
					'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
					'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
					'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
				],
			},
			domination: {
				id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
				runeName: 'Brutal',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
				type: 'secondary',
				path: 'domination',
				description: [
					'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
				],
			},
			resolve: {
				id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
				runeName: 'Backbone',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
				type: 'secondary',
				path: 'resolve',
				description: [
					'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
				],
			},
			inspiration: {
				id: '80216900-b198-4195-ab1c-e6e309c28ff3',
				runeName: 'Hunter - Genius',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
				type: 'secondary',
				path: 'inspiration',
				description: [
					'Gain 2.5 Ability Haste.',
					'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
				],
			},
		},
	},
	{
		items: [
			{
				id: '179e07c3-a43f-4199-858c-ea8db01ef237',
				itemName: 'Frozen Mallet',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/frozenmallet_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: ['+550 Max Health', '+25 Attack Damage'],
				description: [
					'Icy: Attacks slow enemies by 40% for 1.5 seconds. Slow amount halved for ranged attacks 20%.',
				],
				type: 'optional',
			},
			{
				id: '25951bf7-d059-45d5-a184-48493aa47b91',
				itemName: 'Duskblade of Draktharr',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/duskbladeofdraktharr_wild_rift.png',
				category: 'physical',
				tier: 'upgraded',
				statistics: ['+50 Attack Damage', '+10 Ability Haste'],
				description: [
					'Razor: +15 Armor Penetration.',
					'Nightstalker: Being unseen for 1 second causes your next attack against a champion to deal 20-125 bonus physical damage and slows them by 99% for 0.25 seconds. Buff last for 5 seconds and ranged attacks do not slow.',
				],
				type: 'optional',
			},
			{
				id: '8035d2ed-f46d-472e-bd4f-d5866457dbbf',
				itemName: 'Locket Enchant',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/locketenchant_wild_rift.png',
				category: 'boots',
				tier: 'enchantment',
				statistics: ['Locket Active'],
				description: [
					'Locket (Active): Shield yourself and all nearby allied champions from 140-420 damage for 2.5 seconds. (60s Cooldown)',
					'Locket shield effect is reduced by 50% if the target has been affected by another Locket in the last 20 seconds.',
				],
				type: 'optional',
			},
			{
				id: '3227b18e-1520-4ce8-9220-310cddc20ca6',
				itemName: "Luden's Echo",
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/ludensecho_wild_rift.png',
				category: 'magic',
				tier: 'upgraded',
				statistics: ['+80 Ability Power', '+300 Max Mana', '+10 Ability Haste'],
				description: [
					'Discordic Echo: Moving and casting abilities builds Discord. At 100 Discord your next damaging ability or empowered attack deals 100 bonus magic damge +10% AP to your target and up to 3 nearby enemies.',
				],
				type: 'optional',
			},
			{
				id: '3ef8fbc0-f253-46f7-9ce5-e9f15bec5e4c',
				itemName: 'Lost Chapter',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/lostchapter_wild_item.png',
				category: 'magic',
				tier: 'mid',
				statistics: ['+30 Ability Power', '+150 Max Mana'],
				description: ['Haste: +10% Cooldown Reduction.'],
				type: 'optional',
			},
		],
		spells: [
			{
				id: '7d210b90-b9bb-401d-a68b-e9ee0d083be7',
				spellName: 'Heal',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/heal.jpg',
				description: [
					'Restore 80−360 (based on level) health and grants 30% bonus movement speed for 1 second to you and the most wounded nearby ally champion.',
					'Healing is halved for champions recently affected by Heal.',
				],
				cooldown: '120',
			},
			{
				id: 'edbd4a33-514a-4334-8e61-01c296b8a767',
				spellName: 'Barrier',
				url:
					'/uploads/league-of-legends-wild-rift/images/summoner-spells/shield.jpg',
				description: [
					'Gain a shield that absorbs 115−465 (based on level) damage for 2 seconds.',
				],
				cooldown: '90',
			},
		],
		dateSubmitted: '2021-02-09T11:22:10.730+00:00',
		username: 't',
		champion: {
			id: '48ca031a-d92e-44e6-b7b6-f3eb1dbe644c',
			championName: 'Ahri',
			url:
				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Ahri_wild_rift.png',
		},
		rank: {
			id: 'a4938a79-f11f-4ee1-9ec5-7741a12c4ef9',
			rankName: 'Unranked',
			url:
				'https://static.wikia.nocookie.net/leagueoflegends/images/3/38/Season_2019_-_Unranked.png/revision/latest/scale-to-width-down/130?cb=20190908074432',
		},
		runes: {
			keystone: {
				id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
				runeName: 'Aery',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
				type: 'keystone',
				description: [
					'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
					'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
					'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
				],
			},
			domination: {
				id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
				runeName: 'Brutal',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
				type: 'secondary',
				path: 'domination',
				description: [
					'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
				],
			},
			resolve: {
				id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
				runeName: 'Backbone',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
				type: 'secondary',
				path: 'resolve',
				description: [
					'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
				],
			},
			inspiration: {
				id: '80216900-b198-4195-ab1c-e6e309c28ff3',
				runeName: 'Hunter - Genius',
				url:
					'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
				type: 'secondary',
				path: 'inspiration',
				description: [
					'Gain 2.5 Ability Haste.',
					'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
				],
			},
		},
	},
];

// Clear out the database before each test,
// then save the builds stored in initialBuilds array to the database.
// Doing this, we ENSURE that the database is in the SAME STATE before every test is run.
beforeEach(async () => {
	await Build.deleteMany({});
	console.log('Cleared Database');

	const buildObjects = initialBuilds.map(build => new Build(build));
	const promiseArray = buildObjects.map(build => build.save());

	await Promise.all(promiseArray);

});

describe('Check for DUPLICATED items', () => {
	test('Duplicate Items', () => {
		const duplicatedItems = [
			{
				id: '349f8ff7-22fa-4d56-9eb8-5b42ec66b41a',
				itemName: 'Adaptive Helm',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: [
					'+300 Max Health',
					'+100% Health Regen',
					'+60 Magic Resistance',
				],
				description: [
					'Adaptive: Taking magic damage reduces all subsequent magic damage from that same ability or effect by 15% for 4 seconds.',
				],
			},
			{
				id: '349f8ff7-22fa-4d56-9eb8-5b42ec66b41a',
				itemName: 'Adaptive Helm',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: [
					'+300 Max Health',
					'+100% Health Regen',
					'+60 Magic Resistance',
				],
				description: [
					'Adaptive: Taking magic damage reduces all subsequent magic damage from that same ability or effect by 15% for 4 seconds.',
				],
			},
		];

		var itemArray = duplicatedItems.map((item) => {
			return item.id;
		});
		var isDuplicate = itemArray.some((item, index) => {
			return itemArray.indexOf(item) != index;
		});

		expect(isDuplicate).toBe(true);
	});

	test('NO Duplicate Items', () => {
		const notDuplicatedItems = [
			{
				id: '349f8ff7-22fa-4d56-9eb8-5b42ec66b41a',
				itemName: 'Adaptive Helm',
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/adaptivehelm_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: [
					'+300 Max Health',
					'+100% Health Regen',
					'+60 Magic Resistance',
				],
				description: [
					'Adaptive: Taking magic damage reduces all subsequent magic damage from that same ability or effect by 15% for 4 seconds.',
				],
			},
			{
				id: '16ae2a26-acc0-415b-adf7-7865cb43c822',
				itemName: "Dead Man's Plate",
				url:
					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/deadmansplate_wild_rift.png',
				category: 'defense',
				tier: 'upgraded',
				statistics: ['+300 Max Health', '+50 Armor'],
				description: [
					'Momentum: Moving builds Momentum, granting a max of 50 Move Speed at 100 stacks. Attacks expend all Momentum to deal bonus magic damage equal to the number of stacks. Momentum decays while movement is impaired.',
					'Crushing Blow: Melee Attacks that expend max Momentum also slow by 50% by 1 seconds.',
				],
			},
		];

		var itemArray = notDuplicatedItems.map((item) => {
			return item.id;
		});
		var isDuplicate = itemArray.some((item, index) => {
			return itemArray.indexOf(item) != index;
		});

		expect(isDuplicate).toBe(false);
	});
});

// test('A valid build can be added', async () => {
// 	const newBuild = {
// 		items: [
// 			{
// 				id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
// 				itemName: 'Abyssal Mask',
// 				url:
// 					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/abyssalmask_wild_rift.png',
// 				category: 'defense',
// 				tier: 'upgraded',
// 				statistics: [
// 					'+300 Max Health',
// 					'+40 Magic Resistance',
// 					'+300 Max Mana',
// 					'+10 Ability Haste',
// 				],
// 				description: [
// 					'Eternity: Restore Mana equal to 15% of the damage taken from champions. Regen Health equal to 20% of Mana spent. Capped at 25 Health per cast.',
// 					'Abyssal: Nearby enemy champions take 15% bonus magic damage.',
// 				],
// 				type: 'primary',
// 			},
// 			{
// 				id: '736b4258-0328-4912-b5cb-ac5c03b289dd',
// 				itemName: "Archangel's Staff",
// 				url:
// 					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/archangelsstaff_wild_rift.png',
// 				category: 'magic',
// 				tier: 'upgraded',
// 				statistics: ['+35 Ability Power', '+500 Max Mana', '+25 Ability Haste'],
// 				description: [
// 					'Awe: Grants Ability Power equal to 1% of max Mana and refunds 25% of all Mana spent.',
// 					'Mana Charge: Increases max Mana by 12 every time mana is spent. Caps at 700 bonus Mana, transforming Archangel’s Staff into Seraph’s Embrace. Triggers up to 3 times every 12 seconds. You may only carry one Tears of the Goddess item at a time.',
// 					'Lifeline: (additional passve granted when the item transform into Seraph’s embrace.) Damage that puts you under 35% Health consumes 15% of your current Mana to grant a shield equal to that amount +150 for 2 seconds. (90s Cooldown)',
// 				],
// 				type: 'primary',
// 			},
// 			{
// 				id: 'ff11137c-d8bc-4363-b01e-fa1ed781fef7',
// 				itemName: 'Blasting Wand',
// 				url:
// 					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/blastingwand_wild_rift.png',
// 				category: 'magic',
// 				tier: 'mid',
// 				statistics: ['+45 Ability Power'],
// 				type: 'primary',
// 			},
// 			{
// 				id: 'b64ce612-424e-483c-8c5e-ea381a55f638',
// 				itemName: 'Black Cleaver',
// 				url:
// 					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/blackcleaver.png',
// 				category: 'physical',
// 				tier: 'upgraded',
// 				statistics: [
// 					'+350 Max Health',
// 					'+30 Attack Damage',
// 					'+25 Ability Haste',
// 				],
// 				description: [
// 					'Sunder: Dealing physical damage to a champion reduces their Armor by 4% for 6 seconds, stacking 6 times for 24% reduction.',
// 					'Rage: Attacks grant 20 Move Speed and kills grant 60 Move Speed for 2 seconds. Bonuses do not stack. Ranged champions gain halved values.',
// 				],
// 				type: 'primary',
// 			},
// 			{
// 				id: 'ed4cb95a-f5f3-46bc-a5cb-2c89e18922ab',
// 				itemName: 'Haunting Guise',
// 				url:
// 					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/hauntingguise_wild_rift.png',
// 				category: 'magic',
// 				tier: 'mid',
// 				statistics: ['+200 Max Health', '+35 Ability Power'],
// 				description: [
// 					'Madness: Deal 2% more damage for each secon in combat against champions, capped at 10% after 5 seconds.',
// 				],
// 				type: 'primary',
// 			},
// 			{
// 				id: '5b28a218-06f0-41f1-a05b-3a539beaa091',
// 				itemName: 'Lich Bane',
// 				url:
// 					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/lichbane.png',
// 				category: 'magic',
// 				tier: 'upgraded',
// 				statistics: ['+80 Ability Power', '+300 Max Mana', '+10 Ability Haste'],
// 				description: [
// 					'Spellblade: Using an ability causes the next attack used within 10 seconds to deal bonus magic damage equal to 75% base AD + 50% AP. (1.5s Cooldown) Damage is reduced vs. structures.',
// 					'Bane: +5% Move Speed',
// 				],
// 				type: 'primary',
// 			},
// 			{
// 				id: '28759de0-3f55-4afe-b31a-3ce6e8e38532',
// 				itemName: "Rylai's Crystal Scepter",
// 				url:
// 					'https://lolwildriftbuild.com/wp-content/uploads/2020/10/rylaiscrystalscepter_wild_rift.png',
// 				category: 'magic',
// 				tier: 'upgraded',
// 				statistics: ['+350 Max Health', '+70 Ability Power'],
// 				description: [
// 					'Icy: Damaging active abilities and empowered attacks slow enemies by 20% for 1 second.',
// 				],
// 				type: 'optional',
// 			},
// 		],
// 		spells: [
// 			{
// 				id: '13e5a25d-0de7-4481-bf75-381c013e73b9',
// 				spellName: 'Exhaust',
// 				url:
// 					'/uploads/league-of-legends-wild-rift/images/summoner-spells/exhaust.jpg',
// 				description: [
// 					'Exhausts target enemy champion, reducing their movement speed by 20% and their damage dealt by 40% for 2.5 seconds.',
// 				],
// 				cooldown: '105',
// 			},
// 			{
// 				id: 'dd6ff556-3b07-4be0-bd1f-c2dd9c9ce1dd',
// 				spellName: 'Flash',
// 				url:
// 					'/uploads/league-of-legends-wild-rift/images/summoner-spells/flash.jpg',
// 				description: [
// 					'Teleport a short distance forward or towards the aimed direction.',
// 				],
// 				cooldown: '150',
// 			},
// 		],
// 		dateSubmitted: '2021-02-09T09:11:36.126+00:00',
// 		username: 'Michael',
// 		champion: {
// 			id: '5a05e0d6-9c06-44af-9df9-a1fad5a2e427',
// 			championName: 'Akali',
// 			url:
// 				'https://lolwildriftbuild.com/wp-content/uploads/2020/10/Akali_wild_rift.png',
// 		},
// 		rank: {
// 			id: '0e62f6a2-1473-4885-a09f-ca0a59be0c8a',
// 			rankName: 'Challenger',
// 			url:
// 				'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png/revision/latest/scale-to-width-down/130?cb=20181229234913',
// 		},
// 		runes: {
// 			keystone: {
// 				id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
// 				runeName: 'Aery',
// 				url:
// 					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ce/Aery_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713114442',
// 				type: 'keystone',
// 				description: [
// 					'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
// 					'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
// 					'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
// 				],
// 			},
// 			domination: {
// 				id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
// 				runeName: 'Brutal',
// 				url:
// 					'https://static.wikia.nocookie.net/leagueoflegends/images/c/ca/Brutal_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102514',
// 				type: 'secondary',
// 				path: 'domination',
// 				description: [
// 					'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
// 				],
// 			},
// 			resolve: {
// 				id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
// 				runeName: 'Backbone',
// 				url:
// 					'https://static.wikia.nocookie.net/leagueoflegends/images/b/b2/Backbone_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102418',
// 				type: 'secondary',
// 				path: 'resolve',
// 				description: [
// 					'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
// 				],
// 			},
// 			inspiration: {
// 				id: '80216900-b198-4195-ab1c-e6e309c28ff3',
// 				runeName: 'Hunter - Genius',
// 				url:
// 					'https://static.wikia.nocookie.net/leagueoflegends/images/e/e7/Hunter_-_Genius_%28Wild_Rift%29_rune.png/revision/latest/scale-to-width-down/52?cb=20200713102756',
// 				type: 'secondary',
// 				path: 'inspiration',
// 				description: [
// 					'Gain 2.5 Ability Haste.',
// 					'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
// 				],
// 			},
// 		},
// 	}

// 	await api
// 		.post('/api/build/save')
// 		.send(newBuild)
// 		.expect(200)
// 		.expect('Content-Type', /application\/json/);

// 	const response = await api.post('/api/build/all', { page: 10 });

// 	expect(response.body).toHaveLength(1);
// })

describe('Check for returned data', () => {
	test('There should be 5 items returned', async () => {
		console.log('Entered test: There should be 5 items returned');
		const response = await api.post('/api/build/all', { page: 5 });

		expect(response.body)
			.toHaveLength(5);
	});

	test('Response Body should be type JSON', async () => {
		console.log('Entered test: Response Body should be type JSON');
		const response = await api.post('/api/build/all', { page: 5 })
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

})

afterAll(async () => {
	await mongoose.connection.close();
})