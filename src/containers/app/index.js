import React from 'react'
import { Route} from 'react-router-dom'
import Home from '../Pages/home'
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import MovieDetails from '../Pages/movies'
import MovieSearch from '../Pages/search'
import { BackgroundTop } from '../StyleSheets/MoviesReact'
import { Button, FormInput, InputGroup, InputGroupAddon, InputGroupText} from 'shards-react'
import { ReactComponent as SearchIcon } from '../Svg/SearchIcon.svg'
import {
  findAllContent
} from '../../modules/Redux/reducers/postReducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.findContent = this.findContent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state={
      searchstring:null
    }
  }

  findContent =()=>{
    console.log(this.state)
    if(this.state.searchstring)
    switch (this.props.searchcategory) {
      case 'movies':
        window.location = `/search/movies/${this.state.searchstring}`
        // return <Redirect to={`/search/movies/${this.state.searchstring}`} />
        // this.props.history.push(`/search/movies/${this.state.searchstring}`);
        this.props.findAllContent(this.state.searchstring,"movies",1);
        break;
      case 'tvshows':
        window.location = `/search/tvshows/${this.state.searchstring}`
        // return <Redirect to={`/search/tvshows/${this.state.searchstring}`} />
        // this.props.history.push(`/search/tvshows/${this.state.searchstring}`);
        this.props.findAllContent(this.state.searchstring,"tvshows",1);
          break;
      default:
        window.location = `/search/all/${this.state.searchstring}`
        // return <Redirect to={`/search/all/${this.state.searchstring}`} />
        // this.props.history.push(`/search/all/${this.state.searchstring}`);
        this.props.findAllContent(this.state.searchstring,"all",1);
    }
  }
  handleInputChange = (e)=>{
    this.setState({
      searchstring:e.target.value
    })
  }
  render() {
    return (
      <div>
        <header>
          <div style={BackgroundTop}/>
          <InputGroup className="mb-2" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '25px' }}>
            <InputGroupAddon type="prepend">
              <InputGroupText><SearchIcon style={{ height: '20px' }}/></InputGroupText>
            </InputGroupAddon>
            <FormInput placeholder="Find Your Movie" onChange={this.handleInputChange}/>
            <InputGroupAddon type="append">
              <Button theme="info" onClick={this.findContent}>Find</Button>
            </InputGroupAddon>
          </InputGroup>
        </header>
        <main>
          <Route exact path="/" component={Home}/>
          <Route exact path="/movie/:id" component={MovieDetails}/>
          <Route exact path="/search/:category/:stringcontent" component={MovieSearch}/>
        </main>
      </div>
    )
  }
}
const mapStateToProps = ({ counter }) => ({
  searchcategory:counter.searchcategory
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findAllContent
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
