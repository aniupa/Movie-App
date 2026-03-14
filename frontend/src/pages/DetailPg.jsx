import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadMovieByIdAction } from '../redux/actions/movies.action';
import { useParams } from 'react-router-dom';
import { resetMovie } from '../redux/features/movieSlice';
import ReactPlayer from "react-player";
const DetailPg = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useSelector((state) => state.movies.selectedMovie);
    useEffect(() => {
        const res = dispatch(asyncLoadMovieByIdAction(id))
        return () => {
            dispatch(resetMovie())
        }
    }, [id, dispatch])




    return (
        <div className='flex flex-col gap-sm'>
            {/* hero card */}
            <div className='w-full px-6'>

                title : {movie?.data?.title}
            </div>
            {/* trailer video */}
            <div>    
                <video className='w-full max-w-3xl' controls muted autoPlay >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type='video/mp4'/></video>
         
            </div>
        </div>
    )
}

export default DetailPg