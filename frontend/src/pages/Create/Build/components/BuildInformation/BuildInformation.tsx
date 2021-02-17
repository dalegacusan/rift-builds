import React, { useState, useEffect } from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
// Components
// CSS
import styles from './createbuild.module.css';
// Types
import {
	BuildInterface,
	CountersInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RuneInterface,
	SpellInterface,
} from '../../../../../utils/interfaces';
type BuildInformationProps = {
	formControl: string;
	setBuild: (newBuild: object) => void;
};

const BuildInformation = (props: BuildInformationProps) => {
	const { formControl, setBuild } = props;

	const roles = ['Top', 'Jungle', 'Middle', 'Bottom', 'Support'];

	// =============== Build Title =============== //
	const [buildTitle, setBuildTitle] = useState('');
	const handleBuildTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setBuildTitle(value);
	};

	// =============== Build Role =============== //
	const [buildRole, setBuildRole] = useState('Top');
	const handleBuildRoleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const { value } = e.target;

		setBuildRole(value as string);
	};

	// Handler for setBuild()
	useEffect(() => {
		setBuild((prev: object) => {
			return { ...prev, buildTitle, buildRole };
		});
	}, [buildTitle, buildRole]);

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

export default BuildInformation;
