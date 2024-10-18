import { AiOutlineClose } from "react-icons/ai"
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import 'bootstrap/dist/css/bootstrap.min.css';


const BookModal = ({ book, onClose }) => {
    return (
        <div className="container-sm">
            <div className="fixed bg-black/[0.35] top-0 left-0 right-0 bottom-0 z-50 mx-auto flex justify-center items-center" onClick={onClose}>
                <div onClick={(event) => event.stopPropagation()} className="md:w-1/3 bg-white rounded-xl p-4 flex flex-col relative mx-4 my-60 md:my-0">
                    <AiOutlineClose className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer" onClick={onClose} />

                    <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg font-medium">{book.publishYear}</h2>
                    <div className="flex justify-start items-center gap-x-2 mt-4">
                        <div>
                            <PiBookOpenTextLight className='text-red-300 text-2xl' />
                        </div>
                        <h2 className="my-1 font-medium text-left">{book.title}</h2>
                    </div>
                    <div className="flex justify-start items-center gap-x-2">
                        <div>
                            <BiUserCircle className='text-red-300 text-2xl' />
                        </div>
                        <h2 className="my-1 font-medium text-left">{book.author}</h2>
                    </div>

                    <p className="mt-4 text-left font-medium text-left">Note</p>
                    <p className="my-2 text-justify text-left">{book.summary}</p>

                </div>
            </div>
        </div>

    )
}

export default BookModal