import React from 'react';

import { GameServer } from '../../../../../../../shared/constants/constants';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// Types
import {
	RankInterface,
	RootState,
} from '../../../../../../../shared/constants/interfaces';
// CSS
import globalstyles from '../../../../createbuild.module.css';
import styles from './playerserver.module.css';

const PlayerServer = (props: PlayerServerProps) => {
	// Build PROPS
	const { serverSelected, setServerSelected } = props;

	// =============== Rank =============== //
	const handleServerSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.target;

		setServerSelected(value);
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>11. Server</p>
			<p className={globalstyles.inputDescription}>
				What server are you playing on?
			</p>

			<Box>
				<select
					value={serverSelected}
					onChange={handleServerSelectChange}
					className={globalstyles.buildSelectInput}
				>
					<option
						value={GameServer.SEA}
						className={globalstyles.buildSelectOption}
					>
						SEA
					</option>
					<option
						value={GameServer.NA}
						className={globalstyles.buildSelectOption}
					>
						NA
					</option>
					<option
						value={GameServer.EUW}
						className={globalstyles.buildSelectOption}
					>
						EUW
					</option>
				</select>
			</Box>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		serverSelected: state.build.server,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setServerSelected: (newServer: string) =>
			dispatch({ type: actionTypes.BUILD_SET_SERVER, data: newServer }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PlayerServerProps = PropsFromRedux;

export default connector(PlayerServer);
