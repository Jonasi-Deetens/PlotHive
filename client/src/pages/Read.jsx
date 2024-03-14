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
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [pageContributions, setPageContributions] = useState(null);
  
  useEffect(() => {
    const fetchedBook = getBookById(bookId)
    fetchedBook.contributions.sort((bookA, bookB) => {
      const dateA = new Date(bookA.created_at);
      const dateB = new Date(bookB.created_at);
      return dateB - dateA;
    })
    console.log(page);
    console.log(fetchedBook.contributions)
    setBook(fetchedBook);
    
    if (book) { 
      setNumberOfPages(book.contributions.length / 2);
      setPageData();
    }
  }, [book])

  useEffect(() => {
    if (book) setPageData();
  }, [page])

  const nextPage = () => {
    setPage(prevPage => {
      if ((prevPage + 1) <= numberOfPages)
        return prevPage + 1;
      else return 1;
    });
  }

  const previousPage = () => {
    setPage(prevPage => {
      if ((prevPage - 1) >= 1)
        return prevPage - 1;
      else return numberOfPages;
    });
  }

  const setPageData = () => {
    const startIndex = (page - 1) * 2;
    const endIndex = startIndex + 2; 
    const contributionsCopy = [...book.contributions];
    setPageContributions(contributionsCopy.slice(startIndex, endIndex));
  }

  return (
    <main className='read-page'>
      <h1 className='read-page-title'>{book && '"' + book.prompt_id.content + ',..."' }</h1>
      <section className='read-page-section'>
        <section className='read-page-text'>
          {pageContributions && pageContributions.map((contribution) => (
            <div className='read-page-contribution'>
              <p className='read-page-contribution-name'>{contribution.user_id.username}</p>
              <p className='read-page-contribution-text'>{contribution.text}</p>
            </div>
          ))}
        </section>
        <section className='read-page-select'>
          <button onClick={previousPage} className='read-page-select-button'>{'<'}</button>
            <p>{page + '/' + numberOfPages}</p>
          <button onClick={nextPage} className='read-page-select-button'>{'>'}</button>
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