import React from 'react';
import './App.scss';
import GitHubProjectPanel from './components/GitHubProjectPanel';
import {AUTHOR, GITHUB_LINK_TEXT, GITHUB_URL} from './constants/github-project-constants';
import {VideoAsciiPanel} from './components/VideoAsciiPanel';

const App = () => (
	<div>
		<GitHubProjectPanel link={GITHUB_URL} author={AUTHOR}/>
		<VideoAsciiPanel/>
	</div>
);

export default App;
