import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Components
import Layout from '../../components/Layout';
import Landing from '../Landing/Landing';
import Builds from '../Builds/Builds';
import CreateBuild from '../Create/Build/CreateBuild';
import SoloBuild from '../SoloBuild/SoloBuild';
// CSS
// Types

export default function App() {
	return (
		<div className='App'>
			<Layout>
				<Router>
					<Switch>
						<Route exact path='/' render={() => <Landing />} />

						<Route exact path='/builds' render={() => <Builds />} />

						<Route exact path='/create' render={() => <CreateBuild />} />

						<Route exact path='/build/:buildId' render={() => <SoloBuild />} />
					</Switch>
				</Router>
			</Layout>
		</div>
	);
}
