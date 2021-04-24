import React, { useState } from 'react';

import { RequiredLength } from '../../../../../shared/constants/requiredLength';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../shared/store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// CSS
import globalstyles from '../../Styles.module.css';
// Types
import { RootState } from '../../../../../shared/interfaces/GlobalStore';

const BuildTitle = (props: BuildTitleProps) => {
	// Build PROPS
	const { buildTitle, setBuildTitle } = props;

	const [charactersRemaining, setCharactersRemaining] = useState(
		RequiredLength.BUILD_TITLE.MAX_LENGTH
	);

	const handleBuildTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setCharactersRemaining(
			RequiredLength.BUILD_TITLE.MAX_LENGTH - value.length
		);
		setBuildTitle(value);
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>
				1. Build Title <span className={globalstyles.requiredInput}>*</span>
			</p>
			<p className={globalstyles.inputDescription}>Give your build a title</p>
			<input
				type='text'
				value={buildTitle}
				placeholder='Build title'
				className={globalstyles.buildInput}
				onChange={(e) => handleBuildTitleChange(e)}
				maxLength={RequiredLength.BUILD_TITLE.MAX_LENGTH}
			/>
			<p
				className={globalstyles.inputDescription}
				style={{ fontStyle: 'italic' }}
			>
				{charactersRemaining} characters remaining
			</p>
		</Box>
	);
};

// https://redux.js.org/recipes/usage-with-typescript
const mapStateToProps = (state: RootState) => {
	return {
		buildTitle: state.build.buildTitle,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setBuildTitle: (newBuildTitle: string) =>
			dispatch({ type: actionTypes.BUILD_SET_BUILDTITLE, data: newBuildTitle }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type BuildTitleProps = PropsFromRedux;

export default connector(BuildTitle);
