import React, { Component } from 'react';
import pages from '../../dataSource/pages.json';
import Title from '../../components/Title/Title.js'
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

  render()
  {
    let pageObject = pages.filter(obj=>obj.slot===this.props.page)[0];
    console.log(pageObject);
    return (
      <React.Fragment>
      {pageObject?
        <React.Fragment>
        <Title
          title='g'
          separator={<Separator width='30%'/>}
        />
        </React.Fragment>
        :
        null
      }
      </React.Fragment>
    );
  }
}

export default PoliciesPage;
