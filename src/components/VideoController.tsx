import React, {useState} from 'react';
import './VideoController.scss';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
	onEjectVideo: () => void;
	replayOnEnd?: boolean;
};

const VideoController = (props: Props) => {
	const [isPaused, setIsPaused] = useState(props.videoRef.current!.paused);
	const [isMuted, setIsMuted] = useState(props.videoRef.current!.muted);
	const [volume, setVolume] = useState(props.videoRef.current!.volume);
	const [currentTime, setCurrentTime] = useState(0);
	const replayOnEnd = props.replayOnEnd ?? false;

	/* On user video buttons events */
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

	const ejectVideo = () => {
		props.onEjectVideo();
	};

	/* On user video event */
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

	/* Video events */
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
