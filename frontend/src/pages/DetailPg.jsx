import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadMovieByIdAction } from '../redux/actions/movies.action';
import { useParams } from 'react-router-dom';
import { resetMovie } from '../redux/features/movieSlice';

const DetailPg = () => { const dispatch = useDispatch();
      const { id } = useParams();
    const movie=useSelector((state)=>state.movies.selectedMovie);
   useEffect(() => {
        const res = dispatch(asyncLoadMovieByIdAction(id))
        return () => {
            dispatch(resetMovie())
        }
    }, [id,dispatch])
    
  

    
    return (
        <div className='flex flex-col gap-sm'>
            {/* hero card */}
            <div className='w-full px-6'>

title : {console.log(movie.data)}
            </div>
            {/* trailer video */}
            <div>    <video controls autoPlay src="http://43.204.216.122:9000/VIDEO.mp4"></video>
            </div>
        </div>
    )
}

export default DetailPg