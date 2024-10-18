import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import 'bootstrap/dist/css/bootstrap.min.css';


const DeleteAllBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('All the Books Deleted Successfully. Your List is Empty Now.', { variant: 'error' })
                navigate('/table')
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happend. Please Check console.');
                enqueueSnackbar('Error.', { variant: 'error' })
                console.log(error);
            });
    }

    const navigateHome = () => {
        setLoading(true);
        navigate('/table');
    };

    return (
        <div className=''>
            <h1 className="text-3xl my-4 text-center">Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="container-sm">
                <div className="flex flex-col border-2 border-sky-400 rounded-xl p-8 mx-auto md:w-1/2">
                    <h3 className="text-2xl text-center">Are you sure you want to delete all the books?<br /> It will clear your complete list.</h3>
                    <button className="p-2 bg-red-600 text-white w-auto my-8 rounded-xl hover:text-lg hover:font-bold hover:bg-red-700 hover:text-white" onClick={handleDeleteBook}>Yes | Delete All The Books</button>
                    <button className="p-2 bg-green-600 text-white w-auto mb-2 rounded-xl hover:text-lg hover:font-bold hover:bg-green-700 hover:text-white" onClick={navigateHome} >No | Keep All The Books</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAllBook