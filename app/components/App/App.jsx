'use strict';

import './_App.scss';

import React from 'react';
import AppActions from '../../actions/AppActions';
import ItemsStore from '../../stores/ItemsStore';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';

function getAppState() {
  return {
    items: ItemsStore.getAll()
  };
}

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = getAppState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ItemsStore.addChangeListener(this.onChange);
    AppActions.getItems();
  }

  componentWillUnmount() {
    ItemsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getAppState());
  }

  render() {
    return (
      <div className={'app'}>
        <Body items={this.state.items} />
        <Footer />
      </div>
    );
  }
}
