import React from 'react';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

// Shared
import { Contact } from '../../shared/constants/constants';

// Images
import AboutBanner from './assets/about_banner.png';

// CSS
import styles from './Styles.module.css';

const AboutPage: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>About Us - Rift Builds</title>
			</Helmet>
			<div
				className={`${styles.aboutContainer} page-container text-white-primary`}
			>
				<img src={AboutBanner} alt='About Banner' className='banner' />
				<div className={styles.aboutTextContainer}>
					<h2 className='text-white-pure'>
						Finding the right build has never been this easy
					</h2>
					<h4 className='text-white-disabled'>
						Rift Builds is a platform to help you get easy access to builds
						across all regions for League of Legends: Wild Rift.
					</h4>

					<hr className={styles.textDivider} />

					<p>
						We offer access to builds for all champions of League of Legends:
						Wild Rift so that players can jumpstart theory-crafting their
						champion's arsenal and start climbing up the ladder. Each build on
						this platform serves as a mini-guide where a publisher can explain
						the idea behind each item, rune, and the build itself. We also
						provide tier lists so players can determine the best champions for
						every role in each patch. Want to share your build? Get started by{' '}
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

					<p className='text-white-disabled'>
						If you're a developer and wish to contribute to this project, head
						over to this&nbsp;
						<a
							href='https://github.com/dalegacusan/wildriftcommunitybuilds'
							target='_blank'
							rel='noreferrer'
							className='text-white-secondary'
						>
							repository
						</a>
						.
					</p>
				</div>
			</div>
		</>
	);
};

export default AboutPage;
