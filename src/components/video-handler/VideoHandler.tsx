import React, {forwardRef, useImperativeHandle, useState} from 'react';
import './VideoHandler.scss';
import {AUTHOR, GITHUB_URL} from '../../constants/github-project-constants';
import GitHubProjectPanel from '../github/GitHubProjectPanel';
import {ModeResolutionSelector} from './mode-resolution-selector/ModeResolutionSelector';
import {AutoResolutionSelector} from './resolution-parameters/AutoResolutionSelector';
import {ManualResolutionSelector} from './resolution-parameters/ManualResolutionSelector';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
	onCanPlay: () => void;
	autoPlay?: boolean;
};

export type VideoHandlerRef = {
	ejectVideo: () => void;
};

export const VideoHandler = forwardRef((props: Props, ref) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
	const autoPlay = props.autoPlay ?? true;

	// Mode resolution selection
	const [useAutoAspectRatio, setUseAutoAspectRatio] = useState(true);

	// Settings for manual resolution
	const [manualCharsPerLine, setManualCharsPerLine] = useState(160);
	const [manualCharsPerColumn, setManualCharsPerColumn] = useState(90);

	// Settings to calculate the chars per line/column based on the image aspect ratio and a selected line/column base
	const [autoResolutionBase, setAutoResolutionBase] = useState(200);
	const [useLineBase, setUseLineBase] = useState(true);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		setVideoUrl(URL.createObjectURL(file));
	};

	useImperativeHandle(ref, () => ({
		ejectVideo() {
			setVideoUrl(undefined);
		},
	}));

	return (
		<>
			{videoUrl
				? (
					<div>
						<video ref={props.videoRef} src={videoUrl}
							style={{width: 0, height: 0, position: 'absolute', top: 0, left: 0}}
							onCanPlay={() => {
								props.onCanPlay();
							}}
							autoPlay={autoPlay}
						/>
					</div>
				)
				: (
					<>
						<h1 className={'app-title'}>Image ASCII</h1>
						<div className={'mode-selector-container'}>
							<ModeResolutionSelector useAutoAspectRatio={useAutoAspectRatio}
								setUseAutoAspectRatio={setUseAutoAspectRatio}/>
						</div>

						<div className={'image-input-container'}>
							<div className={'image-settings'}>
								{
									useAutoAspectRatio
										? (
											<AutoResolutionSelector autoResolutionBase={autoResolutionBase}
												setAutoResolutionBase={setAutoResolutionBase}
												useLineBase={useLineBase}
												setUseLineBase={setUseLineBase}
											/>
										) : (
											<ManualResolutionSelector charsPerLine={manualCharsPerLine}
												charsPerColumn={manualCharsPerColumn}
												setCharsPerLine={setManualCharsPerLine}
												setCharsPerColumn={setManualCharsPerColumn}
											/>
										)
								}
							</div>
							<div className={'image-input-button'}>
								<input ref={inputRef} style={{display: 'none'}} type='file' accept='video/*'
									onChange={handleInputChange}/>
								<button className={'video-input-button'} onClick={() => {
									inputRef.current?.click();
								}}>Select video
								</button>
							</div>
						</div>

						<GitHubProjectPanel link={GITHUB_URL}
							author={AUTHOR}/>
					</>
				)
			}
		</>
	);
});

VideoHandler.displayName = 'VideoHandler';
