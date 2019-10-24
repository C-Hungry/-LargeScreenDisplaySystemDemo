<template>
  <div :class="css.home">
    <header :class="css.h">
      <img src="static/h.png" >
    </header>
    <!-- 图表 -->
    <div :class="css.charts">
      <div :class="css['space-between']">
        <tit has-dot>订单量</tit>
        <tit has-dot dot-color="red">客单价</tit>
      </div>
      <Sales :class="css.sa" :model="RptOrders"></Sales>
    </div>
    <!-- 其他数据 -->
    <div :class="css.data">
      <Today :class="css.today" 
        :Order="StatisTodayAndYesterday.Order"
        :GMV="StatisTodayAndYesterday.GMV"
        :OnlineUser="StatisTodayAndYesterday.OnlineUser">
        <round title="会员数" :today="StatisVIPUsers" :yesterday="0"></round>
      </Today>
      <history :class="css.history" :model="RecentOrders"></history>
    </div>
  </div>
</template>

<script>
import Round from "@/components/Round"
import Today from "@/components/Today"
import History from "@/components/History"
import Sales from "@/components/Sales"
export default {
  components: {
    Today,
    History,
    Sales,
    Round
  },
  data() {
    return {
      RptOrders: {
        //订单量
        x: [],
        y: [],
        y1: []
      },
      RecentOrders: [], //成交历史
      StatisTodayAndYesterday: {//今日数据
        GMV: {
          Today: 0,
          Yesterday: 0
        },
        OnlineUser: {
          Today: 0,
          Yesterday: 0
        },
        Order: {
          Today: 0,
          Yesterday: 0
        }
      },
      StatisVIPUsers: 0,
      now: new Date() - 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {

      this.$fetch(window.__CONFIG__.url,data => {
        console.log(data)
        if(data.Interface === 'RptOrders') {
          this.RptOrders = data.Data
        }
        if(data.Interface === 'RecentOrders') {
          this.RecentOrders = data.Data
        }
        if(data.Interface === "StatisVIPUsers") {
          this.StatisVIPUsers = data.Data.Count
        }
        if(data.Interface === 'StatisTodayAndYesterday') {
          this.StatisTodayAndYesterday = data.Data
        }
      })
    }
  }
}
</script>

<style module="css" lang="scss">
* {
  box-sizing: border-box;
}
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .h {
    vertical-align: middle;
    img {
      width: 100%;
    }
  }
  .charts {
    padding: 0 20px 20px;
    .sa {
      height: 40vh;
    }
  }
  .data {
    margin: 0 20px;
    display: flex;
    flex: none;
    height: 250px;
    .do {
      display: flex;
      flex-direction: column;
      margin: 0 18px;
      .todo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 110px;
        height: 120px;
        &:last-child {
          margin-top: 18px;
        }
        .t {
          color: $color-font-2;
        }
        .n,
        .n1 {
          font-size: 28px;
          margin-top: 15px;
        }
        .n1 {
          color: $color-success;
        }
        .n {
          color: $color-warning;
        }
      }
    }
    .history {
      flex: 0.65;
      margin-left:20px;
    }
    .today {
      flex: 1;
      overflow: hidden;
    }
  }
}
.space-between {
  display: flex;
  justify-content: space-between;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  margin-right:5px;
  background-color: #cf35d7;
  display: inline-block;
}
</style>
