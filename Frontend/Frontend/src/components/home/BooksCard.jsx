import BookSingleCard from './BookSingleCard';
import React from 'react';


const BooksCard = ({ books, handleCheck }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((item) => (
                <BookSingleCard key={item._id} book={item} handleComplete={handleCheck} />
            ))}
        </div>
    )
}

export default BooksCard