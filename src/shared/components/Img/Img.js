import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import root from 'window-or-global';

class Img extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style:{}
    };
    this.increasHeightt = this.increasHeightt.bind(this);

  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.increasHeightt);
  }

  componentDidMount(){
      window.addEventListener("resize", this.increasHeightt);
      this.increasHeightt();
  }

  generateAlternativeText(src){
    return src?src.substring(src.lastIndexOf('/')+1,src.lastIndexOf('.')):'';
  }

  removeSpacesfromLink(src){
    return src?src.replace(' ', "%20"):src;
  }

  increasHeightt(){
    if(this.props.increasHeight){
      let height = ReactDOM.findDOMNode(this)?ReactDOM.findDOMNode(this).getBoundingClientRect().height:null
      let width = ReactDOM.findDOMNode(this)?ReactDOM.findDOMNode(this).getBoundingClientRect().width:null
      width>height && height!==0 && window.innerWidth<767?
       this.setState({
         style:{
           marginTop: ((width*this.props.increasHeight)-height)/2,
           marginBottom: ((width*this.props.increasHeight)-height)/2,
         }
       })
       :
       this.setState({
         style:{
           paddingTop: 0,
           paddingBottom: 0,
         }
       })
    }
  }

  render() {
    return (<img
            src={this.removeSpacesfromLink(this.props.src)}
            alt={this.generateAlternativeText(this.props.src)}
            style={{...this.props.style,...this.state.style}}
            className={this.props.className}
            id={this.props.id}
            onClick={this.props.onClick}
            />);
  }
}

export default Img;
