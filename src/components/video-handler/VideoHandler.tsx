import React, {forwardRef, useImperativeHandle, useState} from 'react';
import './VideoHandler.scss';

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
			{videoUrl ? (
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
						<h1 className={'app-title'}>Video ASCII Player</h1>
						<div className={'video-input-container'}>
							<input ref={inputRef} style={{display: 'none'}} type='file' accept='video/*'
								onChange={handleInputChange}/>
							<button className={'video-input-button'} onClick={() => {
								inputRef.current?.click();
							}}>Select video
							</button>
						</div>
					</>
				)
			}
		</>
	);
});

VideoHandler.displayName = 'VideoHandler';
