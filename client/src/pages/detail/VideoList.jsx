import React, { useEffect, useRef } from 'react';

const VideoList = () => {
  return (
    <>
      <Video id='Pj0wz7zu3Ms' />
      <Video id='T6l3mM7AWew' />
      <Video id='dQw4w9WgXcQ' />
      <Video id='46pra8NwhzU' />
    </>
  );
};

const Video = ({ id }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 7) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className='video'>
      <div className='video__title'>
        <h2>Official Teaser Trailer</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        ref={iframeRef}
        width='100%'
        title='video'
      ></iframe>
    </div>
  );
};

export default VideoList;
