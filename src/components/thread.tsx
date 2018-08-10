import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator, Image } from '@tarojs/components'

import { Member } from '../interfaces/member'
import { Node } from '../interfaces/node'
import timeago from 'timeago.js'

import './thread.css'

interface IProps {
  title: string,
  member: Member,
  node: Node,
  last_modified: number,
  id: number,
  replies: number
  key?: number
}

const timeInst = timeago()

// 数字/英文与中文之间需要加空格
const betterChineseDict = (_, index) => {
  return [
    ['刚刚', '片刻后'],
    ['%s 秒前', '%s 秒后'],
    ['1 分钟前', '1 分钟后'],
    ['%s 分钟前', '%s 分钟后'],
    ['1 小时前', '1小 时后'],
    ['%s 小时前', '%s 小时后'],
    ['1 天前', '1 天后'],
    ['%s 天前', '%s 天后'],
    ['1 周前', '1 周后'],
    ['%s 周前', '%s 周后'],
    ['1 月前', '1 月后'],
    ['%s 月前', '%s 月后'],
    ['1 年前', '1 年后'],
    ['%s 年前', '%s 年后']
  ][index]
}

timeago.register('zh', betterChineseDict)

class Thread extends Component<IProps, {}> {
  render () {
    const { title, member, last_modified, replies, id, node } = this.props
    const time = timeInst.format(last_modified * 1000, 'zh')
    return (
      <View className='thread'>
        <View className='info'>
          <View>
            <Image src={member.avatar_large} className='avatar' />
          </View>
          <View className='middle'>
            <View className='author'>
                {member.username}
            </View>
            <View className='replies'>
              <Text className='mr10'>
                {time}
              </Text>
              <Text>
                评论 {replies}
              </Text>
            </View>
          </View>
          <View className='node'>
            <Text className='tag'>
              {node.title}
            </Text>
          </View>
        </View>
        <Text className='title'>
          {title}
        </Text>
      </View>
    )
  }
}

export { Thread }
