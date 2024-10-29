import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCard = ({ title, category }) => {

          const[apiData, setApiData] = useState([])
          const cardsRef = useRef()

          const options = {
                    method: 'GET',
                    headers: {
                              accept: 'application/json',
                              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDAzNzFiNTQ0MWE0ODhhMzhiY2Q3M2U4ZTA1ZjVlZSIsIm5iZiI6MTczMDE4NjM3NC41NDgzNzgsInN1YiI6IjY3MjA4YjQyOWZmNjgxZDllMGE0YzkwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7hLCC80KrmCEigwAxSNvP6kC36j2N9A9_mbU0XUVC-4'
                    }
          };


          const handleWheel = (event) => {
                    event.preventDefault()
                    cardsRef.current.scrollLeft += event.deltaY
          }

          useEffect(() => {
                    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
                              .then(res => res.json())
                              .then(res => setApiData(res.results))
                              .catch(err => console.error(err));

                    cardsRef.current.addEventListener('wheel', handleWheel)
          }, [])

          return (
                    <div className='titlecards'>
                              <h2>{title ? title : "Popular on Netflix"}</h2>
                              <div className="card-list" ref={cardsRef}>
                                        {apiData.map((card, index) => {
                                                  return <Link to={`/player/${card.id}`} className="card" key={index}>
                                                            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                                                            <p>{card.original_title}</p>
                                                  </Link>
                                        })}
                              </div>
                    </div>
          )
}

export default TitleCard
