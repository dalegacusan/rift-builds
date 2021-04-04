import React from 'react';

import { GameRegion } from '../../../../../../../shared/constants/constants';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// Types
import { RootState } from '../../../../../../../shared/constants/interfaces';
// CSS
import globalstyles from '../../../../createbuild.module.css';
import styles from './playerregion.module.css';

const PlayerRegion = (props: PlayerRegionProps) => {
	// Build PROPS
	const { regionSelected, setRegionSelected } = props;

	// =============== Rank =============== //
	const handleServerSelectChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.target;

		console.log(value);

		setRegionSelected(value);
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>11. Region</p>
			<p className={globalstyles.inputDescription}>Select your region</p>

			<Box>
				<select
					value={regionSelected}
					onChange={handleServerSelectChange}
					className={globalstyles.buildSelectInput}
				>
					<option
						value={GameRegion.SEA}
						className={globalstyles.buildSelectOption}
					>
						{GameRegion.SEA.toUpperCase()}
					</option>
					<option
						value={GameRegion.NA}
						className={globalstyles.buildSelectOption}
					>
						{GameRegion.NA.toUpperCase()}
					</option>
					<option
						value={GameRegion.EUW}
						className={globalstyles.buildSelectOption}
					>
						{GameRegion.EUW.toUpperCase()}
					</option>
				</select>
			</Box>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		regionSelected: state.build.region,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setRegionSelected: (newRegion: string) =>
			dispatch({ type: actionTypes.BUILD_SET_REGION, data: newRegion }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PlayerRegionProps = PropsFromRedux;

export default connector(PlayerRegion);
