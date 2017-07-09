import styled from 'styled-components';
import flex from 'styles/flex';
import {deviceHeader} from 'styles/sizes';
import {colorTransition} from 'styles/shared';
import {
  rotateIconOnOrientationChange,
  whenHovering,
  cond
} from 'utils/sc-utils';

//external
import $Icon from 'react-fontawesome';

//classnames
export const buttonIconClassname = 'c-device__button-icon';

const sizes = {
  button: {
    size: 25,
    iconSize: 18
  }
};

export const Device = styled.div`
  ${flex.vertical}
  ${p => cond(!p.appHasFocusedDevice, `
    margin-bottom: 25px
    margin-right: 25px;
  `)};
`;

export const Header = styled.div`
  ${flex.vertical}
  ${flex.centerVerticalV}
  height: ${deviceHeader.height}px;
  width: 100%;
`;

export const Name = styled.div`
  font-size: ${p => (p.small ? 12 : 15)}px;
  font-weight: 400;
  color: ${p => p.theme.color};
`;

export const Buttons = styled.div`
  ${flex.horizontal}
  flex: 1;
  margin-top: 8px;
`;

export const Button = styled.div`
  ${flex.horizontal}
  ${flex.centerHorizontal}
  cursor: pointer;
  width: ${sizes.button.size}px;
  height: ${sizes.button.size}px;
  border: 1px solid rgba(255, 255, 255, 0.27);
  border-radius: 4px;
  transition: all 50ms linear;
  margin-right: 5px;
  
  &:last-child {
    margin: 0;
  }
  
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
  
  ${whenHovering(buttonIconClassname, `
    color: rgba(255, 255, 255, 0.8);
  `)}
  
  ${p => cond(p.disabled, `
    cursor: default;
    opacity: 0.2;
  `)}
  
   ${p => cond(p.value === true, `
      .${buttonIconClassname}{
        color: rgba(255, 255, 255, 0.8);
      }
   `)}
`;

export const Size = styled.span`
  ${flex.horizontal}
  font-size: 11px;
  color: #778398;
  flex: 1;
  margin-left: 7px;
`;

export const ButtonIcon = styled($Icon)`
  transition: ${colorTransition};
  ${rotateIconOnOrientationChange};
  color: rgba(255,255,255, 0.27);
  font-size: ${p => p.fontSize || sizes.button.iconSize}px !important;
`;

export const Keyboard = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
`;

export const WhiteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999999999;
`;

export const NameAndSize = styled.div`
  ${flex.horizontal}  
  ${flex.centerHorizontalV}  
  width: 100%;
`;

export const FrameWrap = styled.div`
  position: absolute;
`;
