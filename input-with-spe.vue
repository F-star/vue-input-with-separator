<template>
  <input 
    :value="value"
    :maxlength="maxlength"
    @input="handleInput"
  >
</template>

<script>
export default {
  data() {
    return {
      value: '',
      maxlength: 0,
      sepIdxs: [],
    }
  },
  props: {
    blocks: {
      type: Array, // [4, 4, 4, 4]
      require: true,
      // validator() {
      //   // TODO: 非负整数
      //   return true
      // },
    },
    sep: {
      type: String,
      default: ' '
    },
    onlyNumber: {
      type: Boolean,
      default: false,
    }
  },
  created() {
    const sepCount = this.blocks.length - 1
    this.maxlength = this.blocks.reduce((prev, curr) => prev + curr, 0) + sepCount
    
    this.sepIdxs = new Array(sepCount)
    for (let i = 0; i < sepCount; i++) {
      this.sepIdxs[i] = (this.sepIdxs[i - 1] || 0) + this.blocks[i] + i
    }
  },
  methods: {
    handleInput(e) {
      /**
       * 难点
       * 1. 光标位置的控制
       */

      // 光标位置
      console.log(e.target.selectionStart)
      // remove space
      const val = e.target.value.replace(/\s/g, '')
      console.log('|' + val + '|')

      const addedSepVal = this.addSep(val)
      this.value = addedSepVal
      e.target.value = addedSepVal

      // add space
      // 提供一个字符串和一个指定位置插入
      // const addSepVal = ''
      
      // 添加的情况
      // if (val.length > this.value.length) {
      //   console.log('append content')
      //   const sepIdxs = this.sepIdxs
      //   if (val.length > sepIdxs[0]) {
      //     console.log('超过')
      //     this.value = val.slice(0, sepIdxs[0]) + this.sep + val.slice(sepIdxs[0])
      //   }
      // }
    },
    addSep(str) {
      this.sepIdxs.forEach(idx => {
        //
      })
      return str
    }
  }
}

</script>

<style>

</style>