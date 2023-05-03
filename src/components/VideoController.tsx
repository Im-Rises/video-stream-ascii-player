import React, {useState} from 'react';
import './VideoController.scss';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
	replayOnEnd?: boolean;
};

const VideoController = (props: Props) => {
	const [isPaused, setIsPaused] = useState(props.videoRef.current!.paused);
	const [isMuted, setIsMuted] = useState(props.videoRef.current!.muted);
	const [volume, setVolume] = useState(props.videoRef.current!.volume);
	const [currentTime, setCurrentTime] = useState(0);
	const replayOnEnd = props.replayOnEnd ?? false;

	const togglePausePlay = async () => {
		if (props.videoRef.current?.paused) {
			await props.videoRef.current?.play();
			setIsPaused(false);
		} else {
			props.videoRef.current?.pause();
			setIsPaused(true);
		}
	};

	const toggleMute = () => {
		props.videoRef.current!.muted = !props.videoRef.current!.muted;
		setIsMuted(props.videoRef.current!.muted);
	};

	const handleVideoCursorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		if (props.videoRef.current) {
			props.videoRef.current.currentTime = value;
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.videoRef.current!.volume = parseFloat(e.target.value);
		setVolume(parseFloat(e.target.value));
	};

	const onVideoEnded = async () => {
		if (replayOnEnd) {
			await props.videoRef.current?.play();
			setIsPaused(false);
		} else {
			setIsPaused(true);
		}
	};

	props.videoRef.current?.addEventListener('ended', onVideoEnded);

	const onVideoTimeUpdate = () => {
		setCurrentTime(props.videoRef.current?.currentTime ?? 0);
	};

	props.videoRef.current?.addEventListener('timeupdate', onVideoTimeUpdate);

	// let spaceBarDown = false;
	// let isAwaiting = false;
	//
	// const onSpaceBarPress = async (e: KeyboardEvent) => {
	// 	if (e.code === 'Space' && !spaceBarDown && !isAwaiting) {
	// 		spaceBarDown = true;
	// 		isAwaiting = true;
	// 		await togglePausePlay();
	// 		isAwaiting = false;
	// 	}
	// };
	//
	// const onSpaceBarRelease = (e: KeyboardEvent) => {
	// 	if (e.code === 'Space') {
	// 		spaceBarDown = false;
	// 	}
	// };
	//
	// document.addEventListener('keydown', onSpaceBarPress);
	// document.addEventListener('keyup', onSpaceBarRelease);

	return (
		<div className={'video-controller-panel'}>
			<button className={`button-play-pause ${isPaused ? '' : 'paused'}`}
				onClick={togglePausePlay}/>
			<input type='range' className={'slider-video-position'}
				value={currentTime}
				onChange={handleVideoCursorChange} min={0}
				max={props.videoRef.current?.duration}>
			</input>
			<a className={`speaker ${isMuted ? 'mute' : ''}`} onClick={toggleMute}><span></span></a>
			<input type={'range'} min={0} max={1} step={0.01} value={volume}
				onChange={e => {
					handleVolumeChange(e);
				}}
			/>
		</div>
	);
};

export default VideoController;

// const frameTime = 1 / 30;
// const [skipAheadBehindInterval, setSkipAheadBehindInterval] = useState(5);

// {/* <button onClick={() => { */}
// {/*	moveVideoCursor(-skipAheadBehindInterval); */}
// {/* }}>Skip behind */}
// {/* </button> */}
// {/* <button onClick={() => { */}
// {/*	moveVideoCursor(-frameTime); */}
// {/* }}>Previous frame */}
// {/* </button> */}
// {/* <button onClick={() => { */}
// {/*	moveVideoCursor(Number(frameTime)); */}
// {/* }}>Next frame */}
// {/* </button> */}
// {/* <button onClick={() => { */}
// {/*	moveVideoCursor(skipAheadBehindInterval); */}
// {/* } */}
// {/* }>Skip ahead */}
// {/* </button> */}
// {/* <span> */}
// {/*	<input type={'checkbox'} className={'custom-checkbox'} checked={props.videoRef.current!.loop} */}
// {/*		onChange={() => { */}
// {/*			props.videoRef.current!.loop = !props.videoRef.current!.loop; */}
// {/*		}} */}
// {/*	/> */}
// {/*	<label className='checkbox-label'>Loop</label> */}
// {/* </span> */}
// {/* <span> */}
// {/*	<select onChange={e => { */}
// {/*		props.videoRef.current!.playbackRate = parseFloat(e.target.value); */}
// {/*	}} value={props.videoRef.current!.playbackRate}> */}
// {/*		<option value={0.25}>0.25x</option> */}
// {/*		<option value={0.5}>0.5x</option> */}
// {/*		<option value={1}>1x</option> */}
// {/*		<option value={1.5}>1.5x</option> */}
// {/*		<option value={2}>2x</option> */}
// {/*	</select> */}
// {/* </span> */}
// {/* <span> */}
// {/*	<select onChange={e => { */}
// {/*		setSkipAheadBehindInterval(parseInt(e.target.value, 10)); */}
// {/*	}} value={skipAheadBehindInterval}> */}
// {/*		<option value={1}>1s</option> */}
// {/*		<option value={5}>5s</option> */}
// {/*		<option value={10}>10s</option> */}
// {/*		<option value={30}>30s</option> */}
// {/*	</select> */}
// {/* </span> */}
