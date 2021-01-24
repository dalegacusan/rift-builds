import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Components
import Layout from '../../components/Layout';
import Landing from '../Landing/Landing';
import Builds from '../Builds/Builds';
import CreateBuild from '../Create/Build/CreateBuild';
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
					</Switch>
				</Router>
			</Layout>
		</div>
	);
}
