import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
// Types
// CSS

const CreateBuildHeader = () => {
	return (
		<Box>
			<Box style={{ padding: '20px 0', marginTop: '20px' }}>
				<Typography variant='h6' style={{ fontWeight: 'bold' }} gutterBottom>
					Create your build
				</Typography>
				<Typography variant='body2' style={{ color: '#666666' }} gutterBottom>
					Please note that you can only create up to 5 builds every 30 minutes.
				</Typography>
			</Box>
			<Box
				style={{
					width: '150px',
					height: '1px',
					margin: '10px 0 20px 0',
					backgroundColor: '#000000',
				}}
			>
				&nbsp;
			</Box>
		</Box>
	);
};

export default CreateBuildHeader;
