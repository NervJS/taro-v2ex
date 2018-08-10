import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import url from '../resource/spiner.gif'

class Loading extends Component {
  render () {
    return (
      <View className='loading'>
        <Image src={url} className='img' />
      </View>
    )
  }
}

export { Loading }
