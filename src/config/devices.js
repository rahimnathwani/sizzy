import {DEVICE_TYPES, OS} from 'config/tags';

//keyboards
import iphone5keyboard from 'img/iphone-5-keyboard.png';
import iphone5keyboardlandscape from 'img/iphone-5-keyboard-landscape.png';

import iphone6keyboard from 'img/iphone-6-keyboard.png';
import iphone6keyboardlandscape from 'img/iphone-6-keyboard-landscape.png';

import iphone7keyboardportrait from 'img/iphone-7-plus-keyboard-portrait.png';
import iphone7keyboardlandscape from 'img/iphone-7-plus-keyboard-landscape.png';

import ipadAirKeyboardPortrait from 'img/ipad-air-keyboard-portrait.png';
import ipadAirKeyboardLandscape from 'img/ipad-air-keyboard-landscape.png';

//user agents
const iphoneUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

const devices = {
  iPhone4: {
    id: 'iphone4',
    name: 'iPhone 4',
    os: OS.APPLE,
    type: DEVICE_TYPES.PHONE,
    width: 320,
    height: 480,
    userAgent: iphoneUserAgent,
    iconName: '',
    keyboardImg: {
      portrait: iphone5keyboard,
      landscape: iphone5keyboardlandscape
    }
  },
  iPhone5: {
    id: 'iphone5',
    name: 'iPhone 5',
    os: OS.APPLE,
    type: DEVICE_TYPES.PHONE,
    width: 320,
    height: 568,
    userAgent: iphoneUserAgent,
    keyboardImg: {
      portrait: iphone5keyboard,
      landscape: iphone5keyboardlandscape
    }
  },
  iPhone6: {
    id: 'iphone6',
    name: 'iPhone 6',
    os: OS.APPLE,
    type: DEVICE_TYPES.PHONE,
    width: 375,
    height: 667,
    userAgent: iphoneUserAgent,
    keyboardImg: {
      portrait: iphone6keyboard,
      landscape: iphone6keyboardlandscape
    }
  },
  iPhone7plus: {
    id: 'iphone7plus',
    name: 'iPhone 7 Plus',
    os: OS.APPLE,
    type: DEVICE_TYPES.PHONE,
    width: 414,
    height: 736,
    userAgent: iphoneUserAgent,
    keyboardImg: {
      portrait: iphone7keyboardportrait,
      landscape: iphone7keyboardlandscape
    }
  },
  iPadAir: {
    id: 'ipadair',
    name: 'iPad Air',
    os: OS.APPLE,
    type: DEVICE_TYPES.TABLET,
    width: 768,
    height: 1024,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    keyboardImg: {
      portrait: ipadAirKeyboardPortrait,
      landscape: ipadAirKeyboardLandscape
    }
  },
  nexus6p: {
    id: 'nexus6p',
    name: 'Nexus 6P',
    os: OS.ANDROID,
    type: DEVICE_TYPES.PHONE,
    width: 411,
    height: 731,
    userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3102.0 Mobile Safari/537.36'
  },
  galaxys4: {
    id: 'galaxys4',
    name: 'Galaxy S4',
    os: OS.ANDROID,
    type: DEVICE_TYPES.PHONE,
    width: 360,
    height: 640,
    userAgent: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3102.0 Mobile Safari/537.36'
  },
  nexus7: {
    id: 'nexus7',
    os: OS.ANDROID,
    type: DEVICE_TYPES.TABLET,
    name: 'Nexus 7',
    width: 600,
    height: 960,
    userAgent: 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3102.0 Safari/537.36'
  }
};

export default devices;
