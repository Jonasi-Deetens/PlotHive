import '../assets/styles/pages/Read/read.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BookContext } from '../providers/BookContext'
import star from '../assets/svgs/star.svg'
import { UserContext } from '../providers/UserContext'

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
  const [inFavourites, setInFavourites] = useState(false);
  
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
    console.log("z")
    const fetchedBook = getBookById(bookId)
    if (fetchedBook) {
      fetchedBook.contributions.sort((bookA, bookB) => {
        const dateA = new Date(bookA.created_at);
        const dateB = new Date(bookB.created_at);
        return dateA - dateB;
      })
      setBook(fetchedBook);
      
      if (book && user) { 
        if (book.contributions.length > 0)
          setNumberOfPages(Math.ceil(book.contributions.length / 5));
        else setNumberOfPages(1);
        setPageData();
  
        if (user.favourites.includes(book._id)) setInFavourites(true);
        else setInFavourites(false);
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
    const contributionsCopy = [...book.contributions];
    setPageContributions(contributionsCopy.slice(startIndex, endIndex));
  }

  const favourite = async () => {
    if (!inFavourites) {
      user.favourites.push(book._id);
    } else {
      const index = user.favourites.indexOf(book._id);
      if (index !== -1) {
        user.favourites.splice(index, 1);
      }
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/' + user._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          favourites: user.favourites
        })
      })
      if (response.ok) {
        inFavourites ? alert("Succesfully removed from favourites!") : alert("Succesfully added to favourites!");
        setInFavourites(!inFavourites);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <main className='read-page'>
      <h1 className='read-page-title'>{book && book.title}</h1>
      <section className='read-page-section'>
        <button className={inFavourites ? 'read-page-unfavourite' : 'read-page-favourite'} onClick={favourite}><img src={star} alt="icon of a star" /></button>
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