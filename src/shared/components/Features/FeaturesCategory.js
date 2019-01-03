import React, { Component } from 'react';
import Feature from './Feature.js';
import Separator from '../../components/Separator/Separator.js';
import TapButton from '../../components/TapButton/TapButton.js';

class FeatureCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      hiddenFeatures: 'hiddenItem hide',
      showButton: 'shownItem'
    };
  }

  toggleHideAndShow(middleFeatureId){
    if(this.state.hide){
          this.setState({hiddenFeatures: 'shownItem'});
          this.setState({hide: false});
    }
    else{
          this.setState({hiddenFeatures: 'hiddenItem'});
          this.setState({hide: true});
          setTimeout(function()
          {
            this.setState({hiddenFeatures: 'hiddenItem hide'});
          }
          .bind(this), 500);
          document.getElementById(middleFeatureId).scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    let category = this.props.category;
    let middleFeatureId = category.categoryName.replace(/\s/g,'')+'middle';
    let features = category.items.filter(feature=>((feature.partner===this.props.partner) || feature.partner===undefined))
    return features.map((feature,key) =>
      <React.Fragment key={key}>
            <div
            id={key===3?middleFeatureId:''}
            className={key>3? this.state.hiddenFeatures : ''}>
                <Feature
                  id={key}
                  feature={feature}
                  rightPartAnimation={this.props.rightPartAnimation}
                  leftPartAnimation={this.props.leftPartAnimation}
                  language={this.props.language}
                />
                {key===features.length-1?null:<Separator width='90%'/>}
                {features.length<=4 && key===features.length-1?<Separator width='90%'/>:null}
              </div>
              {key===features.length-1 && features.length>4?
                <div className={this.state.showButton}>
                  <div style={{height:'70px'}}></div>
                  <TapButton
                    text={this.state.hide?category.showMoreButtonText:category.showLessButtonText}
                    shape='bordered colored'
                    product='general'
                    fontAwesomeIcon={<i className={this.state.hide?'fas fa-angle-down':'fas fa-angle-up'}></i>}
                    onClick={()=>this.toggleHideAndShow(middleFeatureId)}
                    className={this.state.showButton}
                    style={{width:'280px'}}
                    color='#585858'
                  />
                </div>
                :null
              }
      </React.Fragment>
    )
  }
}

export default FeatureCategory;
