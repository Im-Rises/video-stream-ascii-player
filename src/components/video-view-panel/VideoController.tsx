import React, {useState} from 'react';
import './VideoController.scss';

type Props = {
	videoRef: HTMLVideoElement;
	onEjectVideo: () => void;
	replayOnEnd?: boolean;
};

const VideoController = (props: Props) => {
	const [isPaused, setIsPaused] = useState(props.videoRef.paused);
	const [isMuted, setIsMuted] = useState(props.videoRef.muted);
	const [volume, setVolume] = useState(props.videoRef.volume);
	const [currentTime, setCurrentTime] = useState(0);
	const replayOnEnd = props.replayOnEnd ?? false;

	/* On user video buttons events */
	const togglePausePlay = async () => {
		if (props.videoRef.paused) {
			await props.videoRef.play();
			setIsPaused(false);
		} else {
			props.videoRef.pause();
			setIsPaused(true);
		}
	};

	const toggleMute = () => {
		props.videoRef.muted = !props.videoRef.muted;
		setIsMuted(props.videoRef.muted);
	};

	const ejectVideo = () => {
		props.onEjectVideo();
	};

	/* On user video event */
	const handleVideoCursorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		if (props.videoRef) {
			props.videoRef.currentTime = value;
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.videoRef.volume = parseFloat(e.target.value);
		setVolume(parseFloat(e.target.value));
	};

	/* Video events */
	const onVideoEnded = async () => {
		if (replayOnEnd) {
			await props.videoRef.play();
			setIsPaused(false);
		} else {
			setIsPaused(true);
		}
	};

	props.videoRef.addEventListener('ended', onVideoEnded);

	const onVideoTimeUpdate = () => {
		setCurrentTime(props.videoRef.currentTime ?? 0);
	};

	props.videoRef.addEventListener('timeupdate', onVideoTimeUpdate);

	return (
		<div className={'video-controller-panel'}>
			<button className={`button-play-pause ${isPaused ? '' : 'paused'}`}
				onClick={togglePausePlay}/>
			<input type='range' className={'slider-video-position'}
				value={currentTime}
				onChange={handleVideoCursorChange} min={0}
				max={props.videoRef.duration}>
			</input>
			<a className={`speaker ${isMuted ? 'mute' : ''}`} onClick={toggleMute}><span></span></a>
			<input type={'range'} className={'slider-video-volume'} min={0} max={1} step={0.01} value={volume}
				onChange={e => {
					handleVolumeChange(e);
				}}
			/>
			<button className={'button-eject-video'} onClick={ejectVideo}/>
		</div>
	);
};

export default VideoController;
