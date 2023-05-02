import React, {useRef, useState} from 'react';
import {VideoAscii, ArtTypeEnum} from 'video-stream-ascii';
import VideoController from './VideoController';
import CopyImage from '../images/copy.svg';
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
					{isVideoReady && (
						<>
							<div className={'video-ascii-panel'}>
								<div ref={divVideoAsciiParentRef} className={'video-ascii-holder'}>
									<VideoAscii videoStreaming={videoRef.current!}
										parentRef={divVideoAsciiParentRef}
										charsPerLine={charsPerLine}
										charsPerColumn={charsPerColumn}
										fontColor={'white'}
										backgroundColor={'black'}
										artType={useColor ? ArtTypeEnum.ASCII_COLOR_BG_IMAGE : ArtTypeEnum.ASCII}
										preTagRef={preTagRef}
									/>
								</div>
								<div className={'video-ascii-controller-holder'}>
									<VideoController videoRef={videoRef}/>
								</div>
							</div>
							<div>
								<button
									className={`${'Button-Toggle-Mode'} ${useColor ? 'Button-Toggle-BW' : 'Button-Toggle-Color'}`}
									onClick={() => {
										setUseColor(!useColor);
									}}>
								</button>
								<button className={'Button-Copy-Clipboard'}
									onClick={async () => copyToClipboard(preTagRef.current!.innerText)}>
									<img src={CopyImage} alt={'CopyLogoImage'}/>
								</button>
							</div>
						</>
					)
					}
				</div>
			}
		</div>
	);
};
