import React, { Component } from 'react';
import Image from 'react-image-resizer';
import './App.css';
import Sample from './sample.jpg'
import ImageUploader from 'react-images-upload';
import Annotation from 'react-image-annotation';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import request from 'superagent';
import Appbase from 'appbase-js';

var appbaseRef = Appbase({
	url: "https://scalr.api.appbase.io",
	app: "image-annotate",
	credentials: "eFHEtaFzz:0c388c04-ef40-443b-9944-6cfd97bb4ca0"
})

class App extends Component {
  constructor(props) {
    super(props);
     this.state = { 
       pictures: [],
       annotations: [],
       annotation: {},
       files: [],
       isUploaded: false,
       currentFile: ""
      };
     this.onDrop = this.onDrop.bind(this);
     this.updateData = this.updateData.bind(this);
  }
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    },console.log(picture));
  }
  onChange = (annotation) => {
    this.setState({ annotation })
  }
  updateData(self, doc_id) {
    appbaseRef.update({
      type: "image",
      id: doc_id,
      body: {
        doc: {
        "file": self.state.annotations
        }
      }
    }).then(function(res) {
      console.log("successfully updated: ", res)
    }).catch(function(err) {
      console.log("update document error: ", err)
    })
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
    console.log(this.state.currentFile)
    var self = this
    appbaseRef.search({
      type: "image",
      body: {
        query: {
          match: {"name": self.state.currentFile}
        }
      }
    }).then(function(res) {
      console.log("query result: ", res)
      self.updateData(self, res.hits.hits[0]._id)
    }).catch(function(err) {
      console.log("search error: ", err)
    })
    console.log(self.state.currentFile)
  }

  getFiles(files){
    this.setState({ files: files, isUploaded: true, currentFile: files[0].file.name });
    appbaseRef.index({
      type: "image",
      body: this.state.files,
    }).then(function(res) {
      console.log("successfully indexed: ", res)
      
    }).catch(function(err) {
      console.log("indexing error: ", err)
    })
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
        <div className="container">
            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <FileBase64
                  multiple={ true }
                  onDone={ this.getFiles.bind(this) } />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                {this.state.isUploaded ? <Annotation
                  src={this.state.files[0].base64}
                  alt='Two pebbles anthropomorphized holding hands'
        
                  annotations={this.state.annotations}
        
                  type={this.state.type}
                  value={this.state.annotation}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                /> : <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">Please Upload image to annotate</div>}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  All Photos
            </div>
        </div>
    );
  }
}

export default App;
