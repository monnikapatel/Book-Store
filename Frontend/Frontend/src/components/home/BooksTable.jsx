import BookSingleRow from './BookSingleRow';

const BooksTable = ({ books, handleCheck }) => {
    return (
        <table className="overflow-x-auto border-separate border-spacing-2 w-full">
            <thead className="w-fit">
                <tr>
                    <th className="border-2 border-slate-500 rounded-md text-center w-[5%] p-1">No</th>
                    <th className="border-2 border-slate-500 rounded-md text-center p-1">Title</th>
                    <th className="border-2 border-slate-500 rounded-md text-center w-[20%] p-1">Author</th>
                    <th className="border-2 border-slate-500 rounded-md text-center w-[10%] p-1">Publish Year</th>
                    <th className="border-2 border-slate-500 rounded-md text-center w-[10%] p-1">Operations</th>
                    <th className="border-2 border-slate-500 rounded-md text-center w-[8%] p-1">Details</th>
                    <th className="border-2 border-slate-500 rounded-md text-center w-[6%] p-1">Done</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <BookSingleRow key={book._id} book={book}
                        index={index} handleComplete={handleCheck} />
                ))}
            </tbody>
        </table>
    )
}

export default BooksTable