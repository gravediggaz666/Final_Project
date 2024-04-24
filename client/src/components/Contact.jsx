import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ car }) {
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState('');
  
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/user/${car.userRef}`);
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeller();
  }, [car.userRef]);
  
  return (
    <>
      {seller && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{seller.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{car.make} {car.model}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
            to={`mailto:${seller.email}?subject=Regarding ${car.make} ${car.model}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}
