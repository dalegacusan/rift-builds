import React from 'react';
import { Helmet } from 'react-helmet';

type PageHelmetProps = {
	pageTitle?: string;
};

const PageHelmet = (props: PageHelmetProps) => {
	const { pageTitle } = props;

	return (
		<Helmet>
			<title>{pageTitle}</title>
		</Helmet>
	);
};

export default PageHelmet;
