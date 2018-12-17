import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RightsFooterMenu extends Component {

  composeMenu(menu){
    return menu.map((item,key)=> item.link?
      <span key={key} className="secondFooterItem">
        <Link className="footerLink" to={item.link}>{item.title}</Link>
        <div className='textSpace'></div>
      </span>
      :<span key={key} className="secondFooterItem">{item.title}<div className='textSpace'></div></span>);
  }

  render() {
    return (
        <div className="rightsFooterMenu">
          {this.composeMenu(this.props.rightsFooterMenu)}
        </div>
    );
  }
}

export default RightsFooterMenu;
