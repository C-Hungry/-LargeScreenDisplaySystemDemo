<template>
  <box>
    <div :class="css.title">
      <tit has-dot @click="onAdd">即时成交</tit>
    </div>
    <div :class="css.list">

      <transition-group name="flip" tag="ul" class="css.group">
        <li v-for="(item,n) in list.slice(0,10)"
          :key="item.Id"
          :class="{[css.bg]:item.__new}">
          <span :class="css.p">
            <div :class="css.nowrap">{{item.Province}}</div>
          </span>
          <span :class="css.c">
            <div :class="css.nowrap">{{item.City}}</div>
          </span>
          <span :class="css.pro">
            <div :class="css.nowrap">{{item.What}}</div>
          </span>
          <span :class="css.t">
            <div :class="css.nowrap">{{item.When}}</div>
          </span>
        </li>
      </transition-group>

    </div>
  </box>
</template>

<script>
export default {
  props: {
    model: Array
  },
  data() {
    return {
      list: this.model || []
    }
  },
  watch: {
    model(m) {
      this.update(m)
    }
  },
  methods: {
    onAdd() {
      // this.list.unshift(...[{
      //   Id: Math.random(),
      //   Province: '新增省',
      //   City: '新增市区',
      //   What: '撒旦个撒旦个'+Math.round(Math.random()*100),
      //   __new: true
      // }])
    },
    update(m) {
      // this.list.forEach(el => {
      //   el.__new = false
      // })
      m.forEach(item => {
        let b = false
        this.list.forEach(el => {
          if (el.Id == item.Id) {
            b = true
          }
        })
        if (!b) {
          item.__new = true
          this.list.unshift(item)
        }
      })
      if (this.list.length > 200) {
        this.list.pop()
      }
    }
  }
}
</script>

<style module="css" lang="scss">
:global(.flip) {
  &-move {
    transition: .2s;
  }
  &-enter {
    // opacity: 0;
    // transform: translateY(-40px);
  }
}
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  margin: 0 25px;
  padding: 15px 0 0px;
}
.list {
  padding: 0px 0 15px 0;
  ul {
    padding: 0;
    height: 180px;
    overflow: hidden;
    li {
      list-style: none;
      width: 100%;
      height: 36px;
      line-height: 36px;
      color: $color-font-2;
      display: flex;
      transition: all 1s ease;
      padding: 0 25px;
      font-size: 15px;
      .p {
        width: 60px;
        flex: none;
      }
      .c {
        width: 80px;
        flex: none;
      }
      .pro {
        flex: 1;
        width: 200px;
      }
      .t {
        width: 80px;
        text-align: right;
      }
    }
  }
}
.bg {
  // background-color: $color-flash;
  animation: flash 4s linear 1s;
}
@keyframes flash {
  0% {
    background-color: $color-flash;
  }
  4% {
    background-color: transparent;
    transform: scale(1.02, 1.08);
  }
  8% {
    background-color: $color-flash;
  }
  12% {
    background-color: transparent;
    transform: scale(1.02, 1.08);
  }
  16% {
    background-color: $color-flash;
  }
  20% {
    background-color: transparent;
    transform: scale(1.02, 1.08);
  }
  24% {
    background-color: $color-flash;
    transform: scale(1, 1);
  }
  80% {
    background-color: $color-flash;
  }
  90% {
    background-color: transparent;
  }
}
.group {
  // margin-left: 8px;
  // height: 75px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // margin-top: -55px;
  li {
    // height: 26px;
    // line-height: 26px;
    // background-color: white;
  }
}
</style>
