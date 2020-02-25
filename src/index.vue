<template>
  <view class="container">
    <view class="header">
      <view class='header-title-wrap'>
        <text class='title'>todos</text>
      </view>
      <view class="filters">
        <text @tap="setVisibility('all')" :class="{ selected: visibility == 'all', 'filters-link': true }">All</text>
        <text @tap="setVisibility('active')" :class="{ selected: visibility == 'active', 'filters-link': true }">Active</text>
        <text @tap="setVisibility('completed')" :class="{ selected: visibility == 'completed', 'filters-link': true }">Completed</text>
      </view>
      <view class='textinput-wrap'>
        <text :class="{ 'textinput-wrap-icon': true, 'icon-all-done': allDone && todos.length }" @tap="allDone = !allDone">❯</text>
        <view class='textinput-wrap-input'>
          <input class="new-todo"
          placeholder="What needs to be done?"
          :value="newTodo"
          @input="changeInput"
          @confirm="addTodo">
        </view>
      </view>
    </view>
    <view class="main" v-show="todos.length">
      <view class="todo-list">
        <view
          v-for="todo in filteredTodos"
          class="li"
          :key="todo.id"
        >
          <view :class="{ completed: todo.completed, editing: todo == editedTodo }">
            <view class="edit" v-if="todo == editedTodo">
              <input class="new-todo" type="text"
                v-model="todo.title"
                v-todo-focus="todo == editedTodo"
                @blur="doneEdit(todo)"
                @confirm="doneEdit(todo)"
              >
            </view>
            <view v-else class='toggle'>
              <label
                :class="{ label: true, checked: todo.completed }"
                @tap="todo.completed = !todo.completed"
              >
              </label>
              <todo-item
                :todo="todo"
                :edit="editTodo"
              />
              <text class='destroy' @tap="removeTodo(todo)"></text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="footer" v-show="todos.length">
      <text class="todo-count">
        <text class="strong">{{ remaining }}</text> {{ remaining | pluralize }} left
      </text>
      <view class="clear-completed" @tap="removeCompleted" v-show="todos.length > remaining" type="">
        Clear completed
      </view>
    </view>
    <view class="info">
      <view class="p">Double-click to edit a todo</view>
      <view class="p">Part of <text class="a">TodoMVC</text></view>
    </view>
  </view>
</template>

<script>
import TodoItem from './todo-item.vue'
import './app.scss'
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = []
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    console.log('save to storage')
  }
}

// visibility filters
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

export default {
  components: {
    'todo-item': TodoItem
  },
  // app initial state
  data() {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    changeInput (e) {
      this.newTodo = e.target.value
    },
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.newTodo = ''
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
    },

    setVisibility: function (v) {
      this.visibility = v
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        console.log('focus()')
        // el.focus()
      }
    }
  }
}
</script>
