import React, {useState} from 'react';
import './VideoHandler.scss';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
	onCanPlay: () => void;
	autoPlay?: boolean;
};

export const VideoHandler = (props: Props) => {
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
	const autoPlay = props.autoPlay ?? true;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		setVideoUrl(URL.createObjectURL(file));
	};

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
					<div className={'video-input-container'}>
						<input type='file' accept='video/*' onChange={handleInputChange}/>
					</div>
				)
			}
		</>
	);
};
