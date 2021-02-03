import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Components
import Layout from '../../components/Layout';
import Landing from '../Landing/Landing';
import HeroBuilds from '../HeroBuilds/HeroBuilds';
import CreateBuild from '../Create/Build/CreateBuild';
import PlayerBuild from '../PlayerBuild/PlayerBuild';
// CSS
// Types

export default function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' render={() => <Landing />} />
					<Layout>
						<Route
							exact
							path='/builds/:championId'
							render={() => <HeroBuilds />}
						/>

						<Route exact path='/create' render={() => <CreateBuild />} />

						<Route
							exact
							path='/build/:buildId'
							render={() => <PlayerBuild />}
						/>
					</Layout>
				</Switch>
			</Router>
		</div>
	);
}
