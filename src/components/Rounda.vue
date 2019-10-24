<template>
  <div :class="css.round">
    <div :class="[css.circle,{[css.rotate]:isRotate}]"></div>
    <div :class="css.title">{{title}}</div>
    <div :class="css.main">
      <template v-for="(n,i) of main+''">
        <span :class="css.n" :key="i">
          {{n}}
        </span>
      </template>
    </div>
    <div :class="css.sec" v-if="yesterday!=0">
      <span :class="css.y">昨日</span>{{yesterday}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    today: [Number, String],
    yesterday: [Number, String],
    step: [Number],
  },
  data() {
    return {
      main: parseInt(this.today),
      isRotate: false,
    }
  },
  computed: {
    st() {
      let s = Math.ceil(this.today/50)
      return s
    }
  },
  methods: {
    trans(v, ov) {
      let d = v - ov,
        t = null
      if (d > 0) {
        t = setInterval(() => {
          if (this.main < v) {
            this.main += this.st
          } else {
            clearInterval(t)
            this.main = v
          }
        }, 10)
      } else {
        t = setInterval(() => {
          if (this.main > v) {
            this.main -= this.st
          } else {
            clearInterval(t)
            this.main = v
          }
        }, 10)
      }
    }
  },
  watch: {
    today(v,ov) {
      this.main = v
      // this.trans(+v, +ov)
      // this.isRotate = true
      // setTimeout(()=>{
      //   this.isRotate = false
      // },2000)
    }
  }
}
</script>

<style module="css" lang="scss">
.n {
  display: inline-block;
  width: 15px;
  margin: 0 .5px;
}
.y {
  font-size: 14px;
}
.round {
  width: 162px;
  height: 162px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .main,
  .sec {
    color: $color-font-1;
    font-size: 27px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    text-align: center;
  }
  .sec {
    font-size: 16px;
    color: $color-font-2;
    margin-top: 5px;
  }
  .title {
    position: absolute;
    font-size: 16px;
    color: $color-font-3;
    bottom: -12px;
    background-color: #0f1b38;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 10px;
    letter-spacing: 3px;
    text-align: center;
    white-space: nowrap;
  }
}
.circle {
  border-radius: 100%;
  position: absolute;
  border: 6px dotted $color-line;
  width: 100%;
  height: 100%;
  &.rotate {
    animation: r 3s linear 1;
  }
}
@keyframes r {
  from {
    transform: rotate(0deg);
    border-color: $color-flash;
  }
  to {
    transform: rotate(360deg);
    border-color: $color-line;
  }
}
</style>
