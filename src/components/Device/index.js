// @flow
import Settings from 'stores/models/settings';
import DeviceType from 'stores/models/device';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {deviceHeader} from 'styles/sizes';
import ORIENTATIONS from 'config/orientations';

//external
import Framed from 'react-frame-component';

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
  Keyboard
} from './styles';

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

  setWebView = webview => {
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

  takeSnapshot = () => {
    this.webview.capturePage(image => {
      const date = new Date();
      const dateFormat = `${date.getDate()}.${date.getMonth()}.${date.getYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      window.fs.writeFile(
        `screenshots/sizzy_${this.props.device.id}_${dateFormat}_screenshot.png`,
        image.toPNG(),
        function(err) {
          if (err) throw err;
          console.log("It's saved!");
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
        transform: `scale(${zoomValue})`,
        transformOrigin: 'top left',
        position: 'absolute',
        border: 'none',
        top: deviceHeaderTotalHeight,
        left: 0,
        borderRadius: 3,
        backgroundColor: 'white',
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
          <Buttons>
            {!smallZoom &&
              <Button
                onClick={() => toggleFocusDevice(deviceId)}
                title="Settings"
              >
                <ButtonIcon className={buttonIconClassname} name="bullseye" />
              </Button>}

            {!smallZoom &&
              isElectron &&
              <Button onClick={this.takeSnapshot} title="Camera">
                <ButtonIcon className={buttonIconClassname} name="camera" />
              </Button>}

            {!smallZoom &&
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
              </Button>}

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

          <Name small={smallZoom}> {name} </Name>

          <Size>
            {showSize && <span>{width} x {height} </span>}
          </Size>
        </Header>

        {urlToLoad &&
          <div>
            {!isElectron && <iframe src={urlToLoad} {...frameProps} />}

            {isElectron &&
              <webview
                is
                ref={this.setWebView}
                useragent={userAgent}
                src={urlToLoad}
                {...frameProps}
              />}

            {shouldShowKeyboard &&
              <Keyboard
                src={
                  keyboardImg &&
                    (orientation === ORIENTATIONS.LANDSCAPE
                      ? keyboardImg.landscape
                      : keyboardImg.portrait)
                }
              />}
          </div>}

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
