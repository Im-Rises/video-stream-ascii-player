import React, {useRef, useState} from 'react';
import VideoAscii from 'video-stream-ascii';
import './VideoAsciiPanel.scss';

export const VideoAsciiPanel: React.FC = () => {
	const divVideoAsciiParentRef = useRef<HTMLDivElement>(null);
	const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
	const [currentTime, setCurrentTime] = useState(0);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [charsPerLine, setCharsPerLine] = useState(200);
	const [charsPerColumn, setCharsPerColumn] = useState<number>(0);
	const [frameRate, setFrameRate] = useState(30);
	const [keepAspectRatio, setKeepAspectRatio] = useState(true);
	const [autoReplay, setAutoReplay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [skipAheadBehindInterval, setSkipAheadBehindInterval] = useState(5);

	const calculateCharsPerColumn = (video: HTMLVideoElement) => Math.round(charsPerLine * (video.videoHeight / video.videoWidth));

	const handleVideoCursorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
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
			{videoUrl && (
				<div>
					<video ref={videoRef} src={videoUrl}
						style={{width: 0, height: 0, position: 'absolute', top: 0, left: 0}}
						onCanPlay={() => {
							setIsVideoReady(true);
							setCharsPerColumn(calculateCharsPerColumn(videoRef.current!));
						}}
						onChange={
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
						}}
						onTimeUpdate={() => {
							setCurrentTime(videoRef.current?.currentTime || 0);
						}}
					/>
				</div>
			)}
			{
				<div ref={divVideoAsciiParentRef} className={'video-ascii-panel'}>
					{isVideoReady
						? (
							<div>
								<div>
									<VideoAscii videoStreaming={videoRef.current!} parentRef={divVideoAsciiParentRef}
										charsPerLine={charsPerLine}
										charsPerColumn={charsPerColumn} frameRate={frameRate}
										fontColor={'white'}
										backgroundColor={'black'}/>
								</div>
								<div className={'video-ascii-panel-controls'}>
									<button onClick={togglePausePlay}>Play/Pause</button>
									<input type='range' value={currentTime} onChange={handleVideoCursorChange} min={0}
										max={videoRef.current?.duration}/>
									<button onClick={() => {
										moveVideoCursor(-1 / frameRate);
									}}>Previous frame
									</button>
									<button onClick={() => {
										moveVideoCursor(+1 / frameRate);
									}}>Next frame
									</button>
									<button onClick={() => {
										moveVideoCursor(-skipAheadBehindInterval);
									}}>Skip behind
									</button>
									<button onClick={() => {
										moveVideoCursor(skipAheadBehindInterval);
									}
									}>Skip ahead
									</button>
									{/* <button type={'button'} onClick={() => { */}
									{/*	videoRef.current!.loop = !videoRef.current!.loop; */}
									{/* }}>Auto replay */}
									{/* </button> */}
									{/* <div> */}
									<input type={'checkbox'} className={'custom-checkbox'} checked={autoReplay}
										onChange={() => {
											videoRef.current!.loop = !videoRef.current!.loop;
											setAutoReplay(!autoReplay);
										}}
									/>
									<label className='checkbox-label'>Loop</label>
									{/* </div> */}
									{/* <select onChange={e => { */}
									{/*	const value = parseInt(e.target.value, 10); */}
									{/*	setFrameRate(value); */}
									{/* }} */}
									{/* value={frameRate} */}
									{/* > */}
									{/*	<option value={10}>10 fps</option> */}
									{/*	<option value={15}>15 fps</option> */}
									{/*	<option value={24}>24 fps</option> */}
									{/*	<option value={30}>30 fps</option> */}
									{/*	<option value={60}>60 fps</option> */}
									{/* </select> */}
									<select onChange={e => {
										videoRef.current!.playbackRate = parseFloat(e.target.value);
									}} value={speed}>
										<option value={0.25}>0.25x</option>
										<option value={0.5}>0.5x</option>
										<option value={1}>1x</option>
										<option value={1.5}>1.5x</option>
										<option value={2}>2x</option>
									</select>
									<select onChange={e => {
										setSkipAheadBehindInterval(parseInt(e.target.value, 10));
									}} value={skipAheadBehindInterval}>
										<option value={1}>1s</option>
										<option value={5}>5s</option>
										<option value={10}>10s</option>
										<option value={30}>30s</option>
									</select>
									<button onClick={() => {
										videoRef.current!.pause();
										setIsVideoReady(false);
										setVideoUrl(undefined);
										videoRef.current!.src = '';
									}
									}>Change video
									</button>
								</div>
							</div>
						)
						: (<input type='file' accept='video/*' onChange={handleInputChange}/>)
					}
				</div>
			}
		</div>
	);
};

