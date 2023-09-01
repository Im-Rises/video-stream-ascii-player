import {ArtTypeEnum, VideoAscii} from 'video-stream-ascii';
import VideoController from './VideoController';
import CopyImage from '../../images/copy.svg';
import React, {useRef, useState} from 'react';
import './VideoViewPanel.scss';

type VideoViewPanelProps = {
	videoRef: HTMLVideoElement;
	charsPerLine: number;
	charsPerColumn: number;
	onEjectVideo: () => void;
};

export const VideoViewPanel = (props: VideoViewPanelProps) => {
	const [useColor, setUseColor] = useState(false);
	const divVideoAsciiParentRef = useRef<HTMLDivElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard');
		} catch (err: unknown) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<>
			<div className={'video-ascii-panel'}>
				<div ref={divVideoAsciiParentRef} className={'video-ascii-holder'}>
					<VideoAscii videoStreaming={props.videoRef}
						parentRef={divVideoAsciiParentRef}
						charsPerLine={props.charsPerLine}
						charsPerColumn={props.charsPerColumn}
						fontColor={'white'}
						backgroundColor={'black'}
						artType={useColor ? ArtTypeEnum.ASCII_COLOR_BG_IMAGE : ArtTypeEnum.ASCII}
						preTagRef={preTagRef}
					/>
				</div>
				<div className={'video-ascii-controller-holder'}>
					<VideoController videoRef={props.videoRef} replayOnEnd={false}
						onEjectVideo={props.onEjectVideo}/>
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
	);
};
