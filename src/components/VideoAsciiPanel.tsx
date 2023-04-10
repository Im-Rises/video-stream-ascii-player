import React, {useEffect, useRef, useState} from 'react';
import VideoAscii from 'video-stream-ascii';

export const VideoAsciiPanel: React.FC = () => {
	const divVideoAsciiParentRef = useRef<HTMLDivElement>(null);
	const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		setVideoUrl(URL.createObjectURL(file));
	};

	const togglePausePlay = async () => {
		if (videoRef.current?.paused) {
			await videoRef.current?.play();
		} else {
			videoRef.current?.pause();
		}
	};

	// useEffect(() => {
	// 	if (videoRef.current) {
	// 		videoRef.current.addEventListener('canplay', () => {
	// 			setIsVideoReady(true);
	// 			console.log('video is ready');
	// 		});
	// 	}
	//
	// 	console.log('videoRef.current', videoRef.current);
	// }, []);

	// const handlePlayClick = () => {
	// 	videoRef.current?.play().catch(e => {
	// 		console.log(e);
	// 	},
	// 	);
	// };
	//
	// const handlePauseClick = () => {
	// 	videoRef.current?.pause();
	// };

	// const handleRewindClick = () => {
	// 	videoRef.current.currentTime = 0;
	// };

	return (
		<div>
			<input type='file' accept='video/*' onChange={handleInputChange}/>
			{videoUrl && (
				<div>
					<video ref={videoRef} src={videoUrl} onCanPlay={() => {
						setIsVideoReady(true);
					}} onChange={
						e => {
							console.log('videoRef.current', videoRef.current);
						}
					}
					onPlay={() => {
						console.log('onPlay');
					}}
					onPause={() => {
						console.log('onPause');
					}}
					onEnded={() => {
						console.log('onEnded');
					}}
					/>
					<button onClick={togglePausePlay}>Play/Pause</button>
					{/* <button onClick={handlePlayClick}>Play</button> */}
					{/* <button onClick={handlePauseClick}>Pause</button> */}
					{/* <button onClick={handleRewindClick}>Rewind</button> */}
				</div>
			)}
			{
				<div ref={divVideoAsciiParentRef} style={{width: '400px', height: '400px'}}>
					{isVideoReady && (
						<VideoAscii videoStreaming={videoRef.current!} parentRef={divVideoAsciiParentRef}
							charsPerLine={100}
							charsPerColumn={100} frameRate={30} fontColor={'white'} backgroundColor={'black'}/>)
					}
				</div>
			}
		</div>
	);
};
