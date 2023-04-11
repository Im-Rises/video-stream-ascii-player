import React from 'react';
import './App.scss';
import GitHubProjectPanel from './components/GitHubProjectPanel';
import {GITHUB_LINK_TEXT, GITHUB_URL} from './constants/pixel-ascii';
import {VideoAsciiPanel} from './components/VideoAsciiPanel';

const App = () => (
	<div className='App'>
		<GitHubProjectPanel link={GITHUB_URL}
			linkText={GITHUB_LINK_TEXT}/>
		<VideoAsciiPanel/>
	</div>
);

export default App;
