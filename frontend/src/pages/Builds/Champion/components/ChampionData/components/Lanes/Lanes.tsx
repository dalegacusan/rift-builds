import React from 'react';
import {
	patchVersion,
	patchNotesURL,
} from '../../../../../../../utils/globalvars';

// MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import HelpIcon from '@material-ui/icons/Help';
// CSS
import styles from './lanes.module.css';
// Types
type LanesProps = {
	lane: Array<string>;
	tier: {
		[key: string]: string | undefined;
	};
};

const Lanes = (props: LanesProps) => {
	const { lane: lanes, tier } = props;

	return (
		<Box className={styles.chipContainer}>
			{lanes.map((lane, index) => {
				return (
					<Chip
						key={index}
						avatar={
							<Avatar className={styles.chipTier}>
								{tier[lane] ? tier[lane] : '?'}
							</Avatar>
						}
						label={lane}
						color='primary'
						className={styles.roleChip}
					/>
				);
			})}
			<span className={styles.patchText}>
				<HelpIcon className={styles.helpIcon} />
				<a href={patchNotesURL} target='_blank'>
					Patch {patchVersion}
				</a>
			</span>
		</Box>
	);
};

export default Lanes;
