import React, { Component } from 'react';
import pages from '../../dataSource/pages.json';
import Title from '../../components/Title/Title.js';
import Separator from '../../components/Separator/Separator.js';
class PoliciesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    // require('./activatePage.css');
    this.props.preferencesStore.filterJsonStringsBasedOnLanguage(pages);
  }


  componentDidMount() {
  }

  componentWillUnmount() {
  }

  includebreaks(text){
      return text.split("\n").map((text,key)=><span key={key}>{text}<br/></span>);
  }

  render()
  {
    let pageObject = pages.filter(obj=>obj.slot===this.props.page)[0];
    console.log(pageObject);
    return (
      <React.Fragment>
      {pageObject?
        <React.Fragment>
          <div className='container' style={{margin: 'auto',padding: '0 17%', textAlign:'justify'}}>
            <div style={{height:'150px'}}></div>
            <div>
              <h2 style={{textAlign: 'center'}}>{pageObject.title}</h2>
              <Separator width='30%'/>
            </div>
            <div>
            {
              pageObject.content.map(contentItem=>{
                return(
                  <React.Fragment>
                    <div style={{height:'40px'}}></div>
                    <b><h5>{contentItem.title}</h5></b>
                    {contentItem.paragraph?
                      <h6 style={{color:contentItem.type==='warning'?'red':''}}>{this.includebreaks(contentItem.paragraph)}</h6>
                      :
                      null
                    }
                    {contentItem.points?
                      contentItem.points.map(point=>{
                        return(
                          <h6 style={{color:point.type==='warning'?'red':'', marginLeft:'20px'}}>{'• '+point.paragraph}</h6>
                        )
                      })
                      :
                      null
                    }
                  </React.Fragment>
                )
              })
            }
            </div>
            <div style={{height:'80px'}}></div>
          </div>
        </React.Fragment>
        :
        null
      }
      </React.Fragment>
    );
  }
}

export default PoliciesPage;
