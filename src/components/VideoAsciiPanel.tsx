import React, {useRef, useState} from 'react';
import VideoAscii from 'video-stream-ascii';
import VideoController from './VideoController';
import './VideoAsciiPanel.scss';
import {VideoHandler} from './VideoHandler';

export const VideoAsciiPanel: React.FC = () => {
	const divVideoAsciiParentRef = useRef<HTMLDivElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);

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
		setCharsPerColumn(calculateCharsPerColumn(videoRef.current!));
		setIsVideoReady(true);
		console.log('Video ready');
	};

	// On video time update
	const onTimeUpdate = () => {
		setCurrentTime(videoRef.current?.currentTime ?? 0);
	};

	// Handle the copy to clipboard button click
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard');
		} catch (err: unknown) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<div>
			{
				<div>
					<VideoHandler videoRef={videoRef} onCanPlay={onCanPlay} onTimeUpdate={onTimeUpdate}/>
					<div ref={divVideoAsciiParentRef} className={'video-ascii-panel'}>
						{isVideoReady && (
							<div>
								<div>
									<VideoAscii videoStreaming={videoRef.current!}
										parentRef={divVideoAsciiParentRef}
										charsPerLine={charsPerLine}
										charsPerColumn={charsPerColumn}
										fontColor={'white'}
										backgroundColor={'black'}
										useColor={useColor}
										preTagRef={preTagRef}
									/>
								</div>
								<div>
									<VideoController videoRef={videoRef}/>
								</div>
								<button className={'video-button-color'} onClick={() => {
									setUseColor(!useColor);
								}}>Toggle color
								</button>
								<button className={'video-button-copy'}
									onClick={async () => copyToClipboard(preTagRef.current!.innerText)}>Copy
								</button>
								{/* <button onClick={() => { */}
								{/*	videoRef.current!.pause(); */}
								{/*	setIsVideoReady(false); */}
								{/*	videoRef.current!.src = ''; */}
								{/* } */}
								{/* }>Change video */}
								{/* </button> */}
							</div>
						)
						}
					</div>
				</div>
			}
		</div>
	);
};
