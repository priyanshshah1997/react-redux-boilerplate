import React from 'react'
import { Card, CardBody, CardHeader, CardImg, Col, Container, Row } from 'shards-react'
import { bindActionCreators } from 'redux'
import {
  fetchSelectedMovie, fetchSelectedMovieCredits
} from '../../../modules/Redux/reducers/postReducer'
import { connect } from 'react-redux'

let CrewContent = props=>{
  if (props.crewdata){
    let crewData = props.crewdata.slice(0,6)
  return crewData.map((value,index) =>
  {
    let img="https://www.easycorrect.com/wp-content/uploads/2019/02/dummy-person.jpeg"
    if(value.profile_path!==null)
     return <Col sm="3" style={{paddingBottom:'20px'}} key={index}>
      <Card>
        <CardHeader><h6>{value.name}</h6></CardHeader>
        <CardImg src={`https://image.tmdb.org/t/p/w500${value.profile_path}`} height={"300px"} />
        <CardBody>
          Job Role:<h6><p>{value.job}</p></h6>
        </CardBody>
      </Card>
    </Col>
    else
      return <Col sm="3" style={{paddingBottom:'20px'}} key={index}>
        <Card>
          <CardHeader><h6>{value.name}</h6></CardHeader>
          <CardImg src={img} height={"300px"} />
          <CardBody>
            Job Role:<h6><p>{value.job}</p></h6>
          </CardBody>
        </Card>
      </Col>

  })}
  else
    return <h1>
      Nothing
          </h1>
}
let CastContent = props=>{
  if (props.castdata){
    let castData = props.castdata.slice(0,6)
    return castData.map((value,index) => (
      <Col sm="3" style={{paddingBottom:'20px'}} key={index}>
        <Card>
          <CardHeader><h6>{value.name}</h6></CardHeader>
          <CardImg src={`https://image.tmdb.org/t/p/w500${value.profile_path}`} height={"300px"} />
          <CardBody>
            <h6><p>{value.character}</p></h6>
          </CardBody>
        </Card>
      </Col>
    ))}
  else
    return <h1>
      Nothing
    </h1>
}
class MovieDetails extends React.Component {

  constructor(props, context) {
    super(props, context)
    console.log(props.match.params.id)
    props.fetchSelectedMovie(props.match.params.id)
    props.fetchSelectedMovieCredits(props.match.params.id)
  }

  render() {
    if (!this.props.selectedmoviecredits)
      return <h1>Loading</h1>
    else
    return (<Container>
      <Row style={{marginBottom:'20px',marginTop:'30px'}}>
        <Col sm="4">
          <Card>
            <CardImg src={`https://image.tmdb.org/t/p/w500${this.props.selectedmoviedetails.poster_path}`} height={"500px"}/>
          </Card>
        </Col>
        <Col sm="7" style={{marginTop:'10px',marginLeft:'20px'}}>
          <Row><h2>{this.props.selectedmoviedetails.title}</h2></Row>
            <Row><h6>{this.props.selectedmoviedetails.tagline}</h6></Row>
          <Row style={{alignItems:'left'}}>
            <h2>About the Movie</h2>
            <p>{this.props.selectedmoviedetails.overview}</p>
          </Row>
        </Col>
      </Row>
      <h3>Top Casts</h3>
      <Row>
        <CastContent castdata={this.props.selectedmoviecredits.cast}/>
      </Row>
      <h3>Top Crews</h3>
      <Row>
        <CrewContent crewdata={this.props.selectedmoviecredits.crew}/>
      </Row>
    </Container>)
  }
}

const mapStateToProps = ({ counter }) => ({
  selectedmovie:counter.selectedmovie,
  selectedmoviedetails:counter.selectedmoviedetails,
  selectedmoviecredits:counter.selectedmoviecredits
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSelectedMovie,
      fetchSelectedMovieCredits
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails)
