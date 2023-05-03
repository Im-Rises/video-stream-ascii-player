import React, {useState} from 'react';
import './VideoController.scss';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoController = (props: Props) => {
	// const frameTime = 1 / 30;
	// const [skipAheadBehindInterval, setSkipAheadBehindInterval] = useState(5);
	const [isPaused, setIsPaused] = useState(false);
	const togglePausePlay = async () => {
		if (props.videoRef.current?.paused) {
			await props.videoRef.current?.play();
			setIsPaused(false);
		} else {
			props.videoRef.current?.pause();
			setIsPaused(true);
		}
	};

	const handleVideoCursorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		if (props.videoRef.current) {
			props.videoRef.current.currentTime = value;
		}
	};

	const onVideoEnded = () => {
		setIsPaused(true);
	};

	// const moveVideoCursor = (offset: number) => {
	// 	if (props.videoRef.current) {
	// 		props.videoRef.current.currentTime += offset;
	// 	}
	// };

	return (
		<div className={'video-controller-panel'}>
			{/* checked={props.videoRef.current?.paused} */}
			<button className={`button-play-pause ${isPaused ? '' : 'paused'}`}
				onClick={togglePausePlay}/>
			<input type='range' value={props.videoRef.current?.currentTime} onChange={handleVideoCursorChange} min={0}
				max={props.videoRef.current?.duration}/>
			{/* <button onClick={() => { */}
			{/*	moveVideoCursor(-skipAheadBehindInterval); */}
			{/* }}>Skip behind */}
			{/* </button> */}
			{/* <button onClick={() => { */}
			{/*	moveVideoCursor(-frameTime); */}
			{/* }}>Previous frame */}
			{/* </button> */}
			{/* <button onClick={() => { */}
			{/*	moveVideoCursor(Number(frameTime)); */}
			{/* }}>Next frame */}
			{/* </button> */}
			{/* <button onClick={() => { */}
			{/*	moveVideoCursor(skipAheadBehindInterval); */}
			{/* } */}
			{/* }>Skip ahead */}
			{/* </button> */}
			{/* <span> */}
			{/*	<input type={'checkbox'} className={'custom-checkbox'} checked={props.videoRef.current!.loop} */}
			{/*		onChange={() => { */}
			{/*			props.videoRef.current!.loop = !props.videoRef.current!.loop; */}
			{/*		}} */}
			{/*	/> */}
			{/*	<label className='checkbox-label'>Loop</label> */}
			{/* </span> */}
			<span>
				<input type={'checkbox'} className={'custom-checkbox'} checked={props.videoRef.current!.muted}
					onChange={() => {
						props.videoRef.current!.muted = !props.videoRef.current!.muted;
					}}
				/>
				<label className='checkbox-label'>Mute</label>
			</span>
			<span>
				<input type={'range'} min={0} max={1} step={0.01} value={props.videoRef.current!.volume}
					onChange={e => {
						props.videoRef.current!.volume = parseFloat(e.target.value);
					}}/>
			</span>
			{/* <span> */}
			{/*	<select onChange={e => { */}
			{/*		props.videoRef.current!.playbackRate = parseFloat(e.target.value); */}
			{/*	}} value={props.videoRef.current!.playbackRate}> */}
			{/*		<option value={0.25}>0.25x</option> */}
			{/*		<option value={0.5}>0.5x</option> */}
			{/*		<option value={1}>1x</option> */}
			{/*		<option value={1.5}>1.5x</option> */}
			{/*		<option value={2}>2x</option> */}
			{/*	</select> */}
			{/* </span> */}
			{/* <span> */}
			{/*	<select onChange={e => { */}
			{/*		setSkipAheadBehindInterval(parseInt(e.target.value, 10)); */}
			{/*	}} value={skipAheadBehindInterval}> */}
			{/*		<option value={1}>1s</option> */}
			{/*		<option value={5}>5s</option> */}
			{/*		<option value={10}>10s</option> */}
			{/*		<option value={30}>30s</option> */}
			{/*	</select> */}
			{/* </span> */}
		</div>
	);
};

export default VideoController;
