import React, { Component } from 'react';
import Img from '../../components/Img/Img.js';
import LightBox from '../../components/LightBox/LightBox.js';

class FeatureDescription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      descriptionActive: '',
      openLightBox: false,
      lightBoxLink:''
    };
    // this.descriptionToggle = this.descriptionToggle.bind(this);
  }

  descriptionToggle(){
      if(this.state.descriptionActive==='active'){
        this.setState({
          descriptionActive: ''
        });
      }
      else if(this.state.descriptionActive===''){
        this.setState({
          descriptionActive: 'active'
        });
      }
  }

  openLightBoxFunction(link){
    if(link){
      this.setState({
        openLightBox: true,
        lightBoxLink: link
      });
    }
  }

  closeLightBoxFunction(){
    this.setState({
      openLightBox: false,
    });
    setTimeout(
        function() {
          this.setState({
            lightBoxLink: ''
          });
        }
        .bind(this),
        200
    );
  }

  render() {
    return (
          <div className={' featureDescription '} >
              <LightBox
                link={this.state.lightBoxLink}
                open={this.state.openLightBox}
                onClick={()=>this.closeLightBoxFunction()}
              />
              <div className="featureShortDescription" onClick={()=>this.descriptionToggle()}>
                  <Img className="featureIcon" src={this.props.feature.icon}/>
                  <div style={{width:'24px',display:'inline-block'}}></div>
                  <div className="titleSubtitle">
                    <b><h5 className="title">{this.props.feature.title}</h5></b>
                    <em><b><h6 className="subtitle">{this.props.feature.subtitle}</h6></b></em>
                  </div>
              </div>
              <div className={" description "+this.state.descriptionActive}>
                  <div style={{height:'15px'}}></div>
                  <h6>{this.props.feature.description}</h6>
                  {this.props.feature.video?
                    <React.Fragment>
                    <div style={{height:'15px'}}></div>
                    <div className='videoButtonText' onClick={()=>this.openLightBoxFunction(this.props.feature.video)}>
                      <span>{this.props.feature.videoButtonText}</span>
                      <div style={{width:'5px',display:'inline-block'}}></div>
                      <i className={this.props.language==='ar'?'fa fa-angle-left':'fa fa-angle-right'}></i>
                    </div>
                    </React.Fragment>
                    :
                    null
                  }
              </div>
          </div>
        );
  }
}

export default FeatureDescription;
