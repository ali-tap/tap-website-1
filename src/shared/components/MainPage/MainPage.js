import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Banner from '../../components/Banner/Banner.js';
import BannerLayer from '../../components/Banner/BannerLayer.js';
import Features from '../../components/Features/Features.js'
import CallToAction from '../../components/CallToAction/CallToAction.js'
import Slider from '../../components/Slider/Slider.js';
import ProductsBlocks from '../../components/ProductsBlocks/ProductsBlocks.js';
import LightBox from '../../components/LightBox/LightBox.js';
import TapButton from '../../components/TapButton/TapButton.js'
import AnimatedRow from '../../components/AnimatedRow/AnimatedRow.js';
import Title from '../../components/Title/Title.js';
import Separator from '../../components/Separator/Separator.js';
import TapCarouselSlider from '../../components/TapCarouselSlider/TapCarouselSlider.js';
import Img from '../../components/Img/Img.js';

import callToAction from '../../dataSource/callToAction.json';
import features from '../../dataSource/features.json';
import tapPageIntro from '../../dataSource/tapPageIntro.json';
import news from '../../dataSource/news.json';
import businesses from '../../dataSource/businesses.json';
import highlights from '../../dataSource/mainPageHighlights.json';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openLightBox: false,
      lightBoxLink: ''
    };
  }

  componentWillMount(){
    require('./mainPage.css');

    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(features.items);
    preferencesStore.filterJsonStringsBasedOnLanguage(features);
    preferencesStore.filterJsonStringsBasedOnLanguage(callToAction);
    preferencesStore.filterJsonStringsBasedOnLanguage(tapPageIntro);
    preferencesStore.filterJsonStringsBasedOnLanguage(news);
    preferencesStore.filterJsonStringsBasedOnLanguage(businesses);
    preferencesStore.filterJsonStringsBasedOnLanguage(highlights);
  }

  includebreaks(text){
      return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>);
  }

  getVideoLink(partner,productObj){
    let videoLink = '';
    partner?
        videoLink=partner.products.filter(product=>product.product===productObj.product)[0].videoLink
        :videoLink=productObj.videoLink;
    videoLink?
      null
      :
      videoLink=productObj.videoLink;

      return videoLink;
  }

  filterHightlights(){
    let arr = [];
    highlights.map(highlight=>{
      if(highlight.countries){
        highlight.countries.map(country_code=>{
          country_code===this.props.preferencesStore.country_code?
            arr.push(highlight)
            :
            null
        });
      }
      else{
        arr.push(highlight);
      }
    })

    let blocks = arr.filter(obj=>obj.hasBlock).slice(0, 4);

    let slot = null;
    arr.filter(obj=> obj.smimilar).length>1?
      slot=arr.filter(obj=> obj.smimilar)[0].slot
      :
      null;

      let mykey = null;
      slot?
        arr.map((obj,key)=>{obj.slot===slot?mykey=key:null})
        :
        null

      mykey!==null?arr.splice(mykey,1):null

      let banners = arr.filter(obj=>obj.hasBanner).slice(0, 4);
      return {banners:banners, blocks:blocks};
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
    this.filterHightlights();
    let preferencesStore = this.props.preferencesStore;

    let partner=false;
    let string = this.props.partner;
    string?
        partner=preferencesStore.getCurrentPartner(string)
        :partner=false;

    let productsObjects=[];
    string?
      partner.products.map(product=>{productsObjects.push(preferencesStore.getProduct(product.product))})
      :productsObjects = preferencesStore.getProducts();

      let businessesList = [];
      businesses.filter(business => business.product === 'pay')[0]?
        businessesList = businesses.filter(business => business.product === 'pay')[0].businessesList
        :
        businessesList = null;

      let businessesListTitle = '';
      businesses.filter(business => business.product === 'pay')[0]?
        businessesListTitle = businesses.filter(business => business.product === 'pay')[0].title
        :
        businessesListTitle = null;

      let banners = partner?productsObjects:this.filterHightlights().banners;
      let blocks = partner?productsObjects:this.filterHightlights().blocks;

    return (
      <React.Fragment>
      {partner && partner.products.length===1?
        <Redirect to={'/'+this.props.country+'/'+this.props.language+'/'+partner.products[0].slot+'/'+this.props.partner}/>
        :
        <React.Fragment>
            <LightBox
                link={this.state.lightBoxLink}
                open={this.state.openLightBox}
                onClick={()=>this.closeLightBoxFunction()}
            >
            </LightBox>
            <Slider
              language={preferencesStore.language}
              oneBackground={partner?true:false}
              backgroundColor={partner?partner.brandingColor:''}
              backgroundImage={partner?partner.paternImage:''}
              hideOnSmall={banners.length>1}
            >

            {
              banners.map((banner,key)=>{
              return(
                  <Banner
                    key={key}
                    preferencesStore={preferencesStore}
                    cropped={65}
                    backgroundColor={partner?partner.brandingColor:banner.brandingColor}
                    backgroundImage={partner?partner.paternImage:banner.paternImage?banner.paternImage:null}
                    reverse={true}
                    maxContentHeight={true}
                    >
                        <BannerLayer
                            animation='shortFromLeft'>
                            <CallToAction
                                partnerLogo={partner?partner.logo:banner.logo?banner.logo:null}
                                callToAction={preferencesStore.getCallToAction(callToAction,banner.product)}
                                country_code={preferencesStore.country_code}
                                language={preferencesStore.language}
                                color={partner?partner.brandingColor:banner.brandingColor}
                                source={partner?partner.slot:banner.partner?banner.partner:''}
                                schedule_for={banner.schedule_for?banner.schedule_for:null}
                            />
                        </BannerLayer>
                        <BannerLayer
                            animation='shortFromRight'>
                              <Img
                                src={preferencesStore.getProduct(banner.product).bannerImage}
                                className={this.getVideoLink(partner,banner)?'openLightBox bannerImage videoLightBox':'bannerImage'}
                                onClick={()=>this.openLightBoxFunction(this.getVideoLink(partner,banner))}
                              />
                        </BannerLayer>
                  </Banner>
                );
            })}
            </Slider>
              <ProductsBlocks
                productsObjects={blocks}
                language={this.props.match.params.language}
                partner={this.props.match.params.partner || this.props.match.params.page}
              />
              {partner?
                <div className="container">
                  <div style={{height: '80px'}}></div>
                  <h4>
                    {this.includebreaks(partner.intro)}
                  </h4>
                  <div style={{height:'40px'}}></div>
                  <h5>
                    {this.includebreaks(partner.subIntro)}
                  </h5>
                  <div style={{height: '80px'}}></div>
                </div>
                :
                <React.Fragment>
                <div className='container'>
                  <div style={{height: '120px'}}></div>
                  <TapCarouselSlider
                    title={businessesListTitle?businessesListTitle:null}
                    businesses={businessesList}
                    ItemsInSlide={4}
                    language={preferencesStore.language}
                  />
                  <div style={{height: '80px'}}></div>
                  <Title
                  title={news.title}
                  separator={<Separator width='30%'/>}
                  />
                  <AnimatedRow
                  fullWidthOnMobile={true}
                  itemsInRow={5}
                  spaceBetweenRows={'40px'}
                  >
                  {news.items.map((item,key)=>{
                    return (
                      <div key={key} className='lessOpacityOnHover'>
                      {item.link?
                        <React.Fragment>
                        <a href={item.link} target='_blank'>
                        <Img src={item.image} alt='newsImage' style={{width:'160px'}}/>
                        </a>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <Img src={item.image} alt='newsImage' style={{width:'160px'}}/>
                        </React.Fragment>
                      }
                      </div>
                    )
                  })}
                  </AnimatedRow>
                  <div style={{height: '120px'}}></div>
                </div>
                </React.Fragment>
              }
        </React.Fragment>
      }
    </React.Fragment>
    );
  }
}

export default MainPage;
