import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft } from 'react-icons/bs'


const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()

  const handleSaveBook = () => {
    const data = { title, author, publishYear, summary, }
    setLoading(true);
    axios
      .post(`http://localhost:5555/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully.', { variant: 'success' })
        navigate('/table')
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Invalid Credentials', { variant: 'error' })
        // console.log(error);
      });
  }

  return (
    <div className='p-4'>
      <div className="flex">
        <Link to='/table' className='bg-sky-800 hover:bg-sky-600 text-white px-4 py-1 rounded-lg w-fit '>
          <BsArrowLeft className="text-2xl hover:text-3xl hover:font-bold" />
        </Link>
      </div>
      <div className="container-sm">
        <h1 className="text-3xl my-4 text-center">Create Book</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 md:w-2/3 mx-auto">
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Title</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Author</span>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Publish Year</span>
            <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full' />
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Note</span>
            <textarea type="text" value={summary} onChange={(e) => setSummary(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full h-32 text-justify' />
          </div>
          <button className="p-2 bg-sky-300 my-6 rounded-xl hover:text-lg hover:font-bold hover:bg-sky-600 hover:text-white" onClick={handleSaveBook}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBook