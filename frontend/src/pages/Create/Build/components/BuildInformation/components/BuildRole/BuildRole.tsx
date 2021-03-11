import React from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
} from '../../../../../../../utils/interfaces';

const BuildRole = (props: BuildRoleProps) => {
	// Build PROPS
	const { buildRole, setBuildRole } = props;
	// Game Data PROPS
	const { roles } = props;

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

			{roles.map((role: RoleInterface) => {
				const { id: roleId, roleName } = role;

				return (
					<LazyLoadImage
						src={`/images/wildriftroles/${roleId}.png`}
						key={roleId}
						className={styles.roleImage}
						style={{ opacity: buildRole.id === roleId ? 1 : 0.5 }}
						onClick={() => handleBuildRoleChange({ id: roleId, roleName })}
						alt={roleName}
						title={roleName}
					/>
				);
			})}
		</Box>
	);
};

// https://redux.js.org/recipes/usage-with-typescript
const mapStateToProps = (state: RootState) => {
	return {
		buildRole: state.build.buildRole,
		roles: state.gameData.roles,
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
