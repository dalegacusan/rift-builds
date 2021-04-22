import React from 'react';

import { RequiredLength } from '../../../../../../../shared/constants/requiredLength';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// Types
import { RootState } from '../../../../../../../shared/interfaces/GlobalStore';
// CSS
import globalstyles from '../../../../createbuild.module.css';

const PlayerUsername = (props: PlayerUsernameProps) => {
	// Build PROPS
	const { username, setUsername } = props;

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setUsername(value);
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>
				9. Username <span className={globalstyles.requiredInput}>*</span>
			</p>
			<p className={globalstyles.inputDescription}>
				What is your in-game name (IGN)?
			</p>
			<input
				type='text'
				value={username}
				placeholder='Username'
				onChange={(e) => handleUsernameChange(e)}
				className={globalstyles.buildInput}
				maxLength={RequiredLength.USERNAME.MAX_LENGTH}
			/>
			<p
				className={globalstyles.inputDescription}
				style={{ fontStyle: 'italic' }}
			>
				Please include your ID (i.e. ABC#DEFGH)
			</p>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		username: state.build.username,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setUsername: (newUsername: string) =>
			dispatch({ type: actionTypes.BUILD_SET_USERNAME, data: newUsername }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PlayerUsernameProps = PropsFromRedux;

export default connector(PlayerUsername);
