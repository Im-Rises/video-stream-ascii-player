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
					<>
						<h1 className={'app-title'}>Video ASCII Player</h1>
						<div className={'video-input-container'}>
							<input type='file' accept='video/*' onChange={handleInputChange}/>
						</div>
						{/* <h1 className={'app-title'}>Video ASCII Player</h1> */}
						{/* <div className={'video-input-container'}> */}
						{/*	/!* <h2>Upload a video</h2> *!/ */}
						{/*	<input type='file' accept='video/*' onChange={handleInputChange}/> */}
						{/* </div> */}
						{/* <div className='container'> */}
						{/*	<div className='card'> */}
						{/*		<h3>Upload Files</h3> */}
						{/*		<div className='drop_box'> */}
						{/*			<header> */}
						{/*				<h4>Select File here</h4> */}
						{/*			</header> */}
						{/*			<p>Files Supported: MP4, AVI, MOV, and WMV</p> */}
						{/*			<input type='file' hidden accept='video/*' id='fileID' */}
						{/*				style={{display: 'none'}} onChange={handleInputChange}/> */}
						{/*			<button className='btn'>Choose File</button> */}
						{/*		</div> */}

						{/*	</div> */}
						{/* </div> */}
					</>
				)
			}
		</>
	);
};
