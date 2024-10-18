import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { useSnackbar } from 'notistack';
import Footer from '../components/Footer';


const Table = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleCheckComplete = (id) => {
    axios
      .put(`http://localhost:5555/books/complete/${id}`)
      .then((response) => {
        console.log(response.data)
        if (response.data === true) {
          enqueueSnackbar('Reading Book Completed', { variant: 'success' })
        }
        else {
          enqueueSnackbar('Reading Book is Not Completed', { variant: 'error' })
        }
      })
      .catch((error) => {
        enqueueSnackbar('Error.', { variant: 'error' })
        console.log(error);
      });
  }

  return (
    <div >
      {loading ? <Spinner /> : showType === 'table' ? (
        <div>
          <div className="text-center text-white py-3 bg-sky-800 border-y-2 border-sky-900">
            <Link to='/' className="text-4xl font-bold hover:font-extrabold hover:text-rose-200 mx-3 my-auto">
              Book Store
            </Link>
          </div>
          <div className="p-4 mb-16">
            <div className='flex place-content-between'>
              <div className="flex m-2 gap-x-4">
                <button className="bg-sky-400 hover:bg-sky-600 hover:font-bold hover:text-white hover:text-lg px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>Table</button>
                <button className="bg-sky-400 hover:bg-sky-600 hover:font-bold hover:text-white hover:text-lg px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>Card</button>
              </div>
              <Link to='/books/create'>
                <MdOutlineAddBox className="text-sky-700 text-4xl m-1 hover:text-sky-800 hover:text-5xl" />
              </Link>
            </div>
            <div className="overflow-x-auto overflow-y-auto">
              <BooksTable books={books} handleCheck={handleCheckComplete} />
            </div>
            <div className="flex m-2 justify-content-center">
              <Link to={`/books/delete`}>
                <button className="bg-red-600 text-white hover:bg-red-700 hover:font-bold hover:text-white hover:text-lg px-4 py-1 rounded-lg ">Delete All Books</button>
              </Link>
            </div>
          </div>
          <div className="fixed-bottom">
            <Footer />
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center text-white py-3 bg-sky-800 border-y-2 border-sky-900">
            <Link to='/' className="text-4xl font-bold hover:font-extrabold hover:text-rose-200 mx-3 my-auto">
              Book Store
            </Link>
          </div>
          <div className="p-4 mb-16">
            <div className='flex place-content-between'>
              <div className="flex m-2 gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 hover:font-bold hover:text-white hover:text-lg px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>Table</button>
                <button className="bg-sky-300 hover:bg-sky-600 hover:font-bold hover:text-white hover:text-lg px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>Card</button>
              </div>
              <Link to='/books/create'>
                <MdOutlineAddBox className="text-sky-700 text-4xl m-1 hover:text-sky-800 hover:text-5xl" />
              </Link>
            </div>
            <BooksCard books={books} handleCheck={handleCheckComplete} />
            <div className="flex m-2 justify-content-center">
              <Link to={`/books/delete`}>
                <button className="bg-red-600 text-white hover:bg-red-700 hover:font-bold hover:text-white hover:text-lg px-4 py-1 rounded-lg ">Delete All Books</button>
              </Link>
            </div>
          </div>
          <div className="fixed-bottom">
            <Footer />
          </div>
        </div>
      )}

    </div >
  )
}

export default Table