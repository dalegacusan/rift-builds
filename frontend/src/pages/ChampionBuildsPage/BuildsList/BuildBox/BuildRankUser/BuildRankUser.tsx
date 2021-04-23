import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// CSS
import styles from './buildrankuser.module.css';
// Types
import { RankInterface } from '../../../../../shared/interfaces/GameData';
type BuildRankUserProps = {
	username: string;
	rank: RankInterface;
};

const BuildRankUser = (props: BuildRankUserProps) => {
	const { username, rank } = props;
	const { id: rankId, rankName } = rank;

	return (
		<div>
			<LazyLoadImage
				alt={rankName}
				title={rankName}
				src={`/images/wildriftranks/${rankId}.png`}
				className={styles.rankImage}
			/>
			<span className={`${styles.usernameText} buildBoxUsername`}>
				{/* 
					If username is greater than 8 characters, cut the displayed name
				*/}
				{username.length > 8
					? username.substring(0, 8).toString() + '...'
					: username.toString()}
			</span>
		</div>
	);
};

export default BuildRankUser;
