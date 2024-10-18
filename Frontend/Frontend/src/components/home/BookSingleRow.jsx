import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';
import { BiShow } from 'react-icons/bi';
import { useState } from 'react';


const BookSingleRow = ({ handleComplete, book, index }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <tr key={book._id} className="h-8">
            <td className="border-2 border-slate-300 rounded-md text-center w-[5%] p-2">{index + 1}</td>
            <td className="border-2 border-slate-300 rounded-md text-center  p-2">{book.title}</td>
            <td className="border-2 border-slate-300 rounded-md text-center w-[20%] p-2">{book.author}</td>
            <td className="border-2 border-slate-300 rounded-md text-center w-[10%] p-2">{book.publishYear}</td>
            <td className="border-2 border-slate-300 rounded-md text-center w-[10%] p-2">
                <div className="flex justify-center">
                    <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-green-800 text-2xl hover:text-green-900 hover:text-3xl" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-yellow-600 text-2xl mx-2 hover:text-yellow-700 hover:text-3xl" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-red-600 text-2xl hover:text-red-700 hover:text-3xl" />
                    </Link>
                </div>
            </td>
            <td className="border-2 border-slate-300 rounded-md text-center p-2 w-[8%]">
                <div className="flex justify-center ">
                    <BiShow className="text-2xl text-blue-800 hover:text-blue-900 hover:text-3xl cursor-pointer" onClick={() => setShowModal(true)} />
                </div>
                {showModal && (<BookModal book={book} onClose={() => setShowModal(false)} />)}
            </td>
            <td className="border-2 border-slate-300 rounded-md text-center w-[6%] p-2">
                <div className="flex justify-center ">
                    <input className='accent-pink-500 w-4 h-4 hover:w-5 h-5' type="checkbox" defaultChecked={book.complete} onChange={() => handleComplete(book._id)} />
                </div>
            </td>
        </tr>
    )
}

export default BookSingleRow