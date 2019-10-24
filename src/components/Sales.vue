<template>
  <div :class="css.sales">
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts"
import "echarts/lib/chart/line"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"
export default {
  props: {
    model: Object
  },
  data() {
    return {
      ins: null,
      start: 8,
      end: 21,
      interval: 1000* 60 * 2//2分钟
    }
  },
  watch: {
    "model"(m) {
      let hs = this.getHoursList()
      this.renderCharts(hs, m.y,m.y1)
    }
  },
  methods: {
    renderCharts(x,y,y1) {
      let ymax = Math.ceil(Math.max.apply(null,y))
      let y1max = Math.ceil(Math.max.apply(null,y1))
      if(this.ins === null) {
        this.ins = echarts.init(this.$el)
      }
      this.ins.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "rgba(25,45,82,.5)",
            },
          },
          axisLabel: {
            fontSize: 13,
            color: '#404356',
            interval: 5,//刻度间隔
            // rotate: 60,//刻度旋转
          },
          data: x
        },
        grid: {
          left: "5px",
          right: "2px",
          bottom: "0%",
          top: "7%",
          containLabel: true
        },
        yAxis: [{
          // name:'订单量',
          // type:'value',
            yAxisIndex: 0,
          min:0,
          max: ymax,
          interval: Math.ceil(ymax / 7), 
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              color: "rgba(25,45,82,.25)",
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(25,45,82,.5)",
            }
          },
          axisLabel: {
            fontSize: 13,
            color: '#404356'
          },
        },{
          // name:'客单价',
          // type:'value',
            yAxisIndex: 1,
          min:0,
          max: y1max,
          interval: Math.ceil(y1max / 7), 
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              color: "rgba(25,45,82,0)",//隐藏这些线，避免出现双Y轴刻度不一致的问题
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(25,45,82,.5)",
            }
          },
          axisLabel: {
            fontSize: 13,
            color: '#404356'
          },
        }],
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(37, 121, 255,.6)" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(37, 121, 255,.01)" // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        }, //['#378CEE'],
        series: [
          {
            data: y,
            type: "line",
            yAxisIndex: 0,
            areaStyle: {},
            smooth: true,
            symbol: "emptyCircle", //默认
            symbolSize: 4, //设定大小
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#2579ff",
                  width: "2",
                  shadowBlur: "6",
                  shadowColor: "#0e1833",
                  shadowOffsetY: "4"
                }
              }
            }
          }, {
            
            data: y1,
            type: "line",
            yAxisIndex: 1,
            areaStyle: {},
            smooth: true,
            symbol: "emptyCircle", //默认
            symbolSize: 4, //设定大小
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#cf35d7",
                  width: "2",
                  shadowBlur: "6",
                  shadowColor: "#0e1833",
                  shadowOffsetY: "4"
                }
              }
            }
          }
        ]
      })
    },
    getHoursList() {
      let arr = []
      for(let h=this.start;h<=this.end;h++) {
        arr.push(h+':00')
        if(h == this.end) {
          break
        }
        for(let m=10;m<=50;m+=10) {
          arr.push(h+':'+m)
        }
      }
      return arr
    }
  }
}
</script>

<style module="css" lang="scss">
.sales {
  width: 100%;
}
</style>
