<template>
  <view class='index'>
    <thread-list
      :threads="threads"
      :loading="loading"
    />
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api'
import ThreadList from '../../components/thread_list.vue'
export default Vue.extend({
  components: {
    'thread-list': ThreadList
  },
  data () {
    return {
      loading: true,
      threads: []
    }
  },
  async created() {
    try {
      const res = await Taro.request({
        url: api.getHotNodes()
      })
      this.loading = false
      this.threads = res.data
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误'
      })
    }
  }
})
</script>