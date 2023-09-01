import React, {useRef, useState} from 'react';
import './VideoAsciiPanel.scss';
import {VideoHandler, type VideoHandlerRef} from './video-handler/VideoHandler';
import {VideoViewPanel} from './video-view-panel/VideoViewPanel';
import GitHubProjectPanel from './github/GitHubProjectPanel';
import {AUTHOR, GITHUB_URL} from '../constants/github-project-constants';

export const VideoAsciiPanel: React.FC = () => {
	const refVideoHandler = useRef<VideoHandlerRef>(null);

	// Video settings
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isVideoReady, setIsVideoReady] = useState(false);

	// Video ascii settings
	const charsPerLine = 100;
	const [charsPerColumn, setCharsPerColumn] = useState(0);
	const calculateCharsPerColumn = (video: HTMLVideoElement) => Math.round(charsPerLine * (video.videoHeight / video.videoWidth));

	// On video ready
	const onCanPlay = () => {
		setCharsPerColumn(calculateCharsPerColumn(videoRef.current!));
		setIsVideoReady(true);
	};

	const onEjectVideo = () => {
		setIsVideoReady(false);
		videoRef.current!.src = '';
		refVideoHandler.current!.ejectVideo();
	};

	return (
		<div>
			{
				<div>
					<VideoHandler videoRef={videoRef} onCanPlay={onCanPlay} ref={refVideoHandler}/>
					{isVideoReady
						? (
							<VideoViewPanel videoRef={videoRef.current!} charsPerLine={charsPerLine}
								charsPerColumn={charsPerColumn} onEjectVideo={onEjectVideo}/>
						)
						: (
							<GitHubProjectPanel link={GITHUB_URL} author={AUTHOR}/>
						)
					}
				</div>
			}
		</div>
	);
};
