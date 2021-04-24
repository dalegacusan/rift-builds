import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import AboutPage from '../pages/AboutPage';
import ChampionBuildsPage from '../pages/ChampionBuildsPage';
import CreateBuildPage from '../pages/Create/Build';
import FAQPage from '../pages/FAQPage';
import LandingPage from '../pages/LandingPage';
import PageNotFound from '../shared/components/PageError/PageNotFound/PageNotFound';
import PlayerBuildPage from '../pages/PlayerBuildPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<LandingPage />
				</Route>
				<Route exact path='/build/create'>
					<CreateBuildPage />
				</Route>
				<Route exact path='/builds/champion/:championName'>
					<ChampionBuildsPage />
				</Route>
				<Route exact path='/build/:buildId'>
					<PlayerBuildPage />
				</Route>
				<Route exact path='/faq'>
					<FAQPage />
				</Route>
				<Route exact path='/privacypolicy'>
					<PrivacyPolicyPage />
				</Route>
				<Route exact path='/about'>
					<AboutPage />
				</Route>

				{/* 404 - Page not found */}
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default Routes;
