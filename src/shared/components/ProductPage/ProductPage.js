import React, { Component } from 'react';
// import {NavLink}  from 'react-router-dom';
import {observer} from 'mobx-react';
// import headful from 'headful';

import Banner from '../../components/Banner/Banner.js';
import BannerLayer from '../../components/Banner/BannerLayer.js';
import Features from '../../components/Features/Features.js'
import CallToAction from '../../components/CallToAction/CallToAction.js'
import Slider from '../../components/Slider/Slider.js';
// import ProductsBlocks from '../../components/ProductsBlocks/ProductsBlocks.js';
import LightBox from '../../components/LightBox/LightBox.js';
import TapCarouselSlider from '../../components/TapCarouselSlider/TapCarouselSlider.js';
import ParallaxScroll from '../../components/ParallaxScroll/ParallaxScroll.js';
import TestimonialsQuotes from '../../components/TestimonialsQuotes/TestimonialsQuotes.js';
import Img from '../../components/Img/Img.js';

// import preferencesStore from '../../stores/UserPreferencesStore.js';

import callToAction from '../../dataSource/callToAction.json';
import features from '../../dataSource/features.json';
import tapPageIntro from '../../dataSource/tapPageIntro.json';
import businesses from '../../dataSource/businesses.json';
import testimonials from '../../dataSource/testimonials.json';



class ProductPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openLightBox: false,
      lightBoxLink:''
    };
  }

  componentDidMount() {
		const language = this.props.preferencesStore.language;
		require('../../'+language+'.css');
    require('./productPage.css');
  }

  componentWillMount(){
    const preferencesStore = this.props.preferencesStore;
    preferencesStore.filterJsonStringsBasedOnLanguage(features.items);
    preferencesStore.filterJsonStringsBasedOnLanguage(features);
    preferencesStore.filterJsonStringsBasedOnLanguage(callToAction);
    preferencesStore.filterJsonStringsBasedOnLanguage(tapPageIntro);
    preferencesStore.filterJsonStringsBasedOnLanguage(businesses);
    preferencesStore.filterJsonStringsBasedOnLanguage(testimonials);
  }

  includebreaks(text){

      return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>);
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

      let parameter=this.props.partner?this.props.partner:'';
          this.props.preferencesStore.pageUrlKeys.src && this.props.preferencesStore.pageUrlKeys.src!=='partner' && this.props.partner?
          parameter=this.props.preferencesStore.pageUrlKeys.src
          :
          null


    const preferencesStore = this.props.preferencesStore;
    let partner=false;
    this.props.partner?
        partner=preferencesStore.getCurrentPartner(this.props.partner)
        :partner=false;


    let string = this.props.product ;
    let product = preferencesStore.getProduct(string);
    let sliderChildrenArray = [];
    sliderChildrenArray.push(product);

    let schedule_for= '';
      product&&product.schedule_for?schedule_for=product.schedule_for:null;

    let videoLink = '';
    partner?
        videoLink=partner.products.filter(product=>product.product===string)[0].videoLink
        :videoLink=product.videoLink;
    videoLink?
      null
      :
      videoLink=product.videoLink;

      let businessesList = [];
      businesses.filter(business => business.product === product.product)[0]?
        businessesList = businesses.filter(business => business.product === product.product)[0].businessesList
        :
        businessesList = null;

      let businessesListTitle = '';
      businesses.filter(business => business.product === product.product)[0]?
        businessesListTitle = businesses.filter(business => business.product === product.product)[0].title
        :
        businessesListTitle = null;

      let ProductTestimonials = [];
          testimonials.filter(testimonial => testimonial.product === product.product)[0]?
          ProductTestimonials = testimonials.filter(testimonial => testimonial.product === product.product)[0].testimonials
          :
          ProductTestimonials = null;


      let ProductTestimonialsTitle = '';
          testimonials.filter(testimonial => testimonial.product === product.product)[0]?
          ProductTestimonialsTitle = testimonials.filter(testimonial => testimonial.product === product.product)[0].title
          :
          ProductTestimonialsTitle = null;


    return (
      <React.Fragment>
      <LightBox
          link={this.state.lightBoxLink}
          open={this.state.openLightBox}
          onClick={()=>this.closeLightBoxFunction()}
      />
      <Slider
        language={preferencesStore.language}
        oneBackground={true}
        backgroundColor={partner?partner.brandingColor:product.brandingColor}
        backgroundImage={partner.paternImage}
        hideOnSmall={false}
      >
      {sliderChildrenArray.map((child,key)=>{
        return(
          <Banner
            key={key}
            preferencesStore={preferencesStore}
            cropped={65}
            backgroundColor={partner?partner.brandingColor:product.brandingColor}
            backgroundImage={partner?partner.paternImage:''}
            reverse={true}
            maxContentHeight={true}>
                <BannerLayer
                    animation='shortFromLeft'>
                    <CallToAction
                        partnerLogo={partner?partner.logo:null}
                        callToAction={preferencesStore.getCallToAction(callToAction,product.product)}
                        country_code={preferencesStore.country_code}
                        language={preferencesStore.language}
                        color={partner?partner.brandingColor:product.brandingColor}
                        source={parameter}
                        schedule_for={schedule_for}
                    />
                </BannerLayer>
                <BannerLayer
                    animation='shortFromRight'>
                      <Img
                        src={product.bannerImage}
                        alt="bannerImage"
                        className={videoLink?'bannerImage openLightBox':'bannerImage'}
                        onClick={()=>this.openLightBoxFunction(videoLink)}
                        increasHeight={1.105}
                      />
                </BannerLayer>
          </Banner>
        )
      })}
      </Slider>
        <div>
          <div className='hidden-xs' style={{height:'45px'}}></div>
          <div style={{height:'45px'}}></div>
          <div className="container">
            <h5 style={{color:partner?'':product.brandingColor}}>
              {partner?partner.subIntro:product.intro}
            </h5>
            <div style={{height:'70px'}}></div>
            <h4 className='hidden-xs'>{this.includebreaks(partner?partner.intro:tapPageIntro.intro)}</h4>
            <h5 className='visible-xs'>{this.includebreaks(partner?partner.intro:tapPageIntro.intro)}</h5>
            <div style={{height:'100px'}}></div>
          </div>
          {ProductTestimonials?
            <div className='container'>
            <TestimonialsQuotes
              title={ProductTestimonialsTitle}
              testimonials={ProductTestimonials}
              language={preferencesStore.language}
            />
            <div style={{height: '140px'}}></div>
            </div>
            :
            null
          }
          <Features
            features={preferencesStore.getFeatures(features.items,product.product)}
            title={features.name}
            rightPartAnimation="appearFromRight"
            leftPartAnimation="appearFromLeft"
            partner={this.props.partner}
          />
        </div>
      {product.subImage?
        <React.Fragment>
        <div style={{height: '140px'}}></div>
        <ParallaxScroll
          backgroundImage={product.subImage}
        />
        </React.Fragment>
        :
        null
      }
      {businessesList?
        <div className='container'>
        <div style={{height: '140px'}}></div>
        <TapCarouselSlider
          title={businessesListTitle?businessesListTitle:null}
          businesses={businessesList}
          ItemsInSlide={4}
          language={preferencesStore.language}
        />
        <div style={{height: '140px'}}></div>
        </div>
        :
        null
      }
      <div className='' style={{backgroundColor:partner?partner.brandingColor:product.brandingColor,padding:'40px 0px'}}>
      <CallToAction
          callToAction={preferencesStore.getCallToAction(callToAction,product.product)}
          country_code={preferencesStore.country_code}
          language={preferencesStore.language}
          color={partner?partner.brandingColor:product.brandingColor}
          source={parameter}
          center={true}
          schedule_for={schedule_for}
      />
      </div>
    </React.Fragment>
    );
  }
}

export default observer(ProductPage);
