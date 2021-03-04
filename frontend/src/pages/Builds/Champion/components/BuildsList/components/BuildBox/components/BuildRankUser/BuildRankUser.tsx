import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// CSS
import styles from './buildrankuser.module.css';
// Types
import { RankInterface } from '../../../../../../../../../utils/interfaces';
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
			<span className={styles.usernameText}>{username}</span>
		</>
	);
};

export default BuildRankUser;
