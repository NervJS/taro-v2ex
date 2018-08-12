import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Thread } from './thread'
import { Loading } from './loading'
import { IMember } from '../interfaces/member'
import { INode } from '../interfaces/node'
import timeago from 'timeago.js'

import './thread.css'

interface IProps {
  threads: IThread[],
  loading: boolean
}

interface IThread {
  title: string,
  member: IMember,
  node: INode,
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

class ThreadList extends Component<IProps, {}> {
  static defaultProps = {
    threads: [],
    loading: true
  }

  render () {
    const { loading, threads } = this.props
    if (loading) {
      return <Loading />
    }
    const element = threads.map((thread) => {
      return (
        <Thread
          key={thread.id}
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          id={thread.id}
          member={thread.member}
        />
      )
    })
    return (
      <View className='thread-list'>
        {element}
      </View>
    )
  }
}

export { ThreadList }
