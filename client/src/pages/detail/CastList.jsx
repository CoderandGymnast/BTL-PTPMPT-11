const CastList = ({ casts }) => {
  return (
    <div className='casts'>
      {casts &&
        casts.map((cast) => (
          <div key={cast.id} className='casts__item'>
            <div
              className='casts__item__img'
              style={{ backgroundImage: `url(${cast.profilePath})` }}
            ></div>
            <p className='casts__item__name'>{cast.name}</p>
          </div>
        ))}
    </div>
  );
};

export default CastList;
