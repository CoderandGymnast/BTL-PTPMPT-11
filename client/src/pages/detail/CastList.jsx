import cast1 from '../../assets/images/cast1.jpg';
import cast2 from '../../assets/images/cast2.jpg';
import cast3 from '../../assets/images/cast3.jpg';
import cast4 from '../../assets/images/cast4.jpg';
import cast5 from '../../assets/images/cast5.jpg';

const casts = [
  {
    img: cast1,
    name: 'Elizabeta',
  },
  {
    img: cast2,
    name: 'Abraam',
  },
  {
    img: cast3,
    name: 'Arlette',
  },
  {
    img: cast4,
    name: 'Sandra',
  },
  {
    img: cast5,
    name: 'Erik',
  },
];

const CastList = () => {
  return (
    <div className='casts'>
      {casts.map((item, i) => (
        <div key={i} className='casts__item'>
          <div
            className='casts__item__img'
            style={{ backgroundImage: `url(${item.img})` }}
          ></div>
          <p className='casts__item__name'>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
