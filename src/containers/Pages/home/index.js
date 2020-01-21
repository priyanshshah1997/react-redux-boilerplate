import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies
} from '../../../modules/Redux/reducers/postReducer'
import { SearchBar } from '../../StyleSheets/MoviesReact'
import {
  Col,
  Container,
  FormSelect,
  Row
} from 'shards-react'
import MovieItemComponent  from '../../Components/MovieItemComponent'

let CategoryName = props=>{
  if(props.catname==="top_rated_movies")
    return <h4>Top Rated Movies</h4>
  else
    return <h4>Nothing</h4>
}
let MovieList = props =>{

  if(props.movieList)
   return  props.movieList.map((value,index) => <MovieItemComponent key={index} history={props.history} itemInfo={value} changePageFunction={(e)=>props.changePage(value.id)}/>)
  else
  return <h1>Nothing</h1>
}

class Home extends React.Component {

  constructor(props, context) {
    super(props, context)
    props.fetchTopRatedMovies(1,'top_rated_movies');
  }

  componentWillUnmount() {
    console.log("home unmounted");
  }

  formSelect=(e)=>{
    console.log(e.target.value);
    switch (e.target.value) {
      case "top_rated":
        this.props.fetchTopRatedMovies(1,'top_rated_movies');
        break;
      case "popular_movies":
        this.props.fetchPopularMovies(1,'top_rated_movies');
        break;
      case "now_playing":
        this.props.fetchNowPlayingMovies(1,'top_rated_movies');
        break;
    }
  }
  render() {
    return (
      <div>
        <div style={SearchBar}>
          <Container>
            <Row style={{marginTop:'20px',marginBottom:'20px'}}>
              <Col lg="10">
                <CategoryName catname={this.props.category}/>
              </Col>
              <Col lg="2">
                <FormSelect onChange={this.formSelect}>
                  <option value="top_rated">Top Rated Movies</option>
                  <option value="popular_movies">Popular Movies</option>
                  <option value="now_playing">Now Playing Movies</option>
                </FormSelect>
              </Col>
            </Row>
            <Row style={{margin:'auto',paddingLeft:'40px',paddingRight:'40px'}}>
              <MovieList history={this.props.history} movieList={this.props.homeMovies}/>
            </Row>
          </Container>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
  homeMovies:counter.homeMovies,
  category:counter.category
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTopRatedMovies,
      fetchNowPlayingMovies,
      fetchPopularMovies,
      changePage: (e,MovieId) => {
        let str = '/movie/'+MovieId
        push(str)}
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
