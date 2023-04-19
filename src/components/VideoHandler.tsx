import React, {useState} from 'react';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
	onCanPlay: () => void;
	onTimeUpdate: () => void;
};

export const VideoHandler = (props: Props) => {
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		setVideoUrl(URL.createObjectURL(file));
	};

	return (
		<>
			{videoUrl && (
				<div>
					<video ref={props.videoRef} src={videoUrl}
						style={{width: 0, height: 0, position: 'absolute', top: 0, left: 0}}
						onCanPlay={() => {
							props.onCanPlay();
						}}
						// onChange={
						// 	e => {
						// 		console.log('videoRef.current', props.videoRef.current);
						// 	}
						// }
						// onPlay={() => {
						// 	console.log('Hide resume button');
						// }}
						// onPause={() => {
						// 	console.log('Show resume button');
						// }}
						// onEnded={() => {
						// 	props.onTimeUpdate();
						// }}
						// onChangeCapture={() => {
						// 	console.log('New video cursor', props.videoRef.current?.currentTime);
						// }}
						onTimeUpdate={() => {
							props.onTimeUpdate();
						}}
						autoPlay={true}
					/>
				</div>
			)}
			<input type='file' accept='video/*' onChange={handleInputChange}/>
		</>
	);
};
