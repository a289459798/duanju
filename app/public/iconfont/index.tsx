/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconPartner from './IconPartner';
import IconBlank from './IconBlank';
import IconRun from './IconRun';
import IconDownload from './IconDownload';
import IconZoomOut from './IconZoomOut';
import IconZoomIn from './IconZoomIn';
import IconRotateRight from './IconRotateRight';
import IconRotateLeft from './IconRotateLeft';
import IconAnteType from './IconAnteType';
import IconPhotoFail from './IconPhotoFail';
import IconPhotoFailCopy from './IconPhotoFailCopy';
import IconClean from './IconClean';
import IconDot from './IconDot';
import IconReplay from './IconReplay';
import IconStop from './IconStop';
import IconConfirm from './IconConfirm';
import IconTools from './IconTools';
import IconSetting from './IconSetting';
import IconNotice from './IconNotice';
import IconCopy from './IconCopy';
import IconMenu from './IconMenu';
import IconWechat from './IconWechat';
import IconSuccess from './IconSuccess';
import IconClose from './IconClose';
import IconLogin from './IconLogin';
import IconArrowRight from './IconArrowRight';
import IconLogout from './IconLogout';
import IconSend from './IconSend';
import IconAbout from './IconAbout';
import IconPic from './IconPic';
import IconArrow from './IconArrow';
import IconChat from './IconChat';
import IconDelete from './IconDelete';
import IconAdd from './IconAdd';
import IconTips from './IconTips';
import IconStar from './IconStar';
import IconArrowDown from './IconArrowDown';
import IconMedia from './IconMedia';
import IconNotification from './IconNotification';
export { default as IconPartner } from './IconPartner';
export { default as IconBlank } from './IconBlank';
export { default as IconRun } from './IconRun';
export { default as IconDownload } from './IconDownload';
export { default as IconZoomOut } from './IconZoomOut';
export { default as IconZoomIn } from './IconZoomIn';
export { default as IconRotateRight } from './IconRotateRight';
export { default as IconRotateLeft } from './IconRotateLeft';
export { default as IconAnteType } from './IconAnteType';
export { default as IconPhotoFail } from './IconPhotoFail';
export { default as IconPhotoFailCopy } from './IconPhotoFailCopy';
export { default as IconClean } from './IconClean';
export { default as IconDot } from './IconDot';
export { default as IconReplay } from './IconReplay';
export { default as IconStop } from './IconStop';
export { default as IconConfirm } from './IconConfirm';
export { default as IconTools } from './IconTools';
export { default as IconSetting } from './IconSetting';
export { default as IconNotice } from './IconNotice';
export { default as IconCopy } from './IconCopy';
export { default as IconMenu } from './IconMenu';
export { default as IconWechat } from './IconWechat';
export { default as IconSuccess } from './IconSuccess';
export { default as IconClose } from './IconClose';
export { default as IconLogin } from './IconLogin';
export { default as IconArrowRight } from './IconArrowRight';
export { default as IconLogout } from './IconLogout';
export { default as IconSend } from './IconSend';
export { default as IconAbout } from './IconAbout';
export { default as IconPic } from './IconPic';
export { default as IconArrow } from './IconArrow';
export { default as IconChat } from './IconChat';
export { default as IconDelete } from './IconDelete';
export { default as IconAdd } from './IconAdd';
export { default as IconTips } from './IconTips';
export { default as IconStar } from './IconStar';
export { default as IconArrowDown } from './IconArrowDown';
export { default as IconMedia } from './IconMedia';
export { default as IconNotification } from './IconNotification';

export type IconNames = 'partner' | 'blank' | 'run' | 'download' | 'zoom-out' | 'zoom-in' | 'rotate-right' | 'rotate-left' | 'ante-type' | 'photo-fail' | 'photo-fail-copy' | 'clean' | 'dot' | 'replay' | 'stop' | 'confirm' | 'tools' | 'setting' | 'notice' | 'copy' | 'menu' | 'wechat' | 'success' | 'close' | 'login' | 'arrow-right' | 'logout' | 'send' | 'about' | 'pic' | 'arrow' | 'chat' | 'delete' | 'add' | 'tips' | 'star' | 'arrow-down' | 'media' | 'notification';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'partner':
      return <IconPartner key="1" {...rest} />;
    case 'blank':
      return <IconBlank key="2" {...rest} />;
    case 'run':
      return <IconRun key="3" {...rest} />;
    case 'download':
      return <IconDownload key="4" {...rest} />;
    case 'zoom-out':
      return <IconZoomOut key="5" {...rest} />;
    case 'zoom-in':
      return <IconZoomIn key="6" {...rest} />;
    case 'rotate-right':
      return <IconRotateRight key="7" {...rest} />;
    case 'rotate-left':
      return <IconRotateLeft key="8" {...rest} />;
    case 'ante-type':
      return <IconAnteType key="9" {...rest} />;
    case 'photo-fail':
      return <IconPhotoFail key="10" {...rest} />;
    case 'photo-fail-copy':
      return <IconPhotoFailCopy key="11" {...rest} />;
    case 'clean':
      return <IconClean key="12" {...rest} />;
    case 'dot':
      return <IconDot key="13" {...rest} />;
    case 'replay':
      return <IconReplay key="14" {...rest} />;
    case 'stop':
      return <IconStop key="15" {...rest} />;
    case 'confirm':
      return <IconConfirm key="16" {...rest} />;
    case 'tools':
      return <IconTools key="17" {...rest} />;
    case 'setting':
      return <IconSetting key="18" {...rest} />;
    case 'notice':
      return <IconNotice key="19" {...rest} />;
    case 'copy':
      return <IconCopy key="20" {...rest} />;
    case 'menu':
      return <IconMenu key="21" {...rest} />;
    case 'wechat':
      return <IconWechat key="22" {...rest} />;
    case 'success':
      return <IconSuccess key="23" {...rest} />;
    case 'close':
      return <IconClose key="24" {...rest} />;
    case 'login':
      return <IconLogin key="25" {...rest} />;
    case 'arrow-right':
      return <IconArrowRight key="26" {...rest} />;
    case 'logout':
      return <IconLogout key="27" {...rest} />;
    case 'send':
      return <IconSend key="28" {...rest} />;
    case 'about':
      return <IconAbout key="29" {...rest} />;
    case 'pic':
      return <IconPic key="30" {...rest} />;
    case 'arrow':
      return <IconArrow key="31" {...rest} />;
    case 'chat':
      return <IconChat key="32" {...rest} />;
    case 'delete':
      return <IconDelete key="33" {...rest} />;
    case 'add':
      return <IconAdd key="34" {...rest} />;
    case 'tips':
      return <IconTips key="35" {...rest} />;
    case 'star':
      return <IconStar key="36" {...rest} />;
    case 'arrow-down':
      return <IconArrowDown key="37" {...rest} />;
    case 'media':
      return <IconMedia key="38" {...rest} />;
    case 'notification':
      return <IconNotification key="39" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
