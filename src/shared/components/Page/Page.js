import React, { Component } from 'react';
import {observer} from 'mobx-react';
// import headful from 'headful';
import root from 'window-or-global';
import {Helmet} from "react-helmet";

import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

import leftMenuItems from '../../dataSource/leftMenuItems.json';
import rightMenuItems from '../../dataSource/rightMenuItems.json';
import footerMenus from '../../dataSource/footerMenus.json';
import footerImages from '../../dataSource/footerImages.json';
import socialMedia from '../../dataSource/socialMedia.json';
import languages from '../../dataSource/languages.json';
import rightsFooterMenu from '../../dataSource/rightsFooterMenu.json';
import loginHeaderData from '../../dataSource/loginHeaderData.json';
import metaTags from '../../dataSource/metaTags.json';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: 'lightBox',
    };
  }

  componentDidMount() {
		require('../../'+this.props.preferencesStore.language+'.css');
  }

  componentWillMount(){
    require('./page.css');
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.setLanguage(this.props.language);
    preferencesStore.setCountryCode(this.props.country);
    preferencesStore.filterJsonStringsBasedOnLanguage(leftMenuItems);
    preferencesStore.filterJsonStringsBasedOnLanguage(rightMenuItems);
    preferencesStore.filterJsonStringsBasedOnLanguage(footerMenus);
    preferencesStore.filterJsonStringsBasedOnLanguage(rightsFooterMenu);
    preferencesStore.filterJsonStringsBasedOnLanguage(loginHeaderData);
    preferencesStore.filterJsonStringsBasedOnLanguage(metaTags);
    preferencesStore.filterMenuBasedOnCountry(leftMenuItems);
    preferencesStore.filterMenuBasedOnCountry(rightMenuItems);
    preferencesStore.saveUrlKeys(this.props.location.search);
    preferencesStore.filterMenusBasedOnCountry(footerMenus);
  }

  includebreaks(text){
    return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>)
  }

  render() {
    const preferencesStore = this.props.preferencesStore;
    return (
      <div className="page">
        {this.props.metaTag?
          <Helmet>
              <meta property="og:title" content={this.props.metaTag.title} />
              <meta property="og:image" content={this.props.metaTag.image}/>
              <meta name="og:description" content={this.props.metaTag.description} />
          </Helmet>
          :
          null
        }
        <Header
          language={preferencesStore.language}
          leftMenuItems={leftMenuItems}
          rightMenuItems={rightMenuItems}
          loginHeaderData={loginHeaderData}
          headerSpacePC={this.props.headerSpacePC}
          headerSpaceMobile={this.props.headerSpaceMobile}
          noItemsHeader={this.props.noItemsHeader}
          page={this.props.page}
          product={this.props.product}
        />

        {this.props.children}

        {this.props.hideFooter?
          null
          :
          <Footer
            footerMenus={footerMenus}
            footerImages={footerImages}
            socialMedia={socialMedia}
            language={preferencesStore.language}
            languages={languages}
            country_code={preferencesStore.country_code}
            rightsFooterMenu={rightsFooterMenu}
            noItemsFooter={this.props.noItemsFooter}
            path={this.props.match.path}
            />
        }
    </div>
    );
  }
}

export default observer(Page);
