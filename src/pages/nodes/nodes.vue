<template>
  <view class='node-container'>
    <view v-for="item in allNodes" :key="item.title" class='container'>
      <view class='title'>
        <text style='margin-left: 5px'>{{item.title}}</text>
      </view>
      <view class='nodes'>
        <navigator
          v-for="node in item.nodes"
          :key="node.full_name"
          class='tag'
          :url="node | url"
        >
          <text>{{node.full_name}}</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import allNodes from './all_node'
import api from '../../utils/api'
import './nodes.css'

export default Vue.extend({
  data () {
    return {
      allNodes
    }
  },
  filters: {
    url (node) {
      return `/pages/node_detail/node_detail${api.queryString(node)}`
    }
  }
})
</script>
