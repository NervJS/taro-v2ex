import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.css'

// 支付宝小程序不需要引用 @tarojs/async-await
if (Taro.getEnv() !== Taro.ENV_TYPE.ALIPAY) {
  require('@tarojs/async-await')
}

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/nodes/nodes',
      'pages/hot/hot',
      'pages/node_detail/node_detail',
      'pages/thread_detail/thread_detail'
    ],
    tabBar: {
      list: [{
        'iconPath': 'resource/latest.png',
        'selectedIconPath': 'resource/lastest_on.png',
        pagePath: 'pages/index/index',
        text: '最新'
      }, {
        'iconPath': 'resource/hotest.png',
        'selectedIconPath': 'resource/hotest_on.png',
        pagePath: 'pages/hot/hot',
        text: '热门'
      }, {
        'iconPath': 'resource/node.png',
        'selectedIconPath': 'resource/node_on.png',
        pagePath: 'pages/nodes/nodes',
        text: '节点'
      }],
      'color': '#000',
      'selectedColor': '#56abe4',
      'backgroundColor': '#fff',
      'borderStyle': 'white'
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'V2EX',
      navigationBarTextStyle: 'black'
    }
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
