import React from 'react';
import { Animated, Text, View, StyleSheet, Image, PanResponder, Easing, Dimensions, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import { scaleSize } from '../common/config/screenSize';

export default class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
    this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
    this.state = {
      deviceWidth: Dimensions.get('window').width, // 设备宽度
      deviceHeight: Dimensions.get('window').height, // 设备高度
      translateX: new Animated.Value(0), // View移动距离
      sIndex: 0, // 当前页
      isPrevMove: false, // 是否往上一页移动
      moveLeft: 0, // swiper向左移动距离
      moveTop: 0, // 标题滑动距离

      imgScale: new Animated.Value(1), // 图片放大比例
      defaultImgScale: 1, // 放大比例 计算方法: (当前图片距离顶部的距离*2 + 图片高度)/图片高度
      scaleImgZIndex: 0, // 被放大的图片的zindex



      swiperWidth: scaleSize(642), // View宽度
      swiperTop: scaleSize(346), // swpier距离顶部距离
      imgWidth: scaleSize(540), // 内容宽度
      imgHeight: scaleSize(740), // 内容高度
      defaultOpacity: [0, 0.5], // 默认透明度
      defaultScale: 0.8, // 默认缩放比例1-0.6区间
      imgArr: [ // 页面数据
        {
          imgUrl: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2103150710/O1CN011H7Df2Cy6OZwTY5_!!2103150710.jpg_430x430q90.jpg',
          title: '推荐',
          description: 'IT技术'
        },
        {
          imgUrl: 'https://img.alicdn.com/imgextra/i4/1917047079/TB20BE0XzDpK1RjSZFrXXa78VXa_!!1917047079.jpg_430x430q90.jpg',
          title: '推荐',
          description: 'IT技术'
        },
        {
          imgUrl: 'https://img.alicdn.com/imgextra/i3/2030627568/O1CN0125mBt8kL7apoEH1_!!0-item_pic.jpg_430x430q90.jpg',
          title: '推荐',
          description: 'IT技术'
        },
        {
          imgUrl: 'https://img.alicdn.com/imgextra/i2/765897259/TB1Qs6LdsjI8KJjSsppXXXbyVXa_!!0-item_pic.jpg_430x430q90.jpg',
          title: '推荐',
          description: 'IT技术'
        },
        {
          imgUrl: 'https://img.alicdn.com/imgextra/i4/2911805119/O1CN011ngXvdnu2u5vRjX_!!2911805119.jpg_430x430q90.jpg',
          title: '推荐',
          description: 'IT技术'
        },
      ],

      swiperTitleNull: scaleSize(80), // 标题滑动空白间距
      swiperTitleWidth: scaleSize(300), // 标题宽度
      swiperTitleHeight: scaleSize(136), // 标题高度

    };
  }

  componentWillMount() {
    // 计算初始化页面布局
    let arr = this.state.imgArr;
    for (let i = 0; i < arr.length; i++) {
      arr[i].zIndex = arr.length - i;
    }

    this.setState({
      moveLeft: (this.state.deviceWidth - this.state.swiperWidth)/2 + (this.state.imgWidth - this.state.defaultScale * this.state.imgWidth)/2 + this.state.defaultScale * this.state.imgWidth,
      imgArr: arr,
      moveTop: this.state.swiperTitleHeight + this.state.swiperTitleNull,

      defaultImgScale: (this.state.swiperTop * 2 + this.state.imgHeight)/this.state.imgHeight,
    });

    // 绑定手势事件
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  _handlePanResponderGrant(evt, gestureState) {
    // console.log('start');
  }
  _handlePanResponderMove(evt, gestureState) {
    // console.log('move');
    console.log(gestureState.dx);
    if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
      // console.log('横向滑动')
      if (gestureState.dx > 0 && this.state.sIndex > 0) {
        this.setState({
          isPrevMove: true
        });
        Animated.timing(
          this.state.translateX,
          {
            toValue: gestureState.dx > this.state.moveLeft ? this.state.moveLeft - this.state.moveLeft * this.state.sIndex : gestureState.dx - this.state.moveLeft * this.state.sIndex,
            duration: 0,
            useNativeDriver: true
          }
        ).start(); 
      } else if (gestureState.dx < 0 && this.state.sIndex < this.state.imgArr.length - 1) {
        this.setState({
          isPrevMove: false
        });
        Animated.timing(
          this.state.translateX,
          {
            toValue: gestureState.dx < -this.state.moveLeft ? -this.state.moveLeft - this.state.moveLeft * this.state.sIndex : gestureState.dx - this.state.moveLeft * this.state.sIndex,
            duration: 0,
            useNativeDriver: true
          }
        ).start(); 
      }
    }
  }
  _handlePanResponderEnd(evt, gestureState) {
    // console.log('end');
    if (gestureState.dx > this.state.deviceWidth/5 && this.state.sIndex > 0) {
      Animated.timing(
        this.state.translateX,
        {
          toValue: this.state.moveLeft - this.state.moveLeft * this.state.sIndex,
          duration: 300,
          easing: Easing.in(),
          useNativeDriver: true
        }
      ).start(() => {
        let index = this.state.sIndex - 1;
        this.setState({
          sIndex: index,
          isPrevMove: false
        })
      })
    } else if (gestureState.dx < -this.state.deviceWidth/5 && this.state.sIndex < this.state.imgArr.length - 1) {
      Animated.timing(
        this.state.translateX,
        {
          toValue: this.state.moveLeft * -1 - this.state.moveLeft * this.state.sIndex,
          duration: 300,
          easing: Easing.in(),
          useNativeDriver: true
        }
      ).start(() => {
        let index = this.state.sIndex + 1;
        this.setState({
          sIndex: index,
          isPrevMove: false
        })
      })
    } else {
      // console.log('复原');
      Animated.timing(
        this.state.translateX,
        {
          toValue: (this.state.moveLeft * (this.state.sIndex - 1) + this.state.moveLeft) * -1,
          duration: 300,
          easing: Easing.in(),
          useNativeDriver: true
        }
      ).start()
    }
  }

  render() {

    const {
      deviceWidth,
      imgArr,
      translateX,
      swiperWidth,
      imgWidth,
      imgHeight,
      moveLeft,
      sIndex,
      defaultScale,
      isPrevMove,
      defaultOpacity,
      swiperTitleNull,
      swiperTitleHeight,
      swiperTitleWidth,
      moveTop,

      imgScale,
      swiperTop,
      defaultImgScale,
      scaleImgZIndex } = this.state;
    
    let transformArr = []; // 卡片位置变化
    let opacityArr = []; // swiper颜色蒙层变化
    let consoleArr = [];

    // 计算位移
    for (let i = 0; i < imgArr.length; i++) {

      let scale;
      let scale2;
      let _translateX;
      let _translateX2;

      switch (i) {
        case sIndex:
          scale = defaultScale;
          scale2 = 1;
          if (imgArr.length == 2) {
            _translateX = (imgWidth - scale * imgWidth)/2 + (swiperWidth - imgWidth);
          } else {
            _translateX = (imgWidth - scale * imgWidth)/2 + (swiperWidth - imgWidth)/2;
          }
          _translateX2 = 0;
          break;
        case sIndex - 1:
          scale = 1 - (1 - defaultScale) * Math.abs(i - sIndex - 1);
          scale2 = 1 - (1 - defaultScale) * Math.abs(i - sIndex);
          _translateX = -moveLeft * (sIndex + 1 - i);
          _translateX2 = -moveLeft * (sIndex - i);
          break;
        case sIndex + 1:
          scale = 1;
          scale2 = defaultScale;
          _translateX = 0;
          if (imgArr.length == 2) {
            _translateX2 = (imgWidth - scale2 * imgWidth)/2 + (swiperWidth - imgWidth);
          } else {
            _translateX2 = (imgWidth - scale2 * imgWidth)/2 + (swiperWidth - imgWidth)/2;
          }
          break;
        case sIndex + 2:
          scale = defaultScale;
          scale2 = 1 - (1 - defaultScale) * 2;
          if (imgArr.length == 2) {
            _translateX = (imgWidth - scale * imgWidth)/2 + (swiperWidth - imgWidth);
          } else {
            _translateX = (imgWidth - scale * imgWidth)/2 + (swiperWidth - imgWidth)/2;
          }
          _translateX2 = (imgWidth - scale2 * imgWidth)/2 + (swiperWidth - imgWidth);
          break;
        default: 
          if (i > sIndex + 2) {
            scale = 1 - (1 - defaultScale) * 2;
            scale2 = 1 - (1 - defaultScale) * 2;
            _translateX = (imgWidth - scale * imgWidth)/2 + (swiperWidth - imgWidth);
            _translateX2 = (imgWidth - scale2 * imgWidth)/2 + (swiperWidth - imgWidth);
          } else {
            scale = 1 - (1 - defaultScale) * 2;
            scale2 = 1 - (1 - defaultScale) * 2;
            _translateX = -moveLeft * (sIndex - i);
            _translateX2 = -moveLeft * (sIndex - i);
          }
          break;
      }

      // console.log(_translateX)
      // console.log(_translateX2)

      let transform;
      let opacity;

      if (i == sIndex) {

        if (isPrevMove) {

          // consoleArr.push([0, _translateX, 1, scale]);

          transform = [{translateX: translateX.interpolate({
            inputRange: [-moveLeft * sIndex, -moveLeft * (sIndex - 1)],
            outputRange: [0, _translateX],
          })}, {scaleX: translateX.interpolate({
            inputRange: [-moveLeft * sIndex, -moveLeft * (sIndex - 1)],
            outputRange: [1, scale],
          })}, {scaleY: translateX.interpolate({
            inputRange: [-moveLeft * sIndex, -moveLeft * (sIndex - 1)],
            outputRange: [1, scale],
          })}];

          opacity = translateX.interpolate({
            inputRange: [-moveLeft * sIndex, -moveLeft * (sIndex - 1)],
            outputRange: [defaultOpacity[0], defaultOpacity[1]]
          });
        } else {

          // consoleArr.push([-moveLeft, 0, scale, 1]);
          
          transform = [{translateX: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [-moveLeft, 0],
          })}, {scaleX: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [scale, 1],
          })}, {scaleY: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [scale, 1],
          })}];

          opacity = translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [0, 0]
          });
        }
      } else if (i > sIndex) {

        // consoleArr.push([_translateX, _translateX2, scale, scale2]);

        if ((i < sIndex + 3 && !isPrevMove) || (i < sIndex + 2 && isPrevMove)) {
          transform = [{translateX: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [_translateX, _translateX2],
          })}, {scaleX: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [scale, scale2],
          })}, {scaleY: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [scale, scale2],
          })}];
        } else {
          transform = [{translateX: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [_translateX2, _translateX2],
          })}, {scaleX: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [scale2, scale2],
          })}, {scaleY: translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [scale2, scale2],
          })}];
        }

        if (i - sIndex == 1 && !isPrevMove) {

          opacity = translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [defaultOpacity[0], defaultOpacity[1]]
          });
        } else {

          opacity = translateX.interpolate({
            inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
            outputRange: [defaultOpacity[1], defaultOpacity[1]]
          });
        }
        
      } else {

        // consoleArr.push([-moveLeft * (sIndex + 1 - i), -moveLeft * (sIndex - i), scale, scale2]);

        transform = [{translateX: translateX.interpolate({
          inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
          outputRange: [_translateX, _translateX2],
        })}, {scaleX: translateX.interpolate({
          inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
          outputRange: [scale, scale2],
        })}, {scaleY: translateX.interpolate({
          inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
          outputRange: [scale, scale2],
        })}];

        opacity = translateX.interpolate({
          inputRange: [-moveLeft * (sIndex + 1), -moveLeft * sIndex],
          outputRange: [0, 0]
        });
      }
      transformArr.push(transform);
      opacityArr.push(opacity);
    }
    // console.log(consoleArr);

    return (
      <View style={styles.container}>
        <Animated.Image
          shouldRasterizeIOS={true}
          renderToHardwareTextureAndroid={true}
          style={{
            ...styles.transformImage,
            top: swiperTop,
            // opacity: imgScale > 1 ? 1 : 0,
            opacity: imgScale.interpolate({
              inputRange: [1, 1.01, defaultImgScale],
              outputRange: [0, 1, 1],
            }),
            zIndex: scaleImgZIndex,
            width: imgWidth,
            height: imgHeight,
            transform: [
              {
                scale: imgScale
              }
            ]
          }}
          source={{uri: imgArr[sIndex].imgUrl}} />
        {/* 顶部 */}
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
          </View>
          <View style={styles.topRight}>
            <Image style={styles.topRightImg} source={require('./icon.png')} />
          </View>
        </View>
        {/* 标题部分 */}
        <View style={{
          ...styles.swiperTitle,
          width: swiperTitleWidth,
          height: swiperTitleHeight
        }} >
          <Animated.View
            shouldRasterizeIOS={true}
            renderToHardwareTextureAndroid={true}
            style={{
              transform: [{
                translateY: translateX.interpolate({
                  inputRange: [-moveLeft * sIndex, -moveLeft * (sIndex - 1)],
                  outputRange: [-moveTop * sIndex, -moveTop * (sIndex - 1)],
                })
              }]
            }} >
          {
            imgArr.map((item, index) => {
              return <View
                key={index}
                style={{
                  height: swiperTitleHeight + swiperTitleNull
                }} >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={{height: swiperTitleNull}} />
              </View>
            })
          }
          </Animated.View>
        </View>
        {/* 滑块部分 */}
        <View
          {...this._panResponder.panHandlers}            
          style={{
            ...styles.swiperContainer,
            height: imgHeight
          }} >
          {
            imgArr.map((item, index) => {
              return <Animated.View
                key={index}
                shouldRasterizeIOS={true}
                renderToHardwareTextureAndroid={true}
                style={{
                  ...styles.transformView,
                  zIndex: item.zIndex,
                  width: imgWidth,
                  height: imgHeight,
                  transform: transformArr[index],
                  left: (deviceWidth - swiperWidth)/2
                }} >
                <Animated.Image
                  shouldRasterizeIOS={true}
                  renderToHardwareTextureAndroid={true}
                  style={{
                    borderRadius: scaleSize(28),
                    width: imgWidth,
                    height: imgHeight
                  }}
                  source={{uri: item.imgUrl}} />
                <Animated.View
                  shouldRasterizeIOS={true}
                  renderToHardwareTextureAndroid={true}
                  style={{
                    ...styles.cover,
                    opacity: opacityArr[index],
                    width: imgWidth,
                    height: imgHeight,
                    borderRadius: scaleSize(28)
                  }} />
              </Animated.View>
            })
          }
        </View>
        <View style={styles.bookTitleView}>
          <Text style={styles.bookTitle}>亚太设计年鉴亚</Text>
          <Text style={styles.bookEditor}>亚太设计年鉴</Text>
        </View>
        <View style={styles.bookNext}>
          <Text style={styles.bookNextText}>IT技术 ··＞</Text>
          <Image style={styles.bookNextImg} source={require('./icon.png')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    position: 'relative',
  },
  top: {
    marginTop: scaleSize(68),
    height: scaleSize(64),
    flex: 0,
    paddingLeft: scaleSize(26),
    paddingRight: scaleSize(26),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topLeft: {
    flex: 0,
    height: scaleSize(64),
    justifyContent: 'center'
  },
  line: {
    width: scaleSize(44),
    height: scaleSize(4),
    backgroundColor: '#424242',
    borderRadius: scaleSize(200),
    marginTop: scaleSize(10),
    marginBottom: scaleSize(10)
  },
  topRight: {
    flex: 0,
    height: scaleSize(64),
    justifyContent: 'center',
    width: scaleSize(64),
    height: scaleSize(64),
  },
  topRightImg: {
    width: scaleSize(64),
    height: scaleSize(64),
    borderRadius: scaleSize(32)
  },
  swiperContainer: {
    flex: 0,
    zIndex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    width: Dimensions.get('window').width,
    marginTop: scaleSize(48),
  },
  transformView: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: scaleSize(0), height: scaleSize(4)},
    shadowOpacity: 0.18,
    shadowRadius: scaleSize(30)
  },
  transformImage: {
    position: 'absolute',
    left: scaleSize(70),
  },
  cover: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#ffffff',
  },
  swiperTitle: {
    flex: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginLeft: scaleSize(54),
    marginTop: scaleSize(30),
  },
  title: {
    fontSize: scaleSize(60),
    lineHeight: scaleSize(68),
    marginBottom: scaleSize(12),
    color: '#212121',
    fontFamily: 'PingFangSC-Medium'
  },
  description: {
    fontSize: scaleSize(48),
    lineHeight: scaleSize(56),
    color: '#424242',
    fontFamily: 'PingFangSC-Regular'
  },
  bookTitleView: {
    paddingLeft: scaleSize(54),
    marginTop: scaleSize(48)
  },
  bookTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: scaleSize(40),
    color: '#212121',
    lineHeight: scaleSize(60),
  },
  bookEditor: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: scaleSize(30),
    color: '#939393',
    lineHeight: scaleSize(50)
  },
  bookNext: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: scaleSize(28)
  },
  bookNextText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: scaleSize(40),
    color: '#50bbd8',
    lineHeight: scaleSize(84)
  },
  bookNextImg: {
    marginLeft: scaleSize(10),
    width: scaleSize(42),
    height: scaleSize(16)
  }
});