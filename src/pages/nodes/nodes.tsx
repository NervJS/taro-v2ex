import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import allNodes from './all_node'

import './nodes.css'

class Nodes extends Component<{}, {}> {
  config = {
    navigationBarTitleText: '节点'
  }

  render () {
    const element = allNodes.map(item => {
      const nodes = item.nodes.map(node => {
        return (
          <Text className='tag' key={node.full_name}>
            {node.full_name}
          </Text>
        )
      })
      return (
        <View key={item.title} className='container'>
          <View className='title'>
            <Text style='margin-left: 5px'>
              {item.title}
            </Text>
          </View>
          <View className='nodes'>
            {nodes}
          </View>
        </View>
      )
    })
    return (
      <View className='node-container'>
        {element}
      </View>
    )
  }
}

export default Nodes
