const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios').default;
const result = [];
const numberMovie = 200;

const seed = () => {
  fs.createReadStream('links.csv')
    .pipe(csv())
    .on('data', (data) => result.push(data))
    .on('end', () => handleData(result));
};

const addOneMovie = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4f3e5667af42afee8ea72d481bbf557c&append_to_response=credits,videos`
    );
    const {
      title,
      overview,
      runtime,
      backdrop_path,
      poster_path,
      genres,
      credits,
      videos,
    } = data;
    const { cast } = credits;
    const { results } = videos;

    const genresArr = genres.map((genre) => genre.name);
    const castsArr = cast.slice(0, 6).map((c) => ({
      name: c.name,
      profilePath: 'https://image.tmdb.org/t/p/w200' + c.profile_path,
    }));
    const videosArr = results
      .filter((a) => a.site === 'YouTube')
      .slice(0, 6)
      .map((video) => ({
        name: video.name,
        videoPath: 'https://www.youtube.com/embed/' + video.key,
      }));

    const sendData = {
      title: title,
      description: overview,
      runtime: runtime,
      posterPath: 'https://image.tmdb.org/t/p/w500' + poster_path,
      backdropPath: 'https://image.tmdb.org/t/p/original' + backdrop_path,
      genres: genresArr,
      videos: videosArr,
      casts: castsArr,
    };

    // console.log(sendData);

    const { data: msg } = await axios.post(
      'http://localhost:5001/api/movies/create',
      sendData
    );

    console.log(msg);
  } catch (err) {
    console.log(err);
  }
};

const handleData = async (data) => {
  let count = 1;
  await addOneMovie(524434);
  const newArr = data.slice(0, numberMovie);
  for (const a of newArr) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${a.tmdbId}?api_key=4f3e5667af42afee8ea72d481bbf557c&append_to_response=credits,videos`
      );
      const {
        title,
        overview,
        runtime,
        backdrop_path,
        poster_path,
        genres,
        credits,
        videos,
      } = data;
      if (poster_path == null || backdrop_path == null) {
        throw new Error('image is empty');
      }
      const { cast } = credits;
      const { results } = videos;

      const genresArr = genres.map((genre) => genre.name);
      const castsArr = cast.slice(0, 6).map((c) => ({
        name: c.name,
        profilePath: 'https://image.tmdb.org/t/p/w200' + c.profile_path,
      }));
      const videosArr = results
        .filter((a) => a.site === 'YouTube')
        .slice(0, 6)
        .map((video) => ({
          name: video.name,
          videoPath: 'https://www.youtube.com/embed/' + video.key,
        }));

      const sendData = {
        title: title,
        description: overview,
        runtime: runtime,
        posterPath: 'https://image.tmdb.org/t/p/w500' + poster_path,
        backdropPath: 'https://image.tmdb.org/t/p/original' + backdrop_path,
        genres: genresArr,
        videos: videosArr,
        casts: castsArr,
      };

      // console.log(sendData);

      const { data: msg } = await axios.post(
        'http://localhost:5001/api/movies/create',
        sendData
      );

      if (msg === 'done') {
        console.log(msg + ' ' + count);
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log('Done all!!');
};

/*
const handleData1 = async (data) => {
  try {
    const { data } = await axios.get('http://localhost:5000/init');
    console.log(data);
  } catch (error) {
    console.log('cannot init');
    return;
  }
  let count = 1;
  await addOneMovie(524434);
  const newArr = data.slice(1, 20);
  for (const a of newArr) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${a.tmdbId}?api_key=4f3e5667af42afee8ea72d481bbf557c&append_to_response=credits,videos`
      );
      const {
        title,
        overview,
        runtime,
        backdrop_path,
        poster_path,
        genres,
        credits,
        videos,
      } = data;
      if (poster_path == null || backdrop_path == null) {
        throw new Error('image is empty');
      }
      const posterPath = 'https://image.tmdb.org/t/p/w500' + poster_path;

      const { data: urlPosterPath } = await axios.get(
        `http://localhost:5000/save_image?url=${posterPath}`
      );

      if (!urlPosterPath) throw new Error('url is empty');
      const fullPosterPath = `http://nn:9870/webhdfs/v1/ds/images/${urlPosterPath}?op=OPEN`;
      console.log(urlPosterPath);

      const fullBackDropPath =
        'https://image.tmdb.org/t/p/original' + backdrop_path;

      const { cast } = credits;
      const { results } = videos;

      const genresArr = genres.map((genre) => genre.name);
      const castsArr = cast.slice(0, 6).map((c) => ({
        name: c.name,
        profilePath: 'https://image.tmdb.org/t/p/w200' + c.profile_path,
      }));
      const videosArr = results
        .filter((a) => a.site === 'YouTube')
        .slice(0, 6)
        .map((video) => ({
          name: video.name,
          videoPath: 'https://www.youtube.com/embed/' + video.key,
        }));

      const sendData = {
        title: title,
        description: overview,
        runtime: runtime,
        posterPath: fullPosterPath,
        backdropPath: fullBackDropPath,
        genres: genresArr,
        videos: videosArr,
        casts: castsArr,
      };

      const { data: msg } = await axios.post(
        'http://localhost:5001/api/movies/create',
        sendData
      );

      if (msg === 'done') {
        console.log(msg + ' ' + count);
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log('Done all!!');
};
*/

seed();
