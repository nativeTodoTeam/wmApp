/*
 * 基于iPhone6 适配屏幕
 * 2018/8/3
 */
import {
  Dimensions,
  PixelRatio
} from 'react-native';

const defaultSize = {
  width: 350,
  height: 667,
};

console.log(Dimensions, PixelRatio)

const defaultPixel = 2;

const screenWidthDp = Dimensions.get('window').width; // 获取屏幕宽度
const screenHeightDp = Dimensions.get('window').height; // 获取屏幕高度

const fontScale = PixelRatio.getFontScale(); // 字体大小缩放比例

const pixelRatio = PixelRatio.get(); // 设备像素密度

const scale = Math.min(screenWidthDp / defaultSize.width,
  screenHeightDp / defaultSize.height); // 计算缩放比例

export const scaleFont = (size) => {
  return size * scale / fontScale / defaultPixel;
}

export const scaleSize = (size) => {
  return size * scale / defaultPixel;
}

export const scaleDp = (size) => {
  return size * pixelRatio / defaultPixel;
}
