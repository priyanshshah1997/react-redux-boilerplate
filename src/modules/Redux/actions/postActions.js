import { CHANGECONTENT, FETCHTOPRATEDMOVIES, FINDCONTENT, SELECTEDMOVIE, SELECTEDMOVIECREDITS } from './types'

const initialState = {
  homeMovies:[],
  category:'',
  selectedmovie:'',
  selectedmoviedetails:{},
  selectedmoviecredits:'',
  findcontent:{
    searchstring:'',
    searchcontent:[],
    searchcategory:''
  },
  searchcategory:''
}

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCHTOPRATEDMOVIES:
      return {
        ...state,
        homeMovies:action.payload.homeMovies.results,
        category:action.payload.category,
      }
    case SELECTEDMOVIE:
      return {
        ...state,
        selectedmovie:action.payload.selectedmovie,
        selectedmoviedetails:action.payload.selectedmoviedetails
      }
    case SELECTEDMOVIECREDITS:
      return {
        ...state,
        selectedmoviecredits:action.payload.selectedmoviecredits
      }
    case FINDCONTENT:
      return {
        ...state,
        findcontent:{
          searchstring:action.payload.searchstring,
          searchcontent:action.payload.searchcontent.results,
          searchcategory:action.payload.searchcategory
        }
      }
    case CHANGECONTENT:
      return {
        ...state,
        searchcategory: action.payload.searchcategory
      }
    default:
      return state
  }
}
