import React from 'react';

import { Maps } from '../../shared/constants/constants';

// MaterialUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
// Types
import { SpellInterface } from '../../shared/constants/interfaces';
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

type SpellPopoverProps = {
	anchorEl: HTMLElement | null;
	handlePopoverClose: () => void;
	spell: SpellInterface;
	open: boolean;
};

const SpellPopover = (props: SpellPopoverProps) => {
	const { anchorEl, handlePopoverClose, spell, open } = props;
	const { cooldown, description, spellName, applicableMaps } = spell;

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
			<Typography className={styles.popoverSpellName}>{spellName}</Typography>

			{/* === Description === */}
			<Box className={styles.popoverSectionContainer}>
				<Box className={styles.applicableMapsContainer}>
					<span>Applicable Maps: </span>
					<span>
						{/* Turn array into string and join replace commas with a comma + space */}
						{applicableMaps
							.map((map) => {
								const mapToDisplay =
									map === Maps.WILD_RIFT ? 'Wild Rift' : 'Howling Abyss';

								return mapToDisplay;
							})
							.join()
							.replace(/,/g, ', ')}
					</span>
				</Box>

				<br />

				<span className={styles.cooldown}>Cooldown: {cooldown} second(s)</span>

				{description &&
					description.map((desc, index) => {
						const indexOfColon = desc.indexOf(':');
						const descTitle = desc.slice(0, indexOfColon);
						const descDescription = desc.slice(indexOfColon, desc.length);

						return (
							<Box key={index} className={styles.popoverSpellDescContainer}>
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

export default SpellPopover;
