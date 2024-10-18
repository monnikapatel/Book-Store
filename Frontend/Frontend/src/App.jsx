import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Table from './pages/Table';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import DeleteAllBook from './pages/DeleteAllBook';

// Standard React component in JSX
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/table' element={<Table />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/delete' element={<DeleteAllBook />} />
    </Routes>
  );
};

export default App;
