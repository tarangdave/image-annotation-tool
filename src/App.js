import React, { Component } from 'react';
import './App.css';
import Annotation from 'react-image-annotation';
import FileBase64 from 'react-file-base64';
import Appbase from 'appbase-js';

var appbaseRef = Appbase({
	url: "https://scalr.api.appbase.io",
	app: "image-annotate",
	credentials: "eFHEtaFzz:0c388c04-ef40-443b-9944-6cfd97bb4ca0"
})

class MyAnnotation extends Component {
  render() {
    return (
      <Annotation
                  src={this.props.data._source.base64}
        
                  annotations={this.props.data._source.file}
        
                  type={this.props.data._source.type}
                />
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
     this.state = { 
       pictures: [],
       annotations: [],
       annotation: {},
       files: [],
       isUploaded: false,
       currentFile: "",
       allImages: []
      };
     this.onDrop = this.onDrop.bind(this);
     this.updateData = this.updateData.bind(this);
     this.setAllImages = this.setAllImages.bind(this);
  }
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
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
    var self = this
    appbaseRef.search({
      type: "image",
      body: {
        query: {
          match: {"name": self.state.currentFile}
        }
      }
    }).then(function(res) {
      self.updateData(self, res.hits.hits[0]._id)
    }).catch(function(err) {
      console.log("search error: ", err)
    })
  }

  getFiles(files){
    this.setState({ files: files, isUploaded: true, currentFile: files[0].file.name });
    appbaseRef.index({
      type: "image",
      body: this.state.files,
    }).then(function(res) {
      
    }).catch(function(err) {
      console.log("indexing error: ", err)
    })

  }

  setAllImages(self) {
    appbaseRef.search({
      type: "image",
      body: {
        query: {
          match_all: {}
        }
      }
    }).then(function(res) {
      self.setState({allImages: self.state.allImages.concat(res.hits.hits)})
    }).catch(function(err) {
      console.log("search error: ", err)
    })
  }
  componentDidMount() {

    this.setAllImages(this)
    
  }
  render() {
    var showImage = this.state.allImages.map((data, i) => {
      return (
        <div className="two-box" key={i}><MyAnnotation data={data}></MyAnnotation></div>
      )
    })
    return (
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="https://github.com/tarangdave/image-annotation-tool">Image Annotation Tool</a>
              </div>
            </div>
          </nav>
          <div className="container">
              <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12"><FileBase64
                    multiple={ true }
                    onDone={ this.getFiles.bind(this) } /></div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  {this.state.isUploaded ? <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 two-box"><Annotation
                    src={this.state.files[0].base64}
          
                    annotations={this.state.annotations}
          
                    type={this.state.type}
                    value={this.state.annotation}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                  /></div> : <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 two-box">Please Upload less than 1MB image to annotate</div>}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h1>Previous Images</h1>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    {showImage}
              </div>
          </div>
        </div>
    );
  }
}

export default App;
