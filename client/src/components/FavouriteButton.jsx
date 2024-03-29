import '../assets/styles/components/FavouriteButton/favouritebutton.css'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../providers/UserContext';
import star from '../assets/svgs/star.svg'

const FavouriteButton = ({book}) => {
    const [inFavourites, setInFavourites] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            const index = user.favourites.indexOf(book._id);
            if (index !== -1) {
                setInFavourites(true)
            } else {
                setInFavourites(false)
            }
        }
    }, [user])
    

    const favourite = async () => {
        console.log(book)
        console.log(user)
        if (!inFavourites) {
          user.favourites.push(book._id);
        } else {
          const index = user.favourites.indexOf(book._id);
          if (index !== -1) {
            user.favourites.splice(index, 1);
          }
        }
    
        try {
          const response = await fetch('https://plothiveserver1-1y57tl0h.b4a.run/api/users/' + user._id, {
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
        <button className={"favourite-button " + (inFavourites ? 'favourite' : 'unfavourite')} onClick={favourite}><img className='favourite-image' src={star} alt="icon of a star" /></button>
    )
}

export default FavouriteButton