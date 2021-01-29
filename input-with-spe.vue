<template>
  <input
    ref="input"
    :value="innerValue"
    :maxlength="maxlength"
    @input="handleInput"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
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
  data() {
    return {
      innerValue: '',
      maxlength: 0,
      sepIdxs: [],
    }
  },
  watch: {
    // 用于初始化
    value: {
      handler(val, oldVal) {
        if (!oldVal && val) {
          this.setInputValue()
        }
      },
      immediate: true
    }
  },
  created() {
    const sepCount = this.blocks.length - 1
    this.maxlength = this.blocks.reduce((prev, curr) => prev + curr, 0) + sepCount

    // 计算分隔符们的索引位置
    this.sepIdxs = new Array(sepCount)
    for (let i = 0; i < sepCount; i++) {
      this.sepIdxs[i] = (this.sepIdxs[i - 1] || -1) + this.blocks[i] + 1
    }
  },
  methods: {
    handleInput(e) {
      const val = e.target.value.replace(/\s/g, '')

      const addedSepVal = this.addSep(val)
      this.innerValue = addedSepVal
      e.target.value = addedSepVal
      this.$emit('input', val)
    },
    setInputValue() {
      this.$refs.input.value = this.addSep(this.value)
    },
    addSep(str) {
      for (let i = 0; i < str.length; i++) {
        const idx = this.sepIdxs[i]
        if (idx < str.length) {
          str = str.slice(0, idx) + this.sep + str.slice(idx)
        }
      }
      return str
    }
  }
}

</script>
