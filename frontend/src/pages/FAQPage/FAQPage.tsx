import React from 'react';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

import { Contact } from '../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import AccordionFAQ from './Accordion/AccordionFAQ';
// CSS
import styles from './faqpage.module.css';

const FAQ = () => {
	return (
		<>
			<Helmet>
				<title>Frequently Asked Questions - Rift Builds</title>
			</Helmet>
			<div>
				<Typography
					variant='h4'
					style={{
						fontWeight: 'bold',
						color: 'rgb(255,255,255,87%)',
						textAlign: 'center',
						margin: '80px 0 60px 0',
					}}
				>
					Frequently Asked Questions
				</Typography>

				<AccordionFAQ />

				<Box style={{ textAlign: 'center', color: 'rgb(255,255,255,87%)' }}>
					<Typography
						variant='h6'
						style={{
							fontWeight: 'bold',
							margin: '80px 0 20px 0',
						}}
					>
						Still have questions?
					</Typography>
					<p style={{ color: 'rgb(255,255,255,60%)' }}>
						If you cannot find an answer to your question in our FAQ, you can
						always contact us at{' '}
						<span className={styles.contactEmailAddress}>
							{Contact.EMAIL_ADDRESS}
						</span>
						. We will get back to you shortly!
					</p>
				</Box>
			</div>
		</>
	);
};

export default FAQ;
