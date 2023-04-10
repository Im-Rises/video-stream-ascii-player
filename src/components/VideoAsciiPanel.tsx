import React, {useRef, useState} from 'react';
import VideoAscii from 'video-stream-ascii';

export const VideoAsciiPanel: React.FC = () => {
	const divVideoAsciiParentRef = useRef<HTMLDivElement>(null);
	const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
	const videoRef = useRef<HTMLVideoElement>(null);
	let frameRate = 30;
	let skipAheadBehindInterval = 5;
	// let videoCursor = 0;
	const [currentTime, setCurrentTime] = useState(0);

	const handleVideoCursorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		// videoCursor = value;
		setCurrentTime(value);
		if (videoRef.current) {
			videoRef.current.currentTime = value;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		setVideoUrl(URL.createObjectURL(file));
	};

	const moveVideoCursor = (offset: number) => {
		if (videoRef.current) {
			videoRef.current.currentTime += offset;
			setCurrentTime(videoRef.current.currentTime + offset);
		}
	};

	const togglePausePlay = async () => {
		if (videoRef.current?.paused) {
			await videoRef.current?.play();
		} else {
			videoRef.current?.pause();
		}
	};

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
						console.log('Hide resume button');
					}}
					onPause={() => {
						console.log('Show resume button');
					}}
					onEnded={() => {
						setCurrentTime(0);
					}}
					onChangeCapture={() => {
						console.log('New video cursor', videoRef.current?.currentTime);
					}
					}
					/>
				</div>
			)}
			{
				<div ref={divVideoAsciiParentRef} style={{width: '400px', height: '400px'}}>
					{isVideoReady && (
						<VideoAscii videoStreaming={videoRef.current!} parentRef={divVideoAsciiParentRef}
							charsPerLine={100}
							charsPerColumn={100} frameRate={30} fontColor={'white'} backgroundColor={'black'}/>)
					}
					<button onClick={togglePausePlay}>Play/Pause</button>
					<input type='range' value={currentTime} onChange={handleVideoCursorChange} min={0}
						max={videoRef.current?.duration}/>
					<button onClick={() => {
						moveVideoCursor(+1 / frameRate);
					}}>Next frame
					</button>
					<button onClick={() => {
						moveVideoCursor(-1 / frameRate);
					}}>Previous frame
					</button>
					{/* Button to skip to 5 seconds ahead */}
					<button onClick={() => {
						moveVideoCursor(skipAheadBehindInterval);
					}
					}>Skip ahead
					</button>
					<button onClick={() => {
						moveVideoCursor(-skipAheadBehindInterval);
					}}>Skip behind
					</button>
					{/* Selector to change the frame rate */}
					<select onChange={e => {
						const value = parseInt(e.target.value, 10);
						frameRate = value;
					}}
					value={frameRate}
					/>
					{/* Selector to change the video speed */}
					<select onChange={e => {
						videoRef.current!.playbackRate = parseFloat(e.target.value);
					}}/>
					{/* Selector to change the ahead/behind interval */}
					<select onChange={e => {
						skipAheadBehindInterval = parseInt(e.target.value, 10);
					}}/>
				</div>
			}
		</div>
	);
};
