import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
		<Switch>
			<Route path='/' exact>
				<LandingPage />
			</Route>
			<Route path='/build/create' exact>
				<CreateBuildPage />
			</Route>
			<Route path='/builds/champion/:championName' exact>
				<ChampionBuildsPage />
			</Route>
			<Route path='/build/:buildId' exact>
				<PlayerBuildPage />
			</Route>
			<Route path='/faq' exact>
				<FAQPage />
			</Route>
			<Route path='/privacypolicy' exact>
				<PrivacyPolicyPage />
			</Route>
			<Route path='/about' exact>
				<AboutPage />
			</Route>

			{/* 404 - Page not found */}
			<Route path='/' component={PageNotFound} />
		</Switch>
	);
};

export default Routes;
