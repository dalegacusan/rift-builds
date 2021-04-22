import React from 'react';

// MaterialUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
// Types
import { RuneInterface } from '../../interfaces/Build';
// CSS
import styles from './popover.module.css';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		popover: {
			pointerEvents: 'none',
		},
		paper: {
			padding: '20px',
			backgroundColor: '#171717',
			color: '#FFFFFF',
			width: '400px',
			boxShadow: 'none',
			border: '1px solid #505C75',
		},
	})
);

type RunePopoverProps = {
	anchorEl: HTMLElement | null;
	handlePopoverClose: () => void;
	rune: RuneInterface;
	open: boolean;
};

const RunePopover = (props: RunePopoverProps) => {
	const { anchorEl, handlePopoverClose, rune, open } = props;
	const { description, runeName } = rune;

	const classes = useStyles();

	return (
		<Popover
			className={classes.popover}
			classes={{
				paper: classes.paper,
			}}
			id='mouse-over-popover'
			open={open}
			onClose={handlePopoverClose}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			disableRestoreFocus
			disableScrollLock
		>
			<Typography className={styles.popoverRuneName}>{runeName}</Typography>

			{/* === Description === */}
			<Box className={styles.popoverSectionContainer}>
				{description &&
					description.map((desc, index) => {
						const indexOfColon = desc.indexOf(':');
						const descTitle = desc.slice(0, indexOfColon);
						const descDescription = desc.slice(indexOfColon, desc.length);

						return (
							<Box key={index} className={styles.popoverRuneDescContainer}>
								{indexOfColon < 0 ? (
									<span>{desc}</span>
								) : (
									<>
										<span
											style={{
												color: indexOfColon < 0 ? '#CFCFCF' : '#ffb84d',
											}}
										>
											{descTitle}
										</span>
										<span>{descDescription}</span>
									</>
								)}
							</Box>
						);
					})}
			</Box>
		</Popover>
	);
};

export default RunePopover;
