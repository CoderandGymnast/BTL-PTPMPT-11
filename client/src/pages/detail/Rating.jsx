import { Rating as RatingMU } from '@material-ui/lab';
import StarIcon from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import movieApi from '../../api/movieApi';
import getData from '../../api/handleApi/getData';

const StyledRating = withStyles({
  iconEmpty: {
    color: 'white',
    opacity: '0.5',
  },
})(RatingMU);

const Rating = ({ id }) => {
  const [star, setStar] = useState(0);

  useEffect(() => {
    const callback = (res) => {
      if (res.status === 200) {
        setStar(res.data.rating);
      }
    };
    getData(movieApi.getRatingByMovieId, callback, id);
  }, []);

  const handleChange = async (e, value) => {
    try {
      const dataSend = {
        movie: id,
        rating: value,
      };

      const { data } = await movieApi.setRatingMovie(dataSend);
      setStar(data.rating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledRating
      name='half-rating'
      size='large'
      value={star}
      precision={1}
      icon={<StarIcon />}
      onChange={handleChange}
    />
  );
};

export default Rating;
