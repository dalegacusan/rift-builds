import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// CSS
import styles from './buildrankuser.module.css';
// Types
import { RankInterface } from '../../../../../../../../../shared/constants/interfaces';
type BuildRankUserProps = {
	username: string;
	rank: RankInterface;
};

const BuildRankUser = (props: BuildRankUserProps) => {
	const { username, rank } = props;
	const { id: rankId, rankName } = rank;

	return (
		<>
			<LazyLoadImage
				alt={rankName}
				title={rankName}
				src={`/images/wildriftranks/${rankId}.png`}
				className={styles.rankImage}
			/>
			<span className={styles.usernameText}>
				{/* 
					If username is greater than 8 characters, cut the displayed name
				*/}
				{username.length > 8 ? username.substring(0, 8) + '...' : username}
			</span>
		</>
	);
};

export default BuildRankUser;
