import React, { Component } from 'react';
import Image from 'react-image-resizer';
import './App.css';
import Sample from './sample.jpg'
import ImageUploader from 'react-images-upload';
import Annotation from 'react-image-annotation';

class App extends Component {
  constructor(props) {
    super(props);
     this.state = { 
       pictures: [],
       annotations: [],
       annotation: {}
      };
     this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    },console.log(picture));
  }
  onChange = (annotation) => {
    this.setState({ annotation })
  }
  onSubmit = (annotation) => {
    const { geometry, data } = annotation
 
    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    })
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
              <ImageUploader
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
              />
            </div>
          </div>
        </div>
        {/* <Annotation
          src={Sample}
          alt='Two pebbles anthropomorphized holding hands'
 
          annotations={this.state.annotations}
 
          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        /> */}
      </div>
    );
  }
}

export default App;
