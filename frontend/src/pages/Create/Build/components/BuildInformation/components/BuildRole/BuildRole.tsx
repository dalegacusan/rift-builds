import React from 'react';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// CSS
import globalstyles from '../../../../createbuild.module.css';
import styles from './buildrole.module.css';
// Types
import {
	RootState,
	RoleInterface,
} from '../../../../../../../shared/constants/interfaces';

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
				src={`/images/wildriftroles/53f90d2a-d970-41ec-8d5c-f8775580ad7e.png`}
				className={styles.roleImage}
				style={{
					opacity:
						buildRole.id === '53f90d2a-d970-41ec-8d5c-f8775580ad7e' ? 1 : 0.4,
				}}
				onClick={() =>
					handleBuildRoleChange({
						id: '53f90d2a-d970-41ec-8d5c-f8775580ad7e',
						roleName: 'Top',
					})
				}
				alt='Top'
				title='Top'
			/>

			{/* JUNGLE */}
			<img
				src={`/images/wildriftroles/e4cbdb64-7118-436b-b0c6-89388731aeb5.png`}
				className={styles.roleImage}
				style={{
					opacity:
						buildRole.id === 'e4cbdb64-7118-436b-b0c6-89388731aeb5' ? 1 : 0.4,
				}}
				onClick={() =>
					handleBuildRoleChange({
						id: 'e4cbdb64-7118-436b-b0c6-89388731aeb5',
						roleName: 'Jungle',
					})
				}
				alt='Jungle'
				title='Jungle'
			/>

			{/* MIDDLE */}
			<img
				src={`/images/wildriftroles/6b7ca1d8-872a-4c54-b685-720e14251941.png`}
				className={styles.roleImage}
				style={{
					opacity:
						buildRole.id === '6b7ca1d8-872a-4c54-b685-720e14251941' ? 1 : 0.4,
				}}
				onClick={() =>
					handleBuildRoleChange({
						id: '6b7ca1d8-872a-4c54-b685-720e14251941',
						roleName: 'Middle',
					})
				}
				alt='Middle'
				title='Middle'
			/>

			{/* BOTTOM */}
			<img
				src={`/images/wildriftroles/e3f90603-6452-4c33-afe6-466a69b6095b.png`}
				className={styles.roleImage}
				style={{
					opacity:
						buildRole.id === 'e3f90603-6452-4c33-afe6-466a69b6095b' ? 1 : 0.4,
				}}
				onClick={() =>
					handleBuildRoleChange({
						id: 'e3f90603-6452-4c33-afe6-466a69b6095b',
						roleName: 'Bottom',
					})
				}
				alt='Bottom'
				title='Bottom'
			/>

			{/* SUPPORT */}
			<img
				src={`/images/wildriftroles/35b924df-6d60-4cc5-82a8-4e5dc85272a0.png`}
				className={styles.roleImage}
				style={{
					opacity:
						buildRole.id === '35b924df-6d60-4cc5-82a8-4e5dc85272a0' ? 1 : 0.4,
				}}
				onClick={() =>
					handleBuildRoleChange({
						id: '35b924df-6d60-4cc5-82a8-4e5dc85272a0',
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
