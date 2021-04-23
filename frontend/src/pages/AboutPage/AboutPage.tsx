import React from 'react';
import { Contact } from '../../shared/constants/constants';

// CSS
import styles from './aboutpage.module.css';

const About = () => {
	return (
		<div className={styles.aboutContainer}>
			<img
				src='/images/about_banner.png'
				alt='About Banner'
				className={styles.headerImage}
			/>
			<div className={styles.aboutTextContainer}>
				<h2>Finding the right build has never been this easy</h2>
				<h4>
					<span className={styles.textHighlight}>Rift Builds</span> is a
					platform to help you get easy access to builds across all regions for
					League of Legends: Wild Rift.
				</h4>

				<hr
					style={{
						backgroundColor: 'rgb(255,255,255, 30%)',
						height: '2px',
						border: 'none',
					}}
				/>

				<p>
					We offer access to builds for all champions of League of Legends: Wild
					Rift so that players can jumpstart theory-crafting their champion's
					arsenal and start climbing up the ladder. Each build on this platform
					serves as a mini-guide where a publisher can explain the idea behind
					each item, rune, and the build itself. We also provide tier lists so
					players can determine the best champions for every role in each patch.
					Want to share your build? Get started by{' '}
					<a href='/build/create'>creating a build</a>.
				</p>

				<p>
					We’re always looking for ways to improve. Feel free to send feedback
					at&nbsp;
					<a href={`mailto:${Contact.EMAIL_ADDRESS}`}>
						{Contact.EMAIL_ADDRESS}
					</a>
					.
				</p>

				<p>
					Rift Builds was founded and developed in 2021 by{' '}
					<a
						href='https://github.com/dalegacusan'
						target='_blank'
						rel='noreferrer'
					>
						Dale Gacusan
					</a>
					.
				</p>

				<p className={styles.aboutNoteText}>
					If you're a developer and wish to contribute to this project, head
					over to this&nbsp;
					<a
						href='https://github.com/dalegacusan/wildriftcommunitybuilds'
						target='_blank'
						rel='noreferrer'
					>
						repository
					</a>
					.
				</p>
			</div>
		</div>
	);
};

export default About;
