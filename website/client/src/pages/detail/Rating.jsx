import { Rating as RatingMU } from '@material-ui/lab';
import StarIcon from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
import movieApi from '../../api/movieApi';

const StyledRating = withStyles({
  iconEmpty: {
    color: 'white',
    opacity: '0.5',
  },
})(RatingMU);

const Rating = ({ id, rating }) => {
  const [star, setStar] = useState(rating);

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
