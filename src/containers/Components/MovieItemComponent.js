import React from 'react'
import {
  Button,
  Card, CardBody, CardHeader, CardImg, CardTitle,
  Col
} from 'shards-react'

export default class MovieItemComponent extends React.Component{

  constructor(props, context) {
    super(props, context)
    if (props.itemInfo.poster_path)
      this.imagePath = "https://image.tmdb.org/t/p/w500/"+props.itemInfo.poster_path;
    else if (props.itemInfo.profile_path)
      this.imagePath = "https://image.tmdb.org/t/p/w500/"+props.itemInfo.profile_path;
    else
      this.imagePath = "https://www.easycorrect.com/wp-content/uploads/2019/02/dummy-person.jpeg";
    if (this.props.itemInfo.overview)
    this.overview = this.props.itemInfo.overview.substring(0,100);
    else
      this.overview = "Oops. there is no description";

    if(this.props.itemInfo.original_title!==undefined)
      this.title = this.props.itemInfo.original_title
    else if(this.props.itemInfo.name!==undefined)
      this.title = this.props.itemInfo.name
  }
  ChangePage = () =>{
    console.log(this.props.itemInfo);
    let str = '/movie/'+this.props.itemInfo.id
    this.props.history.push(str)
  }
  render() {
    return(
    <Col lg="4" style={{marginBottom:"10px",marginTop:"10px"}}>
      <Card>
        <CardHeader><CardTitle>{this.title}</CardTitle></CardHeader>
        <CardImg src={this.imagePath} height={"400px"} />
        <CardBody>
          <p>{this.overview}...</p>
          <Button onClick={this.ChangePage}>Read more &rarr;</Button>
        </CardBody>
      </Card>
    </Col>
    )
  }
}

