import React from 'react';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

// Shared
import { Contact } from '../../shared/constants/constants';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Components
import AccordionFAQ from './Accordion';

// CSS

const FAQ: React.FC = () => {
	return (
		<>
			<Helmet>
				<title>Frequently Asked Questions - Rift Builds</title>
			</Helmet>
			<div className='page-container' style={{ textAlign: 'center' }}>
				<Typography
					variant='h4'
					style={{
						margin: '80px 0 60px 0',
					}}
					className='text-white-primary text-bold'
				>
					Frequently Asked Questions
				</Typography>

				<AccordionFAQ />

				<Box className='text-white-primary'>
					<Typography
						variant='h6'
						style={{
							margin: '60px 0 0 0',
						}}
						className='text-bold'
					>
						Still have questions?
					</Typography>
					<p className='text-white-disabled'>
						If you cannot find an answer to your question in our FAQ, you can
						always contact us at{' '}
						<span className='text-italic text-primary'>
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
