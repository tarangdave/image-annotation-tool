(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,a){e.exports=a(44)},30:function(e,t,a){},31:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(14),s=a.n(c),l=(a(30),a(23)),i=a(3),r=a(4),m=a(5),u=a(11),d=a(6),h=a(12),p=(a(31),a(10)),b=a(18),g=a.n(b),f=a(19),v=Object(f.a)({url:"https://scalr.api.appbase.io",app:"image-annotate",credentials:"eFHEtaFzz:0c388c04-ef40-443b-9944-6cfd97bb4ca0"}),y=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return o.a.createElement(p.a,{src:this.props.data._source.base64,annotations:this.props.data._source.file,type:this.props.data._source.type})}}]),t}(n.Component),E=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).onChange=function(e){a.setState({annotation:e})},a.onSubmit=function(e){var t=e.geometry,n=e.data;a.setState({annotation:{},annotations:a.state.annotations.concat({geometry:t,data:Object(l.a)({},n,{id:Math.random()})})});var o=Object(i.a)(Object(i.a)(a));v.search({type:"image",body:{query:{match:{name:o.state.currentFile}}}}).then(function(e){o.updateData(o,e.hits.hits[0]._id)}).catch(function(e){console.log("search error: ",e)})},a.state={pictures:[],annotations:[],annotation:{},files:[],isUploaded:!1,currentFile:"",allImages:[]},a.onDrop=a.onDrop.bind(Object(i.a)(Object(i.a)(a))),a.updateData=a.updateData.bind(Object(i.a)(Object(i.a)(a))),a.setAllImages=a.setAllImages.bind(Object(i.a)(Object(i.a)(a))),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"onDrop",value:function(e){this.setState({pictures:this.state.pictures.concat(e)})}},{key:"updateData",value:function(e,t){v.update({type:"image",id:t,body:{doc:{file:e.state.annotations}}}).then(function(e){}).catch(function(e){console.log("update document error: ",e)})}},{key:"getFiles",value:function(e){this.setState({files:e,isUploaded:!0,currentFile:e[0].file.name}),v.index({type:"image",body:this.state.files}).then(function(e){}).catch(function(e){console.log("indexing error: ",e)})}},{key:"setAllImages",value:function(e){v.search({type:"image",body:{query:{match_all:{}}}}).then(function(t){e.setState({allImages:e.state.allImages.concat(t.hits.hits)})}).catch(function(e){console.log("search error: ",e)})}},{key:"componentDidMount",value:function(){this.setAllImages(this)}},{key:"render",value:function(){var e=this.state.allImages.map(function(e,t){return o.a.createElement("div",{className:"two-box",key:t},o.a.createElement(y,{data:e}))});return o.a.createElement("div",null,o.a.createElement("nav",{className:"navbar navbar-default"},o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{className:"navbar-header"},o.a.createElement("a",{className:"navbar-brand",href:"https://github.com/tarangdave/image-annotation-tool"},"Image Annotation Tool")))),o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"col-lg-12 col-sm-12 col-md-12 col-xs-12"},o.a.createElement("div",{className:"col-lg-3 col-md-3 col-sm-3 col-xs-12"},o.a.createElement("div",{className:"col-lg-12 col-sm-12 col-xs-12 col-md-12"},o.a.createElement(g.a,{multiple:!0,onDone:this.getFiles.bind(this)})))),o.a.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},this.state.isUploaded?o.a.createElement("div",{className:"col-lg-12 col-sm-12 col-xs-12 col-md-12 two-box"},o.a.createElement(p.a,{src:this.state.files[0].base64,annotations:this.state.annotations,type:this.state.type,value:this.state.annotation,onChange:this.onChange,onSubmit:this.onSubmit})):o.a.createElement("div",{className:"col-lg-12 col-sm-12 col-xs-12 col-md-12 two-box"},"Please Upload less than 1MB image to annotate")),o.a.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},o.a.createElement("h1",null,"Previous Images")),o.a.createElement("div",{className:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},e)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.3f1ab326.chunk.js.map