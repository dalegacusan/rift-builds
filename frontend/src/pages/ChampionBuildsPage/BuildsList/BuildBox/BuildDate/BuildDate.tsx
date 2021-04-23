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

	let buildDateToDisplay;

	if (dateDifference === 0) {
		buildDateToDisplay = `Today`;
	} else if (dateDifference === 1) {
		buildDateToDisplay = `${dateDifference} day ago`;
	} else {
		buildDateToDisplay = `${dateDifference} days ago`;
	}

	return (
		<p style={{ textAlign: 'center' }} className='buildBoxDateText'>
			{buildDateToDisplay}
		</p>
	);
};

export default BuildDate;
