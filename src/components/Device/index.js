// @flow
import Settings from 'stores/models/settings';
import DeviceType from 'stores/models/device';
import {action, observable} from 'mobx';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {deviceHeader} from 'styles/sizes';
import ORIENTATIONS from 'config/orientations';

//external
import Framed from 'react-frame-component';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//styled-components
import {
  Name,
  Header,
  Button,
  ButtonIcon,
  Device,
  Buttons,
  Size,
  buttonIconClassname,
  Keyboard,
  WhiteOverlay,
  FrameWrap,
  NameAndSize
} from './styles';

//electron
const {os, fs} = window;

type Props = {
  device: DeviceType,
  children?: React.Element<*>,
  theme: Object,
  visible: boolean,
  url: string,
  urlToLoad: string,
  toggleFocusDevice: (deviceId: ?string) => any,
  appHasFocusedDevice: boolean,
  devicesSpaceHeight: number,
  isElectron: boolean
};

@observer class DeviceComponent extends Component {
  props: Props;
  settings: Settings = new Settings();
  webview: Object;
  @observable takingScreenshot = false;

  setWebView = (webview: Object) => {
    if (webview) {
      this.webview = webview;
      this.webview.addEventListener('did-stop-loading', () => {
        let webContents = this.webview.getWebContents();
        webContents.enableDeviceEmulation({
          screenPosition: 'mobile'
        });
      });
    }
  };

  @action takeSnapshot = () => {
    this.takingScreenshot = true;
    this.webview.capturePage(image => {
      const date = new Date();
      const dateFormat = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const directory = `${os.homedir()}/Sizzy`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      fs.writeFile(
        `${directory}/sizzy_${this.props.device.id}_${dateFormat}_screenshot.png`,
        image.toPNG(),
        err => {
          if (err) throw err;
          setTimeout(() => {
            this.takingScreenshot = false;
          }, 500);
        }
      );
    });
  };

  render() {
    const {
      device: {
        width,
        name,
        userAgent,
        height,
        settings,
        keyboardImg,
        id: deviceId
      },
      children,
      theme,
      visible,
      url,
      urlToLoad,
      toggleFocusDevice,
      appHasFocusedDevice,
      devicesSpaceHeight,
      isElectron
    } = this.props;

    const {orientation, zoom, showSizes, showKeyboard} = settings;

    //invert values in landscape
    const landscape = orientation === ORIENTATIONS.LANDSCAPE;
    const iframeHeight = (landscape ? width : height) || 0;
    const iframeWidth = (landscape ? height : width) || 0;

    const focusedDevicePadding = 50;
    const totalDeviceHeight = devicesSpaceHeight - focusedDevicePadding * 2;
    const focusedDeviceZoom = totalDeviceHeight * 100 / iframeHeight;
    const deviceNeedsZoomOut = iframeHeight > totalDeviceHeight;
    const zoomToUse = appHasFocusedDevice
      ? deviceNeedsZoomOut ? focusedDeviceZoom : 100
      : zoom;

    const zoomValue = zoomToUse * 0.01;

    const deviceHeaderTotalHeight =
      deviceHeader.height + deviceHeader.marginBottom;

    //highly dynamic styles must be inline
    const frameProps = {
      style: {
        border: 'none',
        left: 0,
        borderRadius: 3,
        ...theme.iframeStyle,
        width: iframeWidth,
        height: iframeHeight,
        backgroundColor: 'white'
      },
      width: `${iframeWidth}px`,
      height: `${iframeHeight}px`
    };

    const deviceStyle = {
      width: iframeWidth * zoomValue,
      height: iframeHeight * zoomValue + deviceHeaderTotalHeight,
      position: 'relative',
      display: visible ? 'flex' : 'none' //hide/show iframe instead of completely destroying it, much faster.
    };

    const hasChildren = !url && children;
    const smallZoom = zoom < 50;
    const showSize = showSizes === true && smallZoom === false;

    const shouldShowKeyboard = keyboardImg && showKeyboard;

    return (
      <Device appHasFocusedDevice={appHasFocusedDevice} style={deviceStyle}>

        <Header>
          <NameAndSize>
            <Name small={smallZoom}> {name} </Name>
            <Size>
              {showSize && <span> {'('}{width} x {height}{')'}</span>}
            </Size>
          </NameAndSize>

          <Buttons>
            <Button
              onClick={() => toggleFocusDevice(deviceId)}
              title="Settings"
            >
              <ButtonIcon className={buttonIconClassname} name="bullseye" />
            </Button>

            {isElectron &&
              <Button
                disabled={this.takingScreenshot}
                onClick={this.takeSnapshot}
                title="Camera"
              >
                <ButtonIcon
                  fontSize={13}
                  className={buttonIconClassname}
                  name="camera"
                />
              </Button>}

            <Button
              value={settings.showKeyboard}
              onClick={settings.toggleKeyboard}
              title="Keyboard"
            >
              <ButtonIcon
                className={buttonIconClassname}
                fontSize={14}
                name="keyboard-o"
              />
            </Button>

            <Button
              onClick={settings.toggleOrientation}
              title="Toggle orientation"
            >
              <ButtonIcon
                className={buttonIconClassname}
                orientation={orientation}
                name="mobile"
              />
            </Button>
          </Buttons>
        </Header>

        {urlToLoad &&
          <FrameWrap
            style={{
              width: iframeWidth,
              height: iframeHeight,
              transform: `scale(${zoomValue})`,
              top: deviceHeaderTotalHeight,
              transformOrigin: 'top left'
            }}
          >
            {!isElectron &&
              <iframe title={name} src={urlToLoad} {...frameProps} />}

            {isElectron &&
              <webview
                is
                ref={this.setWebView}
                useragent={userAgent}
                src={urlToLoad}
                {...frameProps}
              />}

            <ReactCSSTransitionGroup
              transitionName="screenshot"
              transitionEnterTimeout={200}
              transitionLeaveTimeout={200}
            >
              {isElectron && this.takingScreenshot && <WhiteOverlay />}
            </ReactCSSTransitionGroup>

            {shouldShowKeyboard &&
              <Keyboard
                src={
                  keyboardImg &&
                    (orientation === ORIENTATIONS.LANDSCAPE
                      ? keyboardImg.landscape
                      : keyboardImg.portrait)
                }
              />}
          </FrameWrap>}

        {/* Allows Sizzy to be used as a component/plugin in react-storybook, etc */}
        {hasChildren &&
          <Framed {...frameProps}>
            {children}
          </Framed>}
      </Device>
    );
  }
}

export default DeviceComponent;
