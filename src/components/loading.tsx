import React from 'react'
import { View, Image } from '@tarojs/components'
const url = require('../resource/spiner.gif')
import './loading.css'

class Loading extends React.Component {
  render () {
    return (
      <View className='loading'>
        <Image src={url} className='img' />
      </View>
    )
  }
}

export { Loading }
