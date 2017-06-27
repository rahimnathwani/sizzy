// @flow
import typeof store from 'stores/store';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {isWebUri} from 'valid-url';

//styled-components
import {Home, Content} from './styles';

//components
import WelcomeBox from 'components/WelcomeBox';
import Sizzy from 'components/Sizzy';

//external
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

type Props = {
  store: any | store,
  children?: React.Element<*>
};

@inject('store')
@observer
class HomeComponent extends Component {
  props: Props;

  static defaultProps = {
    store: null
  };

  componentDidMount() {
    const {store} = this.props;
    const {router} = store;
    const {queryParams} = router;

    const {protocol} = window.location;
    let {url} = queryParams;

    let hasUrlParam = url && url.trim() !== '';

    //if url param exists, but it's invalid, try to append the current protocol
    if (hasUrlParam && !isWebUri(url)) {
      url = `${window.isElectron ? 'http:' : protocol}//${url}`;
    }

    //set correct url in the url input box
    store.app.setUrl(url);

    //if initial url is provided from query param, still check if it's http/https and inverse if needed
    store.app.setUrltoLoad(url, hasUrlParam, false);
  }

  render() {
    const {store: {app}} = this.props;

    const {isValidUrl, urlIsLoaded} = app;

    return (
      <Home>

        <Content>

          <ReactCSSTransitionGroup
            transitionName="fadeout"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={400}
          >
            {!urlIsLoaded && <WelcomeBox />}
          </ReactCSSTransitionGroup>

          {isValidUrl && <Sizzy />}
        </Content>
      </Home>
    );
  }
}

export default HomeComponent;
