import React, { useEffect, useRef } from 'react';

const VideoList = ({ videos }) => {
  return (
    <>
      {videos &&
        videos.map((video) => (
          <Video key={video.id} videoPath={video.videoPath} name={video.name} />
        ))}
    </>
  );
};

const Video = ({ videoPath, name }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 7) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className='video'>
      <div className='video__title'>
        <h2>{name}</h2>
      </div>
      <iframe
        src={videoPath}
        ref={iframeRef}
        width='100%'
        title='video'
      ></iframe>
    </div>
  );
};

export default VideoList;
