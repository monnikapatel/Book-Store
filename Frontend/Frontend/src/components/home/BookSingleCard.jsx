import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';


const BookSingleCard = ({ handleComplete, book }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div key={book._id} className='border-2 border-slate-300 rounded-lg px-4 pt-4 m-4 relative hover:shadow-xl'>
            <h2 className="absolute top-5 right-5 px-4 py-1 bg-red-300 rounded-lg ">{book.publishYear}</h2>

            <div className="flex justify-left ">
                <input className='accent-pink-500 w-4 h-4 hover:w-5 h-5' type="checkbox" defaultChecked={book.complete} onChange={() => handleComplete(book._id)} />
            </div>

            <div className='mt-4'>
                <div className="flex justify-start items-center gap-x-2">
                    <div>
                        <PiBookOpenTextLight className='text-red-300 text-2xl ' />
                    </div>
                    <h2 className="my-1 font-medium text-left">{book.title}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <div>
                        <BiUserCircle className='text-red-300 text-2xl' />
                    </div>
                    <h2 className="my-1 font-medium text-left">{book.author}</h2>
                </div>
                <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
                    <BiShow className="text-2xl text-blue-800 hover:text-blue-900 hover:text-3xl cursor-pointer" onClick={() => setShowModal(true)} />
                    <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-green-800 text-2xl hover:text-green-900 hover:text-3xl' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-yellow-600 text-2xl hover:text-yellow-700 hover:text-3xl' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-red-600 text-2xl hover:text-red-700 hover:text-3xl' />
                    </Link>
                </div>
                {
                    showModal && (<BookModal book={book} onClose={() => setShowModal(false)} />)
                }
            </div>
        </div>
    )
}

export default BookSingleCard