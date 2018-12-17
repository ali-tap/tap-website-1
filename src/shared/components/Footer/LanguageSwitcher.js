import React, { Component } from 'react';

class LanguageSwitcher extends Component {

  changeLanguage(newLanguage,languages){
    let url =  this.props.path;
    let arr = url.split("/");
    let currentLanguage;
    arr.map(r=>{languages.filter(language=>language.shortName===r)[0]?currentLanguage=r:null});
    url = url.replace('/'+currentLanguage,'/'+newLanguage);
    return url;
  }

  composeLanguageSwitcher(language,languages){
    if(languages.length===2){
        let languageChoice = {};
        for (var i = languages.length - 1; i >= 0; i--) {

          if(languages[i].shortName!==language){
             languageChoice=languages[i];
             break;
          }
        }
        return <a className="footerLink choice" href={this.changeLanguage(languageChoice.shortName, this.props.languages)}>{languageChoice.name}</a>
    }
    else if(languages.length>2){
        let currentLanguage = languages.filter((oneLanguage,key) => oneLanguage.shortName===language);
        return (
          <div className="dropdown-toggle choice" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {currentLanguage[0].name}
              <div className="dropdown-menu fade">
                  {languages.map((oneLanguage,key) => oneLanguage!==currentLanguage[0]? <div key={key}><a className="footerLink choice" href={this.changeLanguage(oneLanguage.shortName, this.props.languages)}>{oneLanguage.name}</a></div>: null)}
              </div>
          </div>
          )
    }
  }


  render() {
    return (
        <div className="languageSwitcher">
          {this.composeLanguageSwitcher(this.props.language,this.props.languages)}
        </div>
    );
  }
}

export default LanguageSwitcher;
