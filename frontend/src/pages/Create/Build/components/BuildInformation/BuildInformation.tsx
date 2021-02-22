import React from 'react';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
// CSS
import styles from './createbuild.module.css';
// Types
import { RootState } from '../../../../../utils/interfaces';

const BuildInformation = (props: BuildInformationProps) => {
	// Build PROPS
	const { buildTitle, buildRole, setBuildTitle, setBuildRole } = props;

	const roles = ['Top', 'Jungle', 'Middle', 'Bottom', 'Support'];

	// =============== Build Title =============== //
	const handleBuildTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setBuildTitle(value);
	};

	// =============== Build Role =============== //
	const handleBuildRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;

		setBuildRole(value as string);
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>1. Build Title</p>
					<input
						type='text'
						placeholder='Build title'
						style={{ width: '100%' }}
						onChange={(e) => handleBuildTitleChange(e)}
					/>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box>
					<p>2. Role</p>
					{
						<select
							defaultValue='Top'
							value={buildRole}
							onChange={handleBuildRoleChange}
						>
							{roles.map((role, index) => {
								return (
									<option key={index} value={role}>
										{role}
									</option>
								);
							})}
						</select>
					}
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
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setBuildTitle: (newBuildTitle: string) =>
			dispatch({ type: actionTypes.BUILD_SET_BUILDTITLE, data: newBuildTitle }),
		setBuildRole: (newBuildRole: string) =>
			dispatch({ type: actionTypes.BUILD_SET_BUILDROLE, data: newBuildRole }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type BuildInformationProps = PropsFromRedux;

export default connector(BuildInformation);
