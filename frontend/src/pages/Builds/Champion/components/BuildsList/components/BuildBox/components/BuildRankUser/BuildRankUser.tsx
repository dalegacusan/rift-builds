import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// CSS
import styles from './buildrankuser.module.css';
// Types
type BuildRankUserProps = {
	username: string;
	rankId: string;
};

const BuildRankUser = (props: BuildRankUserProps) => {
	const { username, rankId } = props;

	return (
		<>
			<LazyLoadImage
				src={`/images/wildriftranks/${rankId}.png`}
				className={styles.rankImage}
			/>
			<span className={styles.usernameText}>{username}</span>
		</>
	);
};

export default BuildRankUser;
