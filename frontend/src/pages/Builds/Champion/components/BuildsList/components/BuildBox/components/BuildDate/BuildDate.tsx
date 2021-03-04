import React from 'react';
import moment from 'moment';

// Types
type BuildDateProps = {
	dateSubmitted: Date | undefined;
};

const BuildDate = (props: BuildDateProps) => {
	const { dateSubmitted } = props;

	var originalDate = moment(dateSubmitted);
	var dateToday = moment(Date());
	const dateDifference = dateToday.diff(originalDate, 'days');

	return (
		<p style={{ textAlign: 'center' }}>
			{dateDifference} {dateDifference !== 1 ? 'days' : 'day'} ago
		</p>
	);
};

export default BuildDate;
