import '../assets/styles/pages/Read/read.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookContext } from '../providers/BookContext'

const Read = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get('id');
  const { getBookById } = useContext(BookContext);
  const [book, setBook] = useState(null);
  
  useEffect(() => {
    setBook(getBookById(bookId))
    if (book) {
      
    }
  }, [])

  return (
    <main className='read-page'>
      <h1 className='read-page-title'>{book && '"' + book.prompt_id.content + ',..."' }</h1>
      <section className='read-page-section'>
        <section className='read-page-text'>
          {book && book.contributions.map((contribution) => (
            <div className='read-page-contribution'>
              <p className='read-page-contribution-name'>{contribution.user_id.username}</p>
              <p className='read-page-contribution-text'>{contribution.text}</p>
            </div>
          ))}
        </section>
        <section className='read-page-select'>
          <button className='read-page-select-button'>{'<'}</button>
            <p>1/4</p>
          <button className='read-page-select-button'>{'>'}</button>
        </section>
      </section>
      <section className='read-page-buttons'>
        <Link to='/explore' className='read-page-button'>Back</Link>
        <Link to={book && '/write?' + book._id} className='read-page-button'>Contribute</Link>
      </section>
    </main>
  )
}

export default Read