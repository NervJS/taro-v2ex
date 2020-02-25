import timeago from 'timeago.js'
import { useEffect, DependencyList, eventCenter } from '@tarojs/taro'

import { IThread } from '../interfaces/thread'

// tslint:disable-next-line
export const Thread_DETAIL_NAVIGATE = 'thread_detail_navigate'

export interface IThreadProps extends IThread {
  tid: string
}

eventCenter.on(Thread_DETAIL_NAVIGATE, (thread: IThreadProps) => {
  GlobalState.thread = thread
})

export function useAsyncEffect (effect: () => Promise<any>, deps?: DependencyList) {
  useEffect(() => {
    effect()
  }, deps)
}

export const GlobalState = {
  thread: {} as IThreadProps
}

export const timeagoInst = timeago()

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

export function prettyHTML (str: string) {
  const lines = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  lines.forEach(line => {
    const regex = new RegExp(`<${line}`, 'gi')

    str = str.replace(regex, `<${line} class="line"`)
  })

  return str.replace(/<img/gi, '<img class="img"')
}

timeago.register('zh', betterChineseDict)
