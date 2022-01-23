import { Button, Snackbar, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './create.scss';
import { Alert } from '@material-ui/lab';

let casts = [
  {
    name: 'Patrick Swayze',
    profilePath:
      'https://image.tmdb.org/t/p/w200/ys8dRhQRsS0nLPTXXEHyuFhXCYO.jpg',
  },
  {
    name: 'Mary Elizabeth Mastrantonio',
    profilePath:
      'https://image.tmdb.org/t/p/w200/vbZ1E557K5oj34xLHR5ErO8wPCi.jpg',
  },
  {
    name: 'Joseph Mazzello',
    profilePath:
      'https://image.tmdb.org/t/p/w200/44gsv7TlXOOKDGg5aRtqxZjM9ae.jpg',
  },
  {
    name: 'David Marshall Grant',
    profilePath:
      'https://image.tmdb.org/t/p/w200/81E0yZVUrojvq10qKRdSvNkq9up.jpg',
  },
  {
    name: 'Jay O. Sanders',
    profilePath:
      'https://image.tmdb.org/t/p/w200/z8btmLryEZlLkBah2XhZFydmty4.jpg',
  },
  {
    name: "Michael O'Keefe",
    profilePath:
      'https://image.tmdb.org/t/p/w200/wQsTL887RWvAJljzLhiPP52kjec.jpg',
  },
];

const Create = () => {
  const [posterPath, setPosterPath] = useState('');
  const [backdropPath, setbackdropPath] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [runtime, setRuntime] = useState('');
  const [genres, setGenres] = useState('');
  const [videoName, setVideoName] = useState('');
  const [videoPath, setVideoPath] = useState('');

  const [openSB, setOpenSB] = useState(false);
  const [msgSB, setMsbSB] = useState('hehe');
  const [typeSB, setTypeSB] = useState('success');
  const [loading, setLoading] = useState(false);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSB(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const genresArr = genres.split('-').map((string) => string.trim());
      const videosArr = [
        {
          name: videoName,
          videoPath:
            'https://www.youtube.com/embed/' +
            videoPath.slice(videoPath.indexOf('?v=') + 3),
        },
      ];
      const castsArr = shuffle(casts);
      const sendData = {
        title,
        description,
        runtime,
        posterPath,
        backdropPath,
        genres: genresArr,
        videos: videosArr,
        casts: castsArr,
      };

      //   console.log(sendData);
      const res = await axios.post(
        'http://localhost:5001/api/movies/create',
        sendData
      );

      if (res.includes('movie already exist')) {
        throw new Error('Movie already exist');
      }

      setMsbSB(`Add movie: ${title} success!!`);
      setTypeSB('success');
      setPosterPath('');
      setbackdropPath('');
      setTitle('');
      setDescription('');
      setRuntime('');
      setGenres('');
      setVideoName('');
      setVideoPath('');
    } catch (error) {
      console.log(error);
      setMsbSB(error.message);
      setTypeSB('error');
    }

    setOpenSB(true);
    setLoading(false);
  };
  return (
    <div className='create_wrapper'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSB}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={typeSB}
          elevation={6}
          variant='filled'
        >
          {msgSB}
        </Alert>
      </Snackbar>
      <form
        className='container'
        autoComplete='off'
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className='title'>New Movie</h1>
        <div className='row'>
          <TextField
            required
            helperText='Url image'
            variant='outlined'
            label='Poster Path'
            style={{ margin: '0 8px 0 0' }}
            type='url'
            value={posterPath}
            onChange={(e) => setPosterPath(e.target.value)}
          />
          <TextField
            required
            helperText='Url image'
            variant='outlined'
            label='BackDrop Path'
            type='url'
            style={{ margin: '0 0 0 8px' }}
            value={backdropPath}
            onChange={(e) => setbackdropPath(e.target.value)}
          />
        </div>
        <div className='row'>
          <TextField
            required
            style={{ margin: '0 8px 0 0' }}
            helperText='Title'
            variant='outlined'
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            style={{ margin: '0 0 0 8px' }}
            type='number'
            helperText='In Minutes'
            variant='outlined'
            label='Duration'
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
          />
        </div>
        <div className='row'>
          <TextField
            required
            helperText='Description'
            variant='outlined'
            label='Description'
            multiline
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='row'>
          <TextField
            required
            fullWidth
            helperText="Seperate by '-', eg: Action-TV Show-Adventure"
            variant='outlined'
            label='Genres'
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
        </div>
        <div className='row'>
          <TextField
            required
            helperText='Name'
            variant='outlined'
            label='Video Name'
            style={{ margin: '0 8px 0 0' }}
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
          />
          <TextField
            required
            helperText="YouTube's Url Video"
            variant='outlined'
            label="YouTube's Video"
            type='url'
            style={{ margin: '0 0 0 8px' }}
            value={videoPath}
            onChange={(e) => setVideoPath(e.target.value)}
          />
        </div>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          className='create'
          disabled={loading}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default Create;
