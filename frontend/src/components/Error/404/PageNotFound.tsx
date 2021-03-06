import React from 'react';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';

const PageNotFound = () => {
	return (
		<>
			<Helmet>
				<title>Page not found - Rift Builds</title>
			</Helmet>
			<p>Page not found</p>
		</>
	);
};

export default PageNotFound;
