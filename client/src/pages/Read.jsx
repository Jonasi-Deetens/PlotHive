import '../assets/styles/pages/Read/read.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookContext } from '../providers/BookContext'
import { UserContext } from '../providers/UserContext'
import FavouriteButton from '../components/FavouriteButton'

const Read = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get('id');

  const { user, authUser } = useContext(UserContext);
  const { getBookById } = useContext(BookContext);
  const [book, setBook] = useState(null);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [pageContributions, setPageContributions] = useState(null);

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          console.log('a')
          const checkAuth = await authUser();
          if (!checkAuth) {
            navigate("/Login");
          }
        }
      } catch (error) {
        console.error("Failed to authenticate");
      }
    };

    isAuthorized();
  }, [user, authUser]);

  useEffect(() => {
    const fetchedBook = getBookById(bookId)
    if (fetchedBook) {
      fetchedBook.sections.sort((bookA, bookB) => {
        const dateA = new Date(bookA.created_at);
        const dateB = new Date(bookB.created_at);
        return dateA - dateB;
      })
      setBook(fetchedBook);
      
      if (book && user) { 
        if (book.sections.length > 0)
          setNumberOfPages(Math.ceil(book.sections.length / 5));
        else setNumberOfPages(1);
        setPageData();
      }
    }
  }, [book, user])

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
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5; 
    const contributionsCopy = [...book.sections];
    setPageContributions(contributionsCopy.slice(startIndex, endIndex));
  }

  const genresToString = () => {
    if (book) {
      console.log("in genresToString")
      let genres = "("
      
      book.genres.forEach((genre, index) => {
        if (index === 0) genres += genre.title;
        else {
          genres += ", " + genre.title
        }
      })

      genres += ")";
      return genres;
    }
    return "";
  }

  return (
    <main className='read-page'>
      <h1 className='read-page-title'>{book && book.title}</h1>
      <p className='read-page-genres'>{genresToString()}</p>
      <section className='read-page-section'>
        { book && <FavouriteButton book={book} /> }
        <section className='read-page-text'>
          {(book && page == 1) && <p className='read-page-prompt'>{'"' + book.prompt_id.content + ',..."'} </p>}
          {pageContributions && pageContributions.map((contribution) => (
            <div className='read-page-contribution'>
              <p className='read-page-contribution-name'>{contribution.user_id.username}</p>
              <div className='read-page-text-html' dangerouslySetInnerHTML={{ __html: contribution.text }}></div>
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
        <Link to={book && '/write?id=' + book._id} className='read-page-button'>Contribute</Link>
      </section>
    </main>
  )
}

export default Read