import { Link } from 'react-router-dom';
import { FaGasPump, FaCar, FaCalendarAlt } from 'react-icons/fa';

export default function CarItem({ car }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/car/${car._id}`}>
        <img
          src={
            car.imageUrls[0] ||
            'https://bringatrailer.com/wp-content/uploads/2020/02/1992_chevrolet_c1500_158324397444d6279D1E0BFE4-7EB1-4B15-93BC-CB61E7842546.jpeg' 
          }
          alt='car cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {car.make} {car.model}
          </p>
          <div className='flex items-center gap-1'>
            <FaCar className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {car.year}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {car.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            ${car.price.toLocaleString('en-US')}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {car.engine}
            </div>
            <div className='font-bold text-xs'>
              {car.transmission}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
