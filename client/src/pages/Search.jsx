import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarItem from '../components/CarItem';

export default function Search() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const makeFromUrl = urlParams.get('make');
    const modelFromUrl = urlParams.get('model');
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');
    const minYearFromUrl = urlParams.get('minYear');
    const maxYearFromUrl = urlParams.get('maxYear');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      makeFromUrl ||
      modelFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl ||
      minYearFromUrl ||
      maxYearFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        make: makeFromUrl || '',
        model: modelFromUrl || '',
        minPrice: minPriceFromUrl || '',
        maxPrice: maxPriceFromUrl || '',
        minYear: minYearFromUrl || '',
        maxYear: maxYearFromUrl || '',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchCars = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/car/search?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setCars(data);
      setLoading(false);
    };

    fetchCars();
  }, [location.search]);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('make', searchData.make);
    urlParams.set('model', searchData.model);
    urlParams.set('minPrice', searchData.minPrice);
    urlParams.set('maxPrice', searchData.maxPrice);
    urlParams.set('minYear', searchData.minYear);
    urlParams.set('maxYear', searchData.maxYear);
    urlParams.set('sort', searchData.sort);
    urlParams.set('order', searchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfCars = cars.length;
    const startIndex = numberOfCars;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/car/search?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setCars([...cars, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          {/* Add your search inputs here */}
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Search results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && cars.length === 0 && (
            <p className='text-xl text-slate-700'>No cars found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            cars &&
            cars.map((car) => <CarItem key={car._id} car={car} />)}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
