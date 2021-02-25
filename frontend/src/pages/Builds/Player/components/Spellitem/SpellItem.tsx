import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
// Components
// CSS
import styles from './spellitem.module.css';
const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));
// Types
type SpellItemProps = {
	spellId: string;
	spellName: string;
};

const SpellItem = (props: SpellItemProps) => {
	const { spellId, spellName } = props;
	const classes = useStyles();

	return (
		<Box style={{ display: 'inline-block', padding: '10px' }}>
			<Avatar
				variant='square'
				className={`${classes.large} ${styles.spellAvatar}`}
			>
				<LazyLoadImage
					src={`/images/wildriftspells/${spellId}.jpg`}
					className={styles.spellImage}
					title={spellName}
					alt={spellName}
				/>
			</Avatar>
			<span className={styles.spellName}>{spellName}</span>
		</Box>
	);
};

export default SpellItem;
