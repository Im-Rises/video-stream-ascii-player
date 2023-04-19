import React, {useRef, useState} from 'react';
import VideoAscii from 'video-stream-ascii';
import VideoController from './VideoController';
import './VideoAsciiPanel.scss';
import {VideoHandler} from './VideoHandler';

export const VideoAsciiPanel: React.FC = () => {
	const divVideoAsciiParentRef = useRef<HTMLDivElement>(null);

	// Video settings
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);

	// Video ascii settings
	const charsPerLine = 100;
	const [charsPerColumn, setCharsPerColumn] = useState(0);
	const [useColor, setUseColor] = useState(false);
	const calculateCharsPerColumn = (video: HTMLVideoElement) => Math.round(charsPerLine * (video.videoHeight / video.videoWidth));

	// On video ready
	const onCanPlay = () => {
		setIsVideoReady(true);
		setCharsPerColumn(calculateCharsPerColumn(videoRef.current!));
	};

	const onTimeUpdate = () => {
		setCurrentTime(videoRef.current?.currentTime ?? 0);
	};

	return (
		<div>
			{
				<div>
					<VideoHandler videoRef={videoRef} onCanPlay={onCanPlay} onTimeUpdate={onTimeUpdate}/>
					<div ref={divVideoAsciiParentRef} className={'video-ascii-panel'}>
						{isVideoReady
                            ?? (
                            	<div>
                            		<div>
                            			<VideoAscii videoStreaming={videoRef.current!}
                            				parentRef={divVideoAsciiParentRef}
                            				charsPerLine={charsPerLine}
                            				charsPerColumn={charsPerColumn}
                            				fontColor={'white'}
                            				backgroundColor={'black'}
                            				useColor={useColor}/>
                            		</div>
                            		<div>
                            			<VideoController videoRef={videoRef}/>
                            		</div>
                            		<button onClick={() => {
                            			setUseColor(!useColor);
                            		}}>Toggle color
                            		</button>
                            	</div>
                            )
						}
					</div>
				</div>
			}
		</div>
	);
};

