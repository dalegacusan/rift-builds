import React, { useState } from 'react';

import { ImagePath } from '../../../../../shared/utils/imagePath';

// MaterialUI
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
// Components
import RunePopover from '../../../../../shared/components/Popover/RunePopover';
// CSS
import styles from './Styles.module.css';
// Types
import { RuneInterface } from '../../../../../shared/interfaces/GameData';
type BuildRuneProps = {
	runes: {
		keystone: RuneInterface;
		domination: RuneInterface;
		resolve: RuneInterface;
		inspiration: RuneInterface;
	};
};

const SmallAvatar = withStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 18,
			height: 18,
		},
	})
)(Avatar);

const BuildRune = (props: BuildRuneProps) => {
	const { runes } = props;
	const { keystone, domination } = runes;

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const handlePopoverOpen = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Badge
				overlap='circle'
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				badgeContent={
					<SmallAvatar
						alt={domination.runeName}
						src={ImagePath.Rune(domination.id)}
					/>
				}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				<Avatar
					alt={keystone.runeName}
					src={ImagePath.Rune(keystone.id)}
					className={styles.runeImage}
				/>
			</Badge>

			<RunePopover
				rune={keystone}
				anchorEl={anchorEl}
				open={open}
				handlePopoverClose={handlePopoverClose}
			/>
		</>
	);
};

export default BuildRune;
