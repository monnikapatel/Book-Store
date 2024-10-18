import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft } from 'react-icons/bs'

const ShowBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex">
            <Link to='/table' className='bg-sky-800 hover:bg-sky-600 text-white px-4 py-1 rounded-lg w-fit '>
              <BsArrowLeft className="text-2xl hover:text-3xl hover:font-bold" />
            </Link>
          </div>
          <h1 className="text-3xl my-4 text-center">Show Book</h1>
          <div className="container-sm">
            <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 md:w-2/3 mx-auto ">
              <div className="my-4">
                <span className="text-xl mr-4 text-grey-500">Title: </span>
                <span>{books.title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-grey-500">Author: </span>
                <span>{books.author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-grey-500">Publish Year: </span>
                <span>{books.publishYear}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-grey-500">Create Time: </span>
                <span>{new Date(books.createdAt).toString()}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-grey-500">Last Update Time: </span>
                <span>{new Date(books.updatedAt).toString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook