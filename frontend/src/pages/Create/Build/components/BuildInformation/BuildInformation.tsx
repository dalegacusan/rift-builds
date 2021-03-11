import React, { useState, useEffect } from 'react';
// @ts-ignore - No types for this module
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
// CSS
import globalstyles from '../../createbuild.module.css';
import styles from './buildinformation.module.css';
// Types
import { RoleInterface, RootState } from '../../../../../utils/interfaces';

const BuildInformation = (props: BuildInformationProps) => {
	// Build PROPS
	const { buildTitle, buildRole, setBuildTitle, setBuildRole } = props;
	// Game Data PROPS
	const { roles } = props;

	const maximumCharactersForBuildTitle = 24;
	const [charactersRemaining, setCharactersRemaining] = useState(
		maximumCharactersForBuildTitle
	);

	// =============== Build Title =============== //
	const handleBuildTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		// Added +1 because at 24 characters, charactersRemaining is at 1 not 0
		if (value.length === maximumCharactersForBuildTitle + 1) {
			e.preventDefault();
		} else {
			setCharactersRemaining(maximumCharactersForBuildTitle - value.length);
			setBuildTitle(value);
		}
	};

	// =============== Build Role =============== //
	const handleBuildRoleChange = (props: RoleInterface) => {
		const { id: roleId, roleName } = props;

		setBuildRole({ id: roleId, roleName });
	};

	return (
		<Grid container spacing={3} className={globalstyles.gridContainer}>
			<Grid item xs={12} sm={12}>
				<p className={globalstyles.buildStepHeader}>Tell us about your build</p>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box>
					<p className={globalstyles.inputLabel}>1. Build Title</p>
					<p className={globalstyles.inputDescription}>
						Give your build a title
					</p>
					<input
						type='text'
						value={buildTitle}
						placeholder='Build title'
						className={globalstyles.buildInput}
						onChange={(e) => handleBuildTitleChange(e)}
					/>
					<p
						className={globalstyles.inputDescription}
						style={{ fontStyle: 'italic' }}
					>
						{charactersRemaining} characters remaining
					</p>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
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
			</Grid>
		</Grid>
	);
};

// https://redux.js.org/recipes/usage-with-typescript
const mapStateToProps = (state: RootState) => {
	return {
		buildTitle: state.build.buildTitle,
		buildRole: state.build.buildRole,
		roles: state.gameData.roles,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setBuildTitle: (newBuildTitle: string) =>
			dispatch({ type: actionTypes.BUILD_SET_BUILDTITLE, data: newBuildTitle }),
		setBuildRole: (newBuildRole: RoleInterface) =>
			dispatch({ type: actionTypes.BUILD_SET_BUILDROLE, data: newBuildRole }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type BuildInformationProps = PropsFromRedux;

export default connector(BuildInformation);
