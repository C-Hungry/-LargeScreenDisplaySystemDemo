<template>
  <box :class="css.todayComp">
    <div :class="css.t">
      <tit has-dot>今日数据</tit>
    </div>
    <div :class="css.list">
      <round title="订单量" :today="Order.Today" :yesterday="Order.Yesterday"></round>
      <round title="交易额" :today="GMV.Today" :yesterday="GMV.Yesterday"></round>
      <round title="活跃端口" :today="OnlineUser.Today" :yesterday="OnlineUser.Yesterday"></round>
      <slot></slot>
    </div>
  </box>
</template>

<script>
import Round from "@/components/Rounda"
export default {
  components: {
    Round
  },
  props: {
    Order: Object,
    GMV: Object,
    OnlineUser: Object
  },
}
</script>

<style module="css" lang="scss">
.t {
  margin: {
    left: 15px;
    top: -5px;
  }
}
.m {
  margin-left: 10px;
}
.today-comp {
  padding: 20px 10px;
  .list {
    display: flex;
    padding-top: 20px;
    justify-content: space-around;
  }
}
</style>
