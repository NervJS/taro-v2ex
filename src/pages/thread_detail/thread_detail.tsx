import Taro, { Component } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import { Thread } from '../../components/thread'
import { Loading } from '../../components/loading'
import { IThread } from '../../interfaces/thread'
import api from '../../utils/api'

interface IState {
  loading: boolean
  replies: IThread[],
  content: string
}

interface URIComponent {
  [key: string]: string
}

function decodeObject<T extends URIComponent> (obj: T): T {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key]
      obj[key] = decodeURI(element)
    }
  }
  return obj
}

class ThreadDetail extends Component<{}, IState> {
  state = {
    loading: true,
    replies: [],
    content: ''
  } as IState

  config = {
    navigationBarTitleText: '话题'
  }
  async componentDidMount () {
    const { id } = this.$router.params
    try {
      const res = await Taro.request<IThread>({
        url: api.getTopics({
          id
        })
      })
      this.setState({
        content: res.data.content_rendered
      })
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误'
      })
    }
  }

  render () {
    const thread = decodeObject(this.$router.params)
    const { loading, replies, content } = this.state

    const repliesEl = loading
      ? <Loading />
      : (
        <View>
          <RichText nodes={content} />
        </View>
      )
    return (
      <View className='detail'>
        <Thread
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          id={thread.id}
          member={thread.member}
        />
        {repliesEl}
      </View>
    )
  }
}

export default ThreadDetail
