import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';
import errors from './errors.json';
import root from 'window-or-global';

class NotFound extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageHeight:''
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount(){
      require('./notFound.css');
      let lang = this.props.language || (this.props.location && this.props.location.pathname.split('/')[2]);
      this.props.preferencesStore.setLanguage(lang);
      this.props.preferencesStore.filterJsonStringsBasedOnLanguage(errors);
  }

  componentDidMount() {
    root.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    root.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ pageHeight: root.innerHeight });
  }

  render() {
    let errorObj = errors.filter(error=>error.error===this.props.error)[0];
    return (
          <div className='notFound' style={{height: this.props.pageHeight}}>
              <div className='notFoundContent'>
                <Img className='notFoundImage' src={errorObj.error_image}/>
                <div style={{height:'30px'}}></div>
                <h1 className='notFoundTitle'>{errorObj.error_number}</h1>
                <h1 className='notFoundParagraph'>{errorObj.error_message}</h1>
              </div>
          </div>
    );
  }
}

export default NotFound;
