import React from 'react';
import { netlifyURL } from '../../../../../utils/globalvars';

// MaterialUI
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
// CSS
import styles from './copylink.module.css';
// Types
type CopyLinkProps = {
	buildId: string | undefined;
};

const CopyLink = (props: CopyLinkProps) => {
	const { buildId } = props;

	return (
		<Grid
			container
			wrap='nowrap'
			// spacing={2}
		>
			<Grid item xs>
				<Tooltip
					title='Click to copy'
					placement='top'
					arrow
					onClick={() => {
						navigator.clipboard.writeText(`${netlifyURL}/build/${buildId}`);
					}}
				>
					<Button
						variant='contained'
						size='small'
						className={styles.copyButton}
						color='secondary'
					>
						<FileCopyIcon className={styles.copyIcon} />
					</Button>
				</Tooltip>
				<input
					type='text'
					value={`${netlifyURL}/build/${buildId}`}
					className={styles.copyInput}
				/>
			</Grid>
		</Grid>
	);
};

export default CopyLink;
