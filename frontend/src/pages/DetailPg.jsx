import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadMovieByIdAction, loadMovieTrailerAction } from '../redux/actions/movies.action';
import { useParams } from 'react-router-dom';
import { resetMovie } from '../redux/features/movieSlice';
import ScoreCircle from '../component/animations/ScoreCircle';
import { playArrowIcon } from '../assets/Svg';
import { useState } from 'react';
const apiKey = import.meta.env.VITE_TMDB_KEY;
// import Button from '../component/buttons/Button';
const DetailPg = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useSelector((state) => state.movies?.selectedMovie?.data);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        dispatch(asyncLoadMovieByIdAction(id))
        if (movie) dispatch(loadMovieTrailerAction(movie?.tmdb))
        return () => {
            dispatch(resetMovie())
        }
    }, [id, dispatch])


    const posterUrl = `https://image.tmdb.org/t/p/w500${movie?.imgUrl}`;
    // const ytVideoApi=`https://api.themoviedb.org/3/movie/${movie?.tmdb}/videos?api_key=${apiKey}`

    return (

        < >


            {/* movie hero card */}
            <section className="relative w-full min-h-screen flex items-center  overflow-hidden">

                {/* 🔥 BACKDROP */}
                <img
                    src={`https://api.themoviedb.org/3/movie/${movie?.thumbnail}?api_key=${apiKey}`}
                    alt="backdrop"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-md"
                />

                {/* 🔥 GRADIENT OVERLAY (IMPORTANT) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

                {/* 🔥 CONTENT WRAPPER */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

                    {/* 🎬 POSTER */}
                    <div className="flex-shrink-0">
                        <img
                            src={posterUrl}
                            alt={movie?.title}
                            className="w-72 rounded-xl shadow-2xl"
                        />
                    </div>

                    {/* 🎯 RIGHT CONTENT */}
                    <div className="text-white max-w-2xl">

                        {/* TITLE */}
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {movie?.title}
                            <span className="text-gray-400"> ({movie?.releaseYear})</span>
                        </h1>

                        {/* META */}
                        <div className="flex items-center gap-3 mt-3 text-sm text-gray-300">
                            <span className="border px-2 py-0.5 rounded">PG-13</span>
                            <span>{movie?.releaseYear}</span>
                            <span>•</span>
                            <span>{movie?.duration}m</span>
                        </div>

                        {/* SCORE + ACTIONS */}
                        <div className="flex items-center gap-6 mt-6">

                            <div className="flex items-center gap-2">
                                <ScoreCircle score={movie?.rating} outOFF="10" />
                                <span className="font-semibold">User Score</span>
                            </div>

                            {/* Play button */}
                            <button
                                onClick={() => setIsPlaying(prev => !prev)}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/20 transition"
                            >
                                ▶ {isPlaying ? "Hide Trailer" : "Play Trailer"}
                            </button>

                        </div>

                        {/* TAGLINE */}
                        <p className="mt-6 italic text-gray-300">
                            {movie?.tagline || "Believe in something bigger."}
                        </p>

                        {/* OVERVIEW */}
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold mb-2">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {movie?.description}
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <div className='relative w-full max-w-2xl aspect-video'>
                {isPlaying ? (<video className='aspect-video absolute inset-0 w-full h-full object-cover' controls autoPlay playsInline><source src={movie?.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'} type='video/mp4' /></video>) : (<div className='relative w-full h-full cursor-pointer'>
                    <img src={movie?.imgUrl} alt="poster" className='w-full h-full object-cover object-center' />

                </div>)}
            </div>

        </>
    )
}

export default DetailPg