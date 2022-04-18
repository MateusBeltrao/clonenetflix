import React, {useEffect, useState} from 'react'
import './App.css'
import Tmdb from './Tmdb'
import Header from './components/header'
import MovieRow from './components/movieRow'
import FeaturedMovie from './components/FeaturedMovie'
const App = () => {

  const [movieList, setMoviesList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(()=>{
    const loadAll = async () => {
      //pegando a lista total
      let list = await Tmdb.getHomeList()
      setMoviesList(list)

      //pegando o Featured
      let originais = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random()*(originais[0].items.results.length - 1  ))
      let chosen = originais[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  },[])

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY> 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return()=>{
      window.removeEventListener('scroll', scrollListener)
    }
  },[])

  return (
    <div className='page'>

      <Header black={blackHeader}></Header>

      {featuredData &&
         <FeaturedMovie item={featuredData}></FeaturedMovie>
      }
     

      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
    
      <footer>
        Feito com coração<br/>
        Direito de imagem para Netflix<br/>
        Dados pegos do sites Themoviedb.org<br/>
        email: mateusbeltrao2019@gmail.com
      </footer>
        
      {movieList.length <= 0 && 
        <div className='loanding'> 
          <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif' alt='Carregando'></img>
        </div>
      }  
    </div>
  )
}

export default App