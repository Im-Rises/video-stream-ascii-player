import React, {useState} from 'react';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
	// currentTime: number;
};

const VideoController = (props: Props) => {
	const frameTime = 1 / 30;
	const [skipAheadBehindInterval, setSkipAheadBehindInterval] = useState(5);
	const togglePausePlay = async () => {
		if (props.videoRef.current?.paused) {
			await props.videoRef.current?.play();
		} else {
			props.videoRef.current?.pause();
		}
	};

	const handleVideoCursorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		// setCurrentTime(value);
		if (props.videoRef.current) {
			props.videoRef.current.currentTime = value;
		}
	};

	const moveVideoCursor = (offset: number) => {
		if (props.videoRef.current) {
			props.videoRef.current.currentTime += offset;
			// setCurrentTime(videoRef.current.currentTime + offset);
		}
	};

	return (
		<div className={'video-ascii-panel-controls'}>
			<button onClick={togglePausePlay}>Play/Pause</button>
			<input type='range' value={props.videoRef.current?.currentTime} onChange={handleVideoCursorChange} min={0}
				max={props.videoRef.current?.duration}/>
			<button onClick={() => {
				moveVideoCursor(-frameTime);
			}}>Previous frame
			</button>
			<button onClick={() => {
				moveVideoCursor(Number(frameTime));
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
			<button type={'button'} onClick={() => {
				props.videoRef.current!.loop = !props.videoRef.current!.loop;
			}}>Auto replay
			</button>
			<div>
				<input type={'checkbox'} className={'custom-checkbox'} checked={props.videoRef.current!.loop}
					onChange={() => {
						props.videoRef.current!.loop = !props.videoRef.current!.loop;
					}}
				/>
				<label className='checkbox-label'>Loop</label>
			</div>
			<div>
				<input type={'checkbox'} className={'custom-checkbox'} checked={props.videoRef.current!.muted}
					onChange={() => {
						props.videoRef.current!.muted = !props.videoRef.current!.muted;
					}}
				/>
				<label className='checkbox-label'>Mute</label>
			</div>
			<div>
				<input type={'range'} min={0} max={1} step={0.01} value={props.videoRef.current!.volume}
					onChange={e => {
						props.videoRef.current!.volume = parseFloat(e.target.value);
					}}/>
			</div>
			<div>
				<select onChange={e => {
					props.videoRef.current!.playbackRate = parseFloat(e.target.value);
				}} value={props.videoRef.current!.playbackRate}>
					<option value={0.25}>0.25x</option>
					<option value={0.5}>0.5x</option>
					<option value={1}>1x</option>
					<option value={1.5}>1.5x</option>
					<option value={2}>2x</option>
				</select>
			</div>
			<div>
				<select onChange={e => {
					setSkipAheadBehindInterval(parseInt(e.target.value, 10));
				}} value={skipAheadBehindInterval}>
					<option value={1}>1s</option>
					<option value={5}>5s</option>
					<option value={10}>10s</option>
					<option value={30}>30s</option>
				</select>
			</div>

			{/* <button onClick={() => { */}
			{/*	videoRef.current!.pause(); */}
			{/*	setIsVideoReady(false); */}
			{/*	setVideoUrl(undefined); */}
			{/*	videoRef.current!.src = ''; */}
			{/* } */}
			{/* }>Change video */}
			{/* </button> */}
		</div>
	);
};

export default VideoController;