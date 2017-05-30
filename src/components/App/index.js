// @flow
import typeof store from 'stores/store';

import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {ThemeProvider} from 'styled-components';

//styled-components
import {App} from './styles';

//external
import Body from 'react-body-classname';
import {MobxRouter} from 'mobx-router';

//components
import Toolbar from 'components/Toolbar';
import Home from 'views/Home';

type Props = {
  store: any | store
};

@inject('store')
@observer
class AppComponent extends Component {
  props: Props;

  static defaultProps = {
    store: null
  };

  render() {
    const {store: {app}} = this.props;
    const {loading, isValidUrl} = app;

    return (
      <ThemeProvider theme={app.theme}>
        <App>
          <Toolbar />
          <Body className={loading || !isValidUrl ? 'hide-scroll' : ''} />
          {window.isElectron ? <Home /> : <MobxRouter />}
        </App>
      </ThemeProvider>
    );
  }
}

export default AppComponent;
