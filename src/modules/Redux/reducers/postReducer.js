import { CHANGECONTENT, FETCHTOPRATEDMOVIES, FINDCONTENT, SELECTEDMOVIE, SELECTEDMOVIECREDITS } from '../actions/types'

export const fetchTopRatedMovies = (pageNo,cat)=> dispatch =>{
  dispatch({
    type: FETCHTOPRATEDMOVIES,
    payload:{
      homeMovies:[],
      category:''
    }
  })
  let fethcUrl = fetch("https://api.themoviedb.org/3/movie/top_rated?&language=en-US&api_key=d51be8864b7575eedbf7cd6e416bcbb0&page="+pageNo);
    fethcUrl
    .then(value => value.json())
    .then(value =>{
      dispatch({
        type: FETCHTOPRATEDMOVIES,
        payload:{
          homeMovies:value,
          category:cat
        }
      })
    })
    }
export const fetchPopularMovies = (pageNo,cat)=> dispatch =>{
  dispatch({
    type: FETCHTOPRATEDMOVIES,
    payload:{
      homeMovies:[],
      category:''
    }
  })
  let fethcUrl = fetch("https://api.themoviedb.org/3/movie/popular?&language=en-US&api_key=d51be8864b7575eedbf7cd6e416bcbb0&page="+pageNo);
  fethcUrl
    .then(value => value.json())
    .then(value =>{
      dispatch({
        type: FETCHTOPRATEDMOVIES,
        payload:{
          homeMovies:value,
          category:cat
        }
      })
    })
}
export const fetchNowPlayingMovies = (pageNo,cat)=> dispatch =>{
  dispatch({
    type: FETCHTOPRATEDMOVIES,
    payload:{
      homeMovies:[],
      category:''
    }
  })
  let fethcUrl = fetch("https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=d51be8864b7575eedbf7cd6e416bcbb0&page="+pageNo);
  fethcUrl
    .then(value => value.json())
    .then(value =>{
      dispatch({
        type: FETCHTOPRATEDMOVIES,
        payload:{
          homeMovies:value,
          category:cat
        }
      })
    })
}
export const fetchSelectedMovie = (MovieId)=> dispatch =>{
  dispatch({
    type: SELECTEDMOVIE,
    payload:{
      selectedmovie:'',
      selectedmoviedetails:{}
    }
  })
  let strUrl = `https://api.themoviedb.org/3/movie/${MovieId}?language=en-US&api_key=d51be8864b7575eedbf7cd6e416bcbb0`;
  let fethcUrl = fetch(strUrl);
  fethcUrl
    .then(value => value.json())
    .then(value =>{
      dispatch({
        type: SELECTEDMOVIE,
        payload:{
          selectedmovie:MovieId,
          selectedmoviedetails:value
        }
      })
    })
}
export const fetchSelectedMovieCredits = (MovieId)=> dispatch =>{
  dispatch({
    type: SELECTEDMOVIECREDITS,
    payload:{
      selectedmoviecredits:{}
    }
  })
  let fethcUrl = fetch(`https://api.themoviedb.org/3/movie/${MovieId}/credits?api_key=d51be8864b7575eedbf7cd6e416bcbb0`);
  fethcUrl
    .then(value => value.json())
    .then(value =>{
      dispatch({
        type: SELECTEDMOVIECREDITS,
        payload:{
          selectedmoviecredits:value
        }
      })
    })
}
export const findAllContent = (searchstring,searchcontent,pageno)=> dispatch =>{
  dispatch({
    type: FINDCONTENT,
    payload:{
      searchstring:'',
      searchcontent:[],
      searchcategory:''
    }
  })
  let fethcUrl;
  switch (searchcontent) {

    case "tvshows":
      fethcUrl = fetch(`https://api.themoviedb.org/3/search/tv?api_key=d51be8864b7575eedbf7cd6e416bcbb0&language=en-US&query=${searchstring}&page=${pageno}`)
      fethcUrl
        .then(value => value.json())
        .then(value =>{
          dispatch({
            type: FINDCONTENT,
            payload:{
              searchstring:searchstring,
              searchcontent:value,
              searchcategory:searchcontent
            }
          })
        })
      break;
    case "movies":
      fethcUrl = fetch(`https://api.themoviedb.org/3/search/movie?api_key=d51be8864b7575eedbf7cd6e416bcbb0&language=en-US&query=${searchstring}&page=${pageno}`)
      fethcUrl
        .then(value => value.json())
        .then(value =>{
          dispatch({
            type: FINDCONTENT,
            payload:{
              searchstring:searchstring,
              searchcontent:value,
              searchcategory:searchcontent
            }
          })
        })
      break;
    default:
      fethcUrl = fetch(`https://api.themoviedb.org/3/search/multi?api_key=d51be8864b7575eedbf7cd6e416bcbb0&language=en-US&query=${searchstring}&page=${pageno}`)
      fethcUrl
        .then(value => value.json())
        .then(value =>{
          dispatch({
            type: FINDCONTENT,
            payload:{
              searchstring:searchstring,
              searchcontent:value,
              searchcategory:searchcontent
            }
          })
        })
  }
}
export const changeContentType = (content)=> dispatch =>{
  dispatch({
    type: CHANGECONTENT,
    payload:{
      searchcategory:content
    }
  })
}
