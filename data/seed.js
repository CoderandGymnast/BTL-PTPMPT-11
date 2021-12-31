const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios').default;
const result = [];

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
      'http://localhost:5000/api/movies/create',
      sendData
    );

    console.log(msg);
  } catch (err) {
    console.log(err);
  }
};

const handleData = async (data) => {
  let count = 1;
  // await addOneMovie(524434);
  const newArr = data.slice(50, 100);
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
      console.log(backdrop_path);
      console.log(poster_path);
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
        'http://localhost:5000/api/movies/create',
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

seed();
