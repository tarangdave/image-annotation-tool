import React, { Component } from 'react';
import Image from 'react-image-resizer';
import './App.css';
import Sample from './sample.jpg'
import ImageUploader from 'react-images-upload';
import Annotation from 'react-image-annotation';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import request from 'superagent';

class App extends Component {
  constructor(props) {
    super(props);
     this.state = { 
       pictures: [],
       annotations: [],
       annotation: {},
       files: [],
       isUploaded: false
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

  getFiles(files){
    this.setState({ files: files, isUploaded: true }, console.log(files))
    // var file = new FormData();
    // file.append('name',files[0])
    // var req=request
    //           .get('http://localhost:5000/upload')
    //           .send(file);
    // req.end(function(err,response){
    //     console.log(response);
    //     console.log("upload done!!!!!");
    // });

  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
              {/* <ImageUploader
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
              /> */}
              <FileBase64
                multiple={ true }
                onDone={ this.getFiles.bind(this) } />
            </div>
          </div>
        </div>
        {this.state.isUploaded ? <Annotation
          src={this.state.files[0].base64}
          alt='Two pebbles anthropomorphized holding hands'
 
          annotations={this.state.annotations}
 
          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        /> : <div>Please Upload image to annotate</div>}
        
      </div>
    );
  }
}

export default App;
