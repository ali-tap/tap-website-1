import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MenuItem extends Component {

  handelClick(){
  	this.props.item.action? this.props.loginStore.closeOpenLoginHeader():null;
  }

  render() {
    return (
    <span>
    {this.props.itemkey===0?null:<div className="menuItemSpace"></div>}
    <div className={this.props.item.action?'menuItem hiddenOnMobileView':'menuItem'} onClick={()=>this.handelClick()}>
      <Link to={this.props.item.link} className={this.props.item.slot&&(this.props.page===this.props.item.slot||this.props.product===this.props.item.slot)?'activeMenuItem':''}>
          {this.props.item.title}
      </Link>
    </div>
    {this.props.itemkey===this.props.itemsLength-1?null:<div className="menuItemSpace"></div>}
    </span>
    );
  }
}

export default MenuItem;
