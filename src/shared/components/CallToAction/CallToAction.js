import React, { Component } from 'react';
import DownloadApp from './DownloadApp.js';
import store from './CallToActionStore.js'
import {observer} from 'mobx-react';
import TapButton from '../../components/TapButton/TapButton.js';
import Img from '../../components/Img/Img.js';
class CallToAction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actionType: <div></div>,
    };
  }

  componentWillMount(){
    require('./CallToAction.css');
  }

  componentDidMount() {
    store.setLanguage(this.props.language);
    store.selectCountry(this.props.country_code);
    if(this.props.callToAction && this.props.callToAction.actionType==='sms'){
      this.setState({
        actionType: <DownloadApp
                      product={this.props.callToAction.product}
                      placeholder={this.props.callToAction.placeholder}
                      buttonText={this.props.callToAction.buttonText}
                      linkText={this.props.callToAction.linkText}
                      actionType={this.props.callToAction.actionType}
                      link={this.props.callToAction.link}
                      color={this.props.color}
                      language={this.props.language}
                      store={store}
                      source={this.props.source}
                      actionTitle={this.props.callToAction.actionTitle}
                      schedule_for={this.props.schedule_for}
                    />
      });
    }
    else if(this.props.callToAction && this.props.callToAction.actionType==='link'){
       this.setState({
        actionType: <TapButton
                      type='link'
                      link={this.props.callToAction.link}
                      text={this.props.callToAction.linkText}
                      shape='bordered'
                      color={this.props.color}
                      actionType={this.props.callToAction.actionType}
                      language={this.props.language}
                    />
      });
    }
  }

  componentWillUnmount() {

  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>)
  }

  render() {
    return (
      <React.Fragment>
      {this.props.callToAction?
        <div className="callToAction" style={{textAlign:this.props.center?'center':''}}>
          {this.props.partnerLogo?<div><Img className="partnerLogo" src={this.props.partnerLogo}/><div style={{height:'20px'}}></div></div>:null}
          {this.props.callToAction.title?
            <h3 className="callToActionTitle hidden-xs" style={{textAlign:this.props.center?'center':''}}>
            {this.includebreaks(this.props.callToAction.title)}
          </h3>
          :
          null
          }
          {
          this.props.callToAction.shortTitle?
          <b>
          <h5 className="callToActionTitle visible-xs" style={{textAlign:this.props.center?'center':''}}>
            {this.includebreaks(this.props.callToAction.shortTitle)}
          </h5>
          </b>
          :
          null
          }
          <div style={{height:'18px'}}></div>
          {this.state.actionType}
        </div>
        :
        null
      }
      </React.Fragment>
    );
  }
}

export default observer(CallToAction);
