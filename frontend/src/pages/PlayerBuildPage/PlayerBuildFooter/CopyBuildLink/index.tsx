import React from 'react';

// Shared
import { URL } from '../../../../shared/config/config';

// MaterialUI
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

// CSS
import styles from './Styles.module.css';

// Types
type CopyLinkProps = {
	buildId: string | undefined;
};

const CopyBuildLink = (props: CopyLinkProps) => {
	const { buildId } = props;

	return (
		<Grid container className={styles.copyBuildLinkContainer}>
			<Grid item xs={12}>
				<p className={`${styles.copyTitle} text-bold text-white-primary`}>
					Get sharable link
				</p>
				<p className={`${styles.copyDescription} text-white-secondary`}>
					Copy and paste the link below into chat rooms or browsers.
				</p>
			</Grid>
			<Grid item xs={12}>
				<Tooltip
					title='Copy to clipboard'
					placement='top'
					arrow
					onClick={() => {
						navigator.clipboard.writeText(`${URL.CLIENT}/build/${buildId}`);
					}}
				>
					<Button
						variant='contained'
						className={styles.copyButton}
						color='secondary'
					>
						<FileCopyIcon className={`${styles.copyIcon} text-white-primary`} />
					</Button>
				</Tooltip>
				<input
					type='text'
					value={`${URL.CLIENT}/build/${buildId}`}
					className={`${styles.copyInput} text-black-secondary`}
					readOnly
				/>
			</Grid>
		</Grid>
	);
};

export default CopyBuildLink;
