import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadMovieByIdAction, loadMovieTrailerAction } from '../redux/actions/movies.action';
import { useParams } from 'react-router-dom';
import { resetMovie } from '../redux/features/movieSlice';
import ScoreCircle from '../component/animations/ScoreCircle';
import { useState } from 'react';
import VideoPlayer from '../component/VideoPlayer';
const apiKey = import.meta.env.VITE_TMDB_API;
const DetailPg = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useSelector((state) => state.movies?.selectedMovie?.data);
    const trailer = useSelector((state) => state.movies?.trailer);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        dispatch(asyncLoadMovieByIdAction(id))
        return () => {
            dispatch(resetMovie())
        }
    }, [id, dispatch])
    useEffect(() => {
        if (movie?.tmdbId) dispatch(loadMovieTrailerAction(movie?.tmdbId))
    }, [movie?.tmdbId, dispatch])


    const posterUrl = `https://image.tmdb.org/t/p/w500${movie?.imgUrl}`;
    const thumbnail = `https://image.tmdb.org/t/p/w500${movie?.thumbnail}`;
    return (

        < >


            {/* movie hero card */}
            <section className="relative w-full min-h-screen flex items-center  overflow-hidden">

                {/* 🔥 BACKDROP */}
                <img
                    src={thumbnail}
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
                                onClick={() => setIsPlaying(true)}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/20 transition"
                            >
                                ▶ Play Trailer
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

                        {isPlaying && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur"
                                onClick={() => setIsPlaying(false)}
                            >
                                <div
                                    className="w-full max-w-5xl aspect-video"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <VideoPlayer
                                        videoKey={trailer?.key}
                                        poster={thumbnail}
                                    />
                                </div>


                            </div>
                        )}
                    </div>

                </div>
            </section>




        </>
    )
}

export default DetailPg