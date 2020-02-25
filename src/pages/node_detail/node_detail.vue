<template>
  <view class='detail'>
    <thread
      :node="topic.node"
      :title="topic.title"
      :last_modified="topic.last_modified"
      :replies="topic.replies"
      :tid="topic.id"
      :member="topic.member"
      :not_navi="true"
    />
    <loading v-if="loading" />
    <view v-else>
      <view class='main-content'>
        <rich-text :nodes="content | html" />
      </view>
      <view class='replies'>
        <view v-for="(reply, index) in replies" class='reply' :key="reply.id">
          <image :src='reply.member.avatar_large' class='avatar' />
          <view class='main'>
            <view class='author'>
              {{reply.member.username}}
            </view>
            <view class='time'>
              {{reply.last_modified | time}}
            </view>
            <rich-text :nodes="reply.content_rendered | html" class='content' />
            <view class='floor'>
              {{index + 1}} 楼
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api'
import { timeagoInst, GlobalState, IThreadProps, prettyHTML } from '../../utils'
import Thread from '../../components/thread.vue'
import Loading from '../../components/loading.vue'
import './index.css'

export default Vue.extend({
  components: {
    'loading': Loading,
    'thread': Thread
  },
  data () {
    return {
      topic: GlobalState.thread,
      loading: true,
      replies: [],
      content: ''
    }
  },
  async created () {
    try {
      const id = GlobalState.thread.tid
      const [{ data }, { data: [ { content_rendered } ] } ] = await Promise.all([
        Taro.request({
          url: api.getReplies({
            'topic_id': id
          })
        }),
        Taro.request({
          url: api.getTopics({
            id
          })
        })
      ])
      this.loading = false
      this.replies = data
      this.content = content_rendered
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误'
      })
    }
  },
  filters: {
    time (val) {
      return timeagoInst.format(val * 1000, 'zh')
    },
    html (val) {
      return prettyHTML(val)
    }
  }
})
</script>