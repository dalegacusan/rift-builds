import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { GamePatch } from '../../../../shared/constants/constants';

// MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
// CSS
import styles from './Styles.module.css';
// Types
type LanesProps = {
	lane: Array<string>;
	tier: {
		[key: string]: string | undefined;
	};
};

const useStylesBootstrap = makeStyles((theme: Theme) => ({
	tooltip: {
		letterSpacing: '0.1px',
		backgroundColor: '#171717',
		fontSize: '12px',
		padding: '12px',
	},
}));

const Lanes = (props: LanesProps) => {
	const { lane: lanes, tier } = props;
	const classes = useStylesBootstrap();

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
				<Tooltip
					title={`The data displayed is based on Patch ${GamePatch.VERSION} of League of Legends: Wild Rift. Check out our FAQ for more information on where we get our tier list data from.`}
					placement='top'
					classes={classes}
					arrow
				>
					<HelpIcon className={`${styles.helpIcon} text-white-disabled`} />
				</Tooltip>
				<a
					href={GamePatch.URL}
					target='_blank'
					rel='noreferrer'
					className='text-white-disabled'
				>
					Patch {GamePatch.VERSION}
				</a>
			</span>
		</Box>
	);
};

export default Lanes;
