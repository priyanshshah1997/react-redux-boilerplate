import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies, findAllContent, changeContentType
} from '../../../modules/Redux/reducers/postReducer'
import { SearchBar } from '../../StyleSheets/MoviesReact'
import {
  Col,
  Container, FormRadio,
  Row
} from 'shards-react'
import MovieItemComponent  from '../../Components/MovieItemComponent'

let CategoryName = props=>{
  if(props.catname)
    return <h4>{props.catname}</h4>
  else
    return <h4>Nothing</h4>
}
let MovieList = props =>{
  if(props.movieList)
    return  props.movieList.map((value,index) => <MovieItemComponent key={index} history={props.history} itemInfo={value} changePageFunction={(e)=>props.changePage(value.id)}/>)
  else
    return <h1>Nothing</h1>
}

class MovieSearch extends React.Component {

  constructor(props, context) {
    super(props, context)
    props.fetchTopRatedMovies(1,'top_rated_movies');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeCat = this.changeCat.bind(this);
    switch (props.match.params.category) {
      case 'all':
        this.state = {
          selectedcategory:"all"
        };
        break;
      case 'tvshows':
        this.state = {
          selectedcategory:"tvshows"
        };
        break;
      case 'movies':
        this.state = {
          selectedcategory:"movies"
        };
        break;
    }
    // console.log(props.match.params);
    props.findAllContent(props.match.params.stringcontent,props.match.params.category,1);
    props.changeContentType(props.match.params.category);
  }
  handleSubmit(e){
    console.log("submited");
  }
  changeCat(cat) {
    this.setState({
      selectedcategory:cat
      }
    )
    this.props.changeContentType(cat);
  }

  componentDidMount() {
    console.log("mounted");
  }
  componentWillUnmount() {
    console.log("search unmounted");
  }
  render() {
    return (
      <div>
        <div style={SearchBar}>
          <Container>
            <Row style={{marginTop:'20px',marginBottom:'20px'}}>
              <Col lg="10">
                <CategoryName catname={this.props.match.params.stringcontent}/>
              </Col>
            </Row>
            <Row style={{margin:'auto',paddingLeft:'40px',paddingRight:'40px'}}>
              <Col lg="2">
                <div>
                  <p>Select your category:</p>
                  <FormRadio
                    checked={this.state.selectedcategory === "all"}
                    onChange={() => {
                      this.changeCat("all");
                    }}
                  >
                    All
                  </FormRadio>
                  <FormRadio
                    checked={this.state.selectedcategory === "movies"}
                    onChange={() => {
                      this.changeCat("movies");
                    }}
                  >
                    Movies
                  </FormRadio>
                  <FormRadio
                    checked={this.state.selectedcategory === "tvshows"}
                    onChange={() => {
                      this.changeCat("tvshows");
                    }}
                  >
                    Tv Shows
                  </FormRadio>
                </div>
              </Col>
              <Col lg="10">
                <Row>
              <MovieList history={this.props.history} movieList={this.props.findcontent}/>
                </Row>
                </Col>
              </Row>
          </Container>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
  homeMovies:counter.homeMovies,
  category:counter.category,
  findcontent:counter.findcontent.searchcontent
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTopRatedMovies,
      fetchNowPlayingMovies,
      fetchPopularMovies,
      findAllContent,
      changeContentType
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieSearch)
