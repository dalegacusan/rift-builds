import React, { useEffect } from 'react';

type GoogleAdProps = {
	classNames?: string;
	slot: string;
};

const GoogleAd: React.FC<GoogleAdProps> = (props) => {
	const { classNames, slot } = props;

	useEffect(() => {
		((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
	}, []);

	return (
		<div>
			<ins
				className={`adsbygoogle ${classNames}`}
				style={{ display: 'block' }}
				data-ad-client='ca-pub-3870299622373561'
				data-ad-slot={slot}
				data-ad-format='auto'
				data-full-width-responsive='true'
			></ins>
		</div>
	);
};

export default GoogleAd;
