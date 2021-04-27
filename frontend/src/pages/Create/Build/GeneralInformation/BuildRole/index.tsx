import React from 'react';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../shared/store/actions';

// Shared
import { ImagePath } from '../../../../../shared/utils/imagePath';

// MaterialUI
import Box from '@material-ui/core/Box';

// Components

// CSS
import globalstyles from '../../Styles.module.css';
import styles from './Styles.module.css';

// Types
import { RoleInterface } from '../../../../../shared/interfaces/GameData';
import { RootState } from '../../../../../shared/interfaces/GlobalStore';

const RoleID = {
	TOP: '53f90d2a-d970-41ec-8d5c-f8775580ad7e',
	JUNGLE: 'e4cbdb64-7118-436b-b0c6-89388731aeb5',
	MIDDLE: '6b7ca1d8-872a-4c54-b685-720e14251941',
	BOTTOM: 'e3f90603-6452-4c33-afe6-466a69b6095b',
	SUPPORT: '35b924df-6d60-4cc5-82a8-4e5dc85272a0',
};

const BuildRole = (props: BuildRoleProps) => {
	// Build PROPS
	const { buildRole, setBuildRole } = props;

	const handleBuildRoleChange = (props: RoleInterface) => {
		const { id: roleId, roleName } = props;

		setBuildRole({ id: roleId, roleName });
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>2. Role</p>
			<p className={globalstyles.inputDescription}>
				What role/lane is your build for?
			</p>

			{/* TOP */}
			<img
				src={ImagePath.Role(RoleID.TOP)}
				className={`${styles.roleImage} ${
					buildRole.id === RoleID.TOP ? styles.isSelected : null
				}`}
				onClick={() =>
					handleBuildRoleChange({
						id: RoleID.TOP,
						roleName: 'Top',
					})
				}
				alt='Top'
				title='Top'
			/>

			{/* JUNGLE */}
			<img
				src={ImagePath.Role(RoleID.JUNGLE)}
				className={`${styles.roleImage} ${
					buildRole.id === RoleID.JUNGLE ? styles.isSelected : null
				}`}
				onClick={() =>
					handleBuildRoleChange({
						id: RoleID.JUNGLE,
						roleName: 'Jungle',
					})
				}
				alt='Jungle'
				title='Jungle'
			/>

			{/* MIDDLE */}
			<img
				src={ImagePath.Role(RoleID.MIDDLE)}
				className={`${styles.roleImage} ${
					buildRole.id === RoleID.MIDDLE ? styles.isSelected : null
				}`}
				onClick={() =>
					handleBuildRoleChange({
						id: RoleID.MIDDLE,
						roleName: 'Middle',
					})
				}
				alt='Middle'
				title='Middle'
			/>

			{/* BOTTOM */}
			<img
				src={ImagePath.Role(RoleID.BOTTOM)}
				className={`${styles.roleImage} ${
					buildRole.id === RoleID.BOTTOM ? styles.isSelected : null
				}`}
				onClick={() =>
					handleBuildRoleChange({
						id: RoleID.BOTTOM,
						roleName: 'Bottom',
					})
				}
				alt='Bottom'
				title='Bottom'
			/>

			{/* SUPPORT */}
			<img
				src={ImagePath.Role(RoleID.SUPPORT)}
				className={`${styles.roleImage} ${
					buildRole.id === RoleID.SUPPORT ? styles.isSelected : null
				}`}
				onClick={() =>
					handleBuildRoleChange({
						id: RoleID.SUPPORT,
						roleName: 'Support',
					})
				}
				alt='Support'
				title='Support'
			/>
		</Box>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		buildRole: state.build.buildRole,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setBuildRole: (newBuildRole: RoleInterface) =>
			dispatch({ type: actionTypes.BUILD_SET_BUILDROLE, data: newBuildRole }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type BuildRoleProps = PropsFromRedux;

export default connector(BuildRole);
