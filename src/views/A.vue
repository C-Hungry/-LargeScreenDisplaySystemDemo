<template>
  <div :class="css.home">
    <header :class="css.h">
      <img src="static/h.png">
    </header>
    <!-- 图表 -->
    <div :class="css.charts">
      <div :class="css['space-between']">
        <tit has-dot>
          <span>订单量</span>
          <span style="margin-left:20px;">最近</span>
          <input type="number"
            v-model="preDays"
            :class="css.days">天
          <button @click="onOk">确定</button>
        </tit>
        <tit has-dot
          dot-color="red">客单价</tit>
      </div>
      <Sales :class="css.sa"
        ref="sales"
        :model="RptOrders"></Sales>
    </div>
    <!-- 其他数据 -->
    <div :class="css.data">
      <Today :class="css.today"
        :Order="StatisTodayAndYesterday.Order"
        :GMV="StatisTodayAndYesterday.GMV"
        :OnlineUser="StatisTodayAndYesterday.OnlineUser">
        <round title="会员数"
          :today="StatisVIPUsers"
          :yesterday="0"></round>
      </Today>
      <history :class="css.history"
        :model="RecentOrders"></history>
    </div>
  </div>
</template>

<script>
const ddd = [
  [
    { desc: "订单量对比", data: { Today: "1048", Yesterday: "999" } },
    { desc: "GMV对比", data: { Today: "2966312", Yesterday: "1996094" } },
    { desc: "会员数", data: { Count: "97385" } },
    { desc: "活跃端口对比", data: { Today: "42", Yesterday: "30" } },
    { desc: "曲线图订单量", data: { When: "9", Count: "1048" } },
    { desc: "曲线图订单均价", data: { When: "9", Count: "1537" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "228097",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "华为nova3蓝樱紫6+128",
          When: "23:53:51"
        },
        {
          Id: "204480",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPOR17钢化屏保",
          When: "21:53:59",
          __new: true
        },
        {
          Id: "204479",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "方锅",
          When: "21:53:59",
          __new: true
        },
        {
          Id: "117406",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "20:07:15",
          __new: true
        },
        {
          Id: "117405",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "20:06:12",
          __new: true
        },
        {
          Id: "117404",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "20:04:37",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1146", Yesterday: "1048" } },
    { desc: "GMV对比", data: { Today: "4813955", Yesterday: "2966312" } },
    { desc: "会员数", data: { Count: "97862" } },
    { desc: "活跃端口对比", data: { Today: "20", Yesterday: "42" } },
    { desc: "曲线图订单量", data: { When: "10", Count: "1146" } },
    { desc: "曲线图订单均价", data: { When: "10", Count: "1637" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "436391",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "桃心耳机",
          When: "22:08:21"
        },
        {
          Id: "436390",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "华为荣耀畅玩 8X 全网通 魅海蓝 6+128",
          When: "22:08:21",
          __new: true
        },
        {
          Id: "431394",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "金士顿16G优盘",
          When: "22:27:01",
          __new: true
        },
        {
          Id: "92468",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:13:40",
          __new: true
        },
        {
          Id: "92467",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BND-AL10(7X全网)",
          When: "18:13:40",
          __new: true
        },
        {
          Id: "45739",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "OPPO R15 6+128",
          When: "18:17:26",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1248", Yesterday: "1146" } },
    { desc: "GMV对比", data: { Today: "7143311", Yesterday: "4813955" } },
    { desc: "会员数", data: { Count: "98343" } },
    { desc: "活跃端口对比", data: { Today: "24", Yesterday: "20" } },
    { desc: "曲线图订单量", data: { When: "11", Count: "1248" } },
    { desc: "曲线图订单均价", data: { When: "11", Count: "2275" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "391303",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "杰力科苹果线",
          When: "22:17:39"
        },
        {
          Id: "391302",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "半包钢化膜",
          When: "22:16:54",
          __new: true
        },
        {
          Id: "391301",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "半包钢化膜",
          When: "22:15:56",
          __new: true
        },
        {
          Id: "93141",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:22:11",
          __new: true
        },
        {
          Id: "93140",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:22:11",
          __new: true
        },
        {
          Id: "93138",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:17:17",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1166", Yesterday: "1248" } },
    { desc: "GMV对比", data: { Today: "4805243", Yesterday: "7143311" } },
    { desc: "会员数", data: { Count: "98829" } },
    { desc: "活跃端口对比", data: { Today: "106", Yesterday: "24" } },
    { desc: "曲线图订单量", data: { When: "12", Count: "1166" } },
    { desc: "曲线图订单均价", data: { When: "12", Count: "2260" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "213573",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为NOVA3钢化屏保",
          When: "23:15:25"
        },
        {
          Id: "213572",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "荣耀PLAY 6+128G 全网",
          When: "23:15:25",
          __new: true
        },
        {
          Id: "213570",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "小米 NOTE3 钢化屏保",
          When: "23:06:42",
          __new: true
        },
        {
          Id: "93619",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "LND-AL40(7C全网)",
          When: "18:00:46",
          __new: true
        },
        {
          Id: "93617",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "17:59:57",
          __new: true
        },
        {
          Id: "44632",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "VIVOZ1i 4+128G",
          When: "18:38:48",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1636", Yesterday: "1166" } },
    { desc: "GMV对比", data: { Today: "3481008", Yesterday: "4805243" } },
    { desc: "会员数", data: { Count: "120891" } },
    { desc: "活跃端口对比", data: { Today: "352", Yesterday: "106" } },
    { desc: "曲线图订单量", data: { When: "13", Count: "1636" } },
    { desc: "曲线图订单均价", data: { When: "13", Count: "2661" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "391330",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "浮雕手机壳",
          When: "22:19:50"
        },
        {
          Id: "391329",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "半包钢化膜",
          When: "22:19:33",
          __new: true
        },
        {
          Id: "391328",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO X23 8+128 幻夜蓝",
          When: "22:19:15",
          __new: true
        },
        {
          Id: "55193",
          Province: "河南省",
          City: "平顶山市",
          District: "舞钢市",
          What: "OPPO A5 4+64",
          When: "19:24:04",
          __new: true
        },
        {
          Id: "55192",
          Province: "河南省",
          City: "平顶山市",
          District: "舞钢市",
          What: " R17 8+128",
          When: "19:24:04",
          __new: true
        },
        {
          Id: "55191",
          Province: "河南省",
          City: "平顶山市",
          District: "舞钢市",
          What: "R17 8+128",
          When: "19:24:04",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1418", Yesterday: "1636" } },
    { desc: "GMV对比", data: { Today: "6542342", Yesterday: "3481008" } },
    { desc: "会员数", data: { Count: "121522" } },
    { desc: "活跃端口对比", data: { Today: "184", Yesterday: "352" } },
    { desc: "曲线图订单量", data: { When: "14", Count: "1418" } },
    { desc: "曲线图订单均价", data: { When: "14", Count: "2163" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "459593",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "手机壳 琉璃系列手机玻璃壳",
          When: "22:03:29"
        },
        {
          Id: "459592",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "苹果XS Max 64G 黑",
          When: "22:01:17",
          __new: true
        },
        {
          Id: "390293",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "苹果6splus 128g 金色",
          When: "22:06:57",
          __new: true
        },
        {
          Id: "94347",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "活动套包2",
          When: "17:53:56",
          __new: true
        },
        {
          Id: "94346",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "LND-AL40(7C全网)",
          When: "17:53:56",
          __new: true
        },
        {
          Id: "94345",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "17:53:56",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1364", Yesterday: "1418" } },
    { desc: "GMV对比", data: { Today: "4776790", Yesterday: "6542342" } },
    { desc: "会员数", data: { Count: "121999" } },
    { desc: "活跃端口对比", data: { Today: "184", Yesterday: "184" } },
    { desc: "曲线图订单量", data: { When: "15", Count: "1364" } },
    { desc: "曲线图订单均价", data: { When: "15", Count: "2118" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "390321",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵V8充电线",
          When: "21:48:25"
        },
        {
          Id: "390320",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "透明手机壳",
          When: "21:48:25",
          __new: true
        },
        {
          Id: "390319",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "全包钢化膜",
          When: "21:48:25",
          __new: true
        },
        {
          Id: "54225",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "赛博 C7速充红色",
          When: "19:24:00",
          __new: true
        },
        {
          Id: "54181",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "A类手机壳（000003）",
          When: "19:22:50",
          __new: true
        },
        {
          Id: "54180",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "B类屏保（000010）",
          When: "19:22:50",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1170", Yesterday: "1364" } },
    { desc: "GMV对比", data: { Today: "3556247", Yesterday: "4776790" } },
    { desc: "会员数", data: { Count: "129485" } },
    { desc: "活跃端口对比", data: { Today: "152", Yesterday: "184" } },
    { desc: "曲线图订单量", data: { When: "16", Count: "1170" } },
    { desc: "曲线图订单均价", data: { When: "16", Count: "1825" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "391368",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵V8线",
          When: "22:48:32"
        },
        {
          Id: "391367",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO Y85 4+64 香槟金",
          When: "22:46:46",
          __new: true
        },
        {
          Id: "250757",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "华为nova2s 6+64 灰色",
          When: "22:37:32",
          __new: true
        },
        {
          Id: "44820",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "荣耀7C 3+32 黑",
          When: "19:01:25",
          __new: true
        },
        {
          Id: "44791",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为平板M5W09 8.4 32金",
          When: "18:43:34",
          __new: true
        },
        {
          Id: "44790",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为平板M5AL插卡 8.4 64G",
          When: "18:43:34",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1180", Yesterday: "1170" } },
    { desc: "GMV对比", data: { Today: "4685749", Yesterday: "3556247" } },
    { desc: "会员数", data: { Count: "129930" } },
    { desc: "活跃端口对比", data: { Today: "154", Yesterday: "152" } },
    { desc: "曲线图订单量", data: { When: "17", Count: "1180" } },
    { desc: "曲线图订单均价", data: { When: "17", Count: "2061" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "213756",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPOR17钢化屏保",
          When: "22:24:05"
        },
        {
          Id: "213755",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPOR17手机壳",
          When: "22:24:05",
          __new: true
        },
        {
          Id: "213754",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "卓品W02金属防滑10W无线座充",
          When: "22:24:05",
          __new: true
        },
        {
          Id: "52246",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为GSM手机Mate10(ALP-AL00)128G香槟金",
          When: "18:18:49",
          __new: true
        },
        {
          Id: "52244",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星GSM手机A9Star G8850 64G黑",
          When: "18:17:59",
          __new: true
        },
        {
          Id: "44641",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为P20-全网6+64",
          When: "19:04:02",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1157", Yesterday: "1180" } },
    { desc: "GMV对比", data: { Today: "3320678", Yesterday: "4685749" } },
    { desc: "会员数", data: { Count: "130404" } },
    { desc: "活跃端口对比", data: { Today: "336", Yesterday: "154" } },
    { desc: "曲线图订单量", data: { When: "18", Count: "1157" } },
    { desc: "曲线图订单均价", data: { When: "18", Count: "1799" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "391393",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "华为原线",
          When: "21:43:07"
        },
        {
          Id: "391392",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵4.8A车充",
          When: "21:42:30",
          __new: true
        },
        {
          Id: "391391",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "华为原线",
          When: "21:41:56",
          __new: true
        },
        {
          Id: "96132",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "活动套包6",
          When: "18:02:55",
          __new: true
        },
        {
          Id: "96131",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:02:55",
          __new: true
        },
        {
          Id: "96130",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:02:55",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1339", Yesterday: "1157" } },
    { desc: "GMV对比", data: { Today: "7633255", Yesterday: "3320678" } },
    { desc: "会员数", data: { Count: "130821" } },
    { desc: "活跃端口对比", data: { Today: "272", Yesterday: "336" } },
    { desc: "曲线图订单量", data: { When: "19", Count: "1339" } },
    { desc: "曲线图订单均价", data: { When: "19", Count: "2036" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "228208",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "vivoy85红4+64",
          When: "22:42:27"
        },
        {
          Id: "217191",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPOFindX 钢化屏保(丝印)",
          When: "21:57:43",
          __new: true
        },
        {
          Id: "217187",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "大笨蛋 电源10000",
          When: "21:55:54",
          __new: true
        },
        {
          Id: "96713",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:24:20",
          __new: true
        },
        {
          Id: "96712",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:24:20",
          __new: true
        },
        {
          Id: "96711",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:24:20",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1396", Yesterday: "1339" } },
    { desc: "GMV对比", data: { Today: "3606746", Yesterday: "7633255" } },
    { desc: "会员数", data: { Count: "131405" } },
    { desc: "活跃端口对比", data: { Today: "306", Yesterday: "272" } },
    { desc: "曲线图订单量", data: { When: "20", Count: "1396" } },
    { desc: "曲线图订单均价", data: { When: "20", Count: "2035" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "391424",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO Y97 极光蓝 4+128",
          When: "22:35:49"
        },
        {
          Id: "391423",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "杰力科X5耳机",
          When: "22:35:17",
          __new: true
        },
        {
          Id: "391422",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "全包钢化膜",
          When: "22:34:56",
          __new: true
        },
        {
          Id: "54563",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "简约条纹壳",
          When: "18:29:18",
          __new: true
        },
        {
          Id: "54562",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "品胜系列 苹果线",
          When: "18:29:18",
          __new: true
        },
        {
          Id: "48820",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "OPPO FindXPAHM00(8+256G)冰珀蓝",
          When: "18:23:36",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1439", Yesterday: "1396" } },
    { desc: "GMV对比", data: { Today: "3101473", Yesterday: "3606746" } },
    { desc: "会员数", data: { Count: "132047" } },
    { desc: "活跃端口对比", data: { Today: "334", Yesterday: "306" } },
    { desc: "曲线图订单量", data: { When: "21", Count: "1439" } },
    { desc: "曲线图订单均价", data: { When: "21", Count: "2164" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "240806",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "华为Type-C数据线（AP55)",
          When: "21:44:16"
        },
        {
          Id: "240805",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "华为nova3（6+128G）全网蓝楹紫",
          When: "21:34:36",
          __new: true
        },
        {
          Id: "237890",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "三星N9600-128G全网丹青黑",
          When: "21:20:04",
          __new: true
        },
        {
          Id: "44803",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为MATE10PRO 6+128 灰",
          When: "18:48:08",
          __new: true
        },
        {
          Id: "44802",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为NOVA3 紫 6+128",
          When: "18:48:08",
          __new: true
        },
        {
          Id: "44801",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为NOVA3 黑 6+128",
          When: "18:48:08",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1183", Yesterday: "1439" } },
    { desc: "GMV对比", data: { Today: "960004", Yesterday: "3101473" } },
    { desc: "会员数", data: { Count: "132489" } },
    { desc: "活跃端口对比", data: { Today: "370", Yesterday: "334" } },
    { desc: "曲线图订单量", data: { When: "22", Count: "1183" } },
    { desc: "曲线图订单均价", data: { When: "22", Count: "2097" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "417024",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "赛博 畅享C2电皇贰号黑色",
          When: "21:21:29"
        },
        {
          Id: "218203",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "苹果IPHONE7-5.5 钢化屏保",
          When: "21:43:56",
          __new: true
        },
        {
          Id: "218202",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "苹果X-5.8 钢化屏保",
          When: "21:43:56",
          __new: true
        },
        {
          Id: "97856",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "套包9",
          When: "19:04:06",
          __new: true
        },
        {
          Id: "97855",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "19:04:06",
          __new: true
        },
        {
          Id: "97854",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "19:04:06",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1168", Yesterday: "1183" } },
    { desc: "GMV对比", data: { Today: "2527894", Yesterday: "960004" } },
    { desc: "会员数", data: { Count: "132922" } },
    { desc: "活跃端口对比", data: { Today: "986", Yesterday: "370" } },
    { desc: "曲线图订单量", data: { When: "23", Count: "1168" } },
    { desc: "曲线图订单均价", data: { When: "23", Count: "2012" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "391471",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "希品格调充电宝",
          When: "22:19:32"
        },
        {
          Id: "391470",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵H501耳机",
          When: "22:19:32",
          __new: true
        },
        {
          Id: "391469",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "OPPO A7x 4+128 星空紫",
          When: "22:18:36",
          __new: true
        },
        {
          Id: "117788",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "22:29:30",
          __new: true
        },
        {
          Id: "117787",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "22:29:30",
          __new: true
        },
        {
          Id: "117786",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "22:29:30",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1378", Yesterday: "1168" } },
    { desc: "GMV对比", data: { Today: "8914403", Yesterday: "2527894" } },
    { desc: "会员数", data: { Count: "133590" } },
    { desc: "活跃端口对比", data: { Today: "810", Yesterday: "986" } },
    { desc: "曲线图订单量", data: { When: "24", Count: "1378" } },
    { desc: "曲线图订单均价", data: { When: "24", Count: "2312" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "242577",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "23:07:55"
        },
        {
          Id: "242576",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "荣耀畅玩7A 2+32金色",
          When: "23:06:57",
          __new: true
        },
        {
          Id: "242575",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "23:04:42",
          __new: true
        },
        {
          Id: "117833",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网4+128G)",
          When: "22:37:59",
          __new: true
        },
        {
          Id: "117832",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网4+128G)",
          When: "22:37:59",
          __new: true
        },
        {
          Id: "117831",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:37:15",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1359", Yesterday: "1378" } },
    { desc: "GMV对比", data: { Today: "4355708", Yesterday: "8914403" } },
    { desc: "会员数", data: { Count: "134233" } },
    { desc: "活跃端口对比", data: { Today: "864", Yesterday: "810" } },
    { desc: "曲线图订单量", data: { When: "25", Count: "1359" } },
    { desc: "曲线图订单均价", data: { When: "25", Count: "2132" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "390565",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "浮雕手机壳",
          When: "22:30:01"
        },
        {
          Id: "390564",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO X23 8+128 幻影红",
          When: "22:30:01",
          __new: true
        },
        {
          Id: "243329",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "明派MZ8移动电源数据线苹果",
          When: "22:45:33",
          __new: true
        },
        {
          Id: "98984",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:10:26",
          __new: true
        },
        {
          Id: "98983",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:10:26",
          __new: true
        },
        {
          Id: "98982",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "LND-AL40(7C全网)",
          When: "18:10:26",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1336", Yesterday: "1359" } },
    { desc: "GMV对比", data: { Today: "7035171", Yesterday: "4355708" } },
    { desc: "会员数", data: { Count: "134848" } },
    { desc: "活跃端口对比", data: { Today: "818", Yesterday: "864" } },
    { desc: "曲线图订单量", data: { When: "26", Count: "1336" } },
    { desc: "曲线图订单均价", data: { When: "26", Count: "2144" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "459866",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "三星 s9+ 6+64 黑",
          When: "23:08:17"
        },
        {
          Id: "244094",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPOA5 4+64",
          When: "22:51:50",
          __new: true
        },
        {
          Id: "244093",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "遥控车",
          When: "22:51:50",
          __new: true
        },
        {
          Id: "99215",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:35:16",
          __new: true
        },
        {
          Id: "46031",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "360儿童手表6S 粉色",
          When: "20:35:39",
          __new: true
        },
        {
          Id: "46030",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "360儿童手表6S 蓝色",
          When: "20:35:39",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1560", Yesterday: "1336" } },
    { desc: "GMV对比", data: { Today: "2894090", Yesterday: "7035171" } },
    { desc: "会员数", data: { Count: "135522" } },
    { desc: "活跃端口对比", data: { Today: "908", Yesterday: "818" } },
    { desc: "曲线图订单量", data: { When: "27", Count: "1560" } },
    { desc: "曲线图订单均价", data: { When: "27", Count: "2398" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "388769",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO X21i 6+128 黑色",
          When: "23:41:41"
        },
        {
          Id: "245223",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为P20PRO钢化屏保(丝印)",
          When: "21:49:57",
          __new: true
        },
        {
          Id: "245222",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "步步高NEX屏幕指纹版（8+128G)全网通星钻黑",
          When: "21:49:50",
          __new: true
        },
        {
          Id: "99403",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:11:55",
          __new: true
        },
        {
          Id: "99402",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:11:55",
          __new: true
        },
        {
          Id: "52812",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "VIVO Y85 4+64G 红色",
          When: "18:59:18",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1656", Yesterday: "1560" } },
    { desc: "GMV对比", data: { Today: "3943748", Yesterday: "2894090" } },
    { desc: "会员数", data: { Count: "136227" } },
    { desc: "活跃端口对比", data: { Today: "964", Yesterday: "908" } },
    { desc: "曲线图订单量", data: { When: "28", Count: "1656" } },
    { desc: "曲线图订单均价", data: { When: "28", Count: "2690" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "246186",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "茶具三件套",
          When: "22:58:25"
        },
        {
          Id: "246185",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "足浴盆",
          When: "22:58:25",
          __new: true
        },
        {
          Id: "246184",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "九阳方煲",
          When: "22:58:25",
          __new: true
        },
        {
          Id: "99830",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:08:09",
          __new: true
        },
        {
          Id: "99829",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "DUA-AL00(畅玩7全网2+16G)",
          When: "18:08:09",
          __new: true
        },
        {
          Id: "52515",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星GSM手机A9青春 A6050 64G黑",
          When: "18:30:29",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1375", Yesterday: "1656" } },
    { desc: "GMV对比", data: { Today: "6257819", Yesterday: "3943748" } },
    { desc: "会员数", data: { Count: "136750" } },
    { desc: "活跃端口对比", data: { Today: "822", Yesterday: "964" } },
    { desc: "曲线图订单量", data: { When: "29", Count: "1375" } },
    { desc: "曲线图订单均价", data: { When: "29", Count: "2064" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "390633",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "正能量礼品充电宝",
          When: "21:40:21"
        },
        {
          Id: "390632",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "OPPOA5 4+64 幻境蓝",
          When: "21:40:21",
          __new: true
        },
        {
          Id: "246990",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "OPPOA5 4+64G 蓝",
          When: "21:47:11",
          __new: true
        },
        {
          Id: "46009",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "iPhone XR 128GB 黑色",
          When: "20:35:08",
          __new: true
        },
        {
          Id: "46008",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "iPhone 6S Plus 128G 玫瑰金",
          When: "20:35:08",
          __new: true
        },
        {
          Id: "46007",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "iPhone XR 64GB 黑色",
          When: "20:35:08",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1632", Yesterday: "1375" } },
    { desc: "GMV对比", data: { Today: "6710785", Yesterday: "6257819" } },
    { desc: "会员数", data: { Count: "137384" } },
    { desc: "活跃端口对比", data: { Today: "740", Yesterday: "822" } },
    { desc: "曲线图订单量", data: { When: "30", Count: "1632" } },
    { desc: "曲线图订单均价", data: { When: "30", Count: "2518" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "390647",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "纳米V8充电线",
          When: "22:13:12"
        },
        {
          Id: "390646",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵防爆充电头",
          When: "22:13:12",
          __new: true
        },
        {
          Id: "390645",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "科诺 K810B 蓝色",
          When: "22:02:40",
          __new: true
        },
        {
          Id: "46034",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "三星G9550全网64G",
          When: "20:35:51",
          __new: true
        },
        {
          Id: "46033",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "三星N9600(NOTE9)512G",
          When: "20:35:51",
          __new: true
        },
        {
          Id: "46032",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "三星G9650全网256G",
          When: "20:35:51",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1526", Yesterday: "1632" } },
    { desc: "GMV对比", data: { Today: "10048560", Yesterday: "6710785" } },
    { desc: "会员数", data: { Count: "138040" } },
    { desc: "活跃端口对比", data: { Today: "896", Yesterday: "740" } },
    { desc: "曲线图订单量", data: { When: "31", Count: "1526" } },
    { desc: "曲线图订单均价", data: { When: "31", Count: "2351" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "390660",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "半包钢化膜",
          When: "22:03:40"
        },
        {
          Id: "390659",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "包装钢化膜",
          When: "22:03:40",
          __new: true
        },
        {
          Id: "390658",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "极光手机壳",
          When: "22:03:13",
          __new: true
        },
        {
          Id: "54004",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "VIVO Y93全网通红色4+64G",
          When: "19:23:06",
          __new: true
        },
        {
          Id: "54003",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "VIVO Z3i全网通蓝色6+128G",
          When: "19:23:06",
          __new: true
        },
        {
          Id: "54002",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "VIVO Y81S全网通黑金3+64G",
          When: "19:23:06",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1306", Yesterday: "1526" } },
    { desc: "GMV对比", data: { Today: "9520273", Yesterday: "10048560" } },
    { desc: "会员数", data: { Count: "138636" } },
    { desc: "活跃端口对比", data: { Today: "1262", Yesterday: "896" } },
    { desc: "曲线图订单量", data: { When: "1", Count: "1306" } },
    { desc: "曲线图订单均价", data: { When: "1", Count: "2027" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "261646",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为畅享9PLUS 全网 4+128G",
          When: "22:17:35"
        },
        {
          Id: "261645",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为畅享9PLUS 全网 4+128G",
          When: "22:17:35",
          __new: true
        },
        {
          Id: "261644",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "歌奈蓝牙耳机B13",
          When: "22:17:35",
          __new: true
        },
        {
          Id: "101451",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:00:52",
          __new: true
        },
        {
          Id: "101450",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "DUA-AL00(畅玩7全网2+16G)",
          When: "18:00:52",
          __new: true
        },
        {
          Id: "46344",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "A5 4+64G",
          When: "18:38:33",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1400", Yesterday: "1306" } },
    { desc: "GMV对比", data: { Today: "3338477", Yesterday: "9520273" } },
    { desc: "会员数", data: { Count: "141783" } },
    { desc: "活跃端口对比", data: { Today: "1272", Yesterday: "1262" } },
    { desc: "曲线图订单量", data: { When: "2", Count: "1400" } },
    { desc: "曲线图订单均价", data: { When: "2", Count: "2108" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "412701",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "B类数据线（710000）",
          When: "22:14:41"
        },
        {
          Id: "309415",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "vivoy83黑4+64",
          When: "22:18:28",
          __new: true
        },
        {
          Id: "309414",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "oppo A7x 4+128蓝",
          When: "22:12:07",
          __new: true
        },
        {
          Id: "54034",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "小天才 Z1y 红色",
          When: "19:37:55",
          __new: true
        },
        {
          Id: "54033",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "读书郎 W7粉色",
          When: "19:37:55",
          __new: true
        },
        {
          Id: "54032",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "读书郎 W7蓝色",
          When: "19:37:55",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1832", Yesterday: "1400" } },
    { desc: "GMV对比", data: { Today: "4610928", Yesterday: "3338477" } },
    { desc: "会员数", data: { Count: "142839" } },
    { desc: "活跃端口对比", data: { Today: "1388", Yesterday: "1272" } },
    { desc: "曲线图订单量", data: { When: "3", Count: "1832" } },
    { desc: "曲线图订单均价", data: { When: "3", Count: "3144" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "390714",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "半包钢化膜",
          When: "23:26:21"
        },
        {
          Id: "390713",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵V8充电线",
          When: "23:25:55",
          __new: true
        },
        {
          Id: "390712",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "希品H515耳机",
          When: "23:25:27",
          __new: true
        },
        {
          Id: "54055",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "小天才 Z1y 红色",
          When: "20:17:53",
          __new: true
        },
        {
          Id: "54054",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "读书郎 W7粉色",
          When: "20:17:53",
          __new: true
        },
        {
          Id: "54053",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "读书郎 W7蓝色",
          When: "20:17:53",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1686", Yesterday: "1832" } },
    { desc: "GMV对比", data: { Today: "3298873", Yesterday: "4610928" } },
    { desc: "会员数", data: { Count: "143642" } },
    { desc: "活跃端口对比", data: { Today: "1210", Yesterday: "1388" } },
    { desc: "曲线图订单量", data: { When: "4", Count: "1686" } },
    { desc: "曲线图订单均价", data: { When: "4", Count: "2644" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "391637",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "礼品春雨10400充电宝",
          When: "22:21:23"
        },
        {
          Id: "391636",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO Y85 极光色 4+64",
          When: "22:21:23",
          __new: true
        },
        {
          Id: "391635",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "6D钢化膜",
          When: "22:19:24",
          __new: true
        },
        {
          Id: "102420",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+256尊享版)",
          When: "19:15:02",
          __new: true
        },
        {
          Id: "102419",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "19:14:04",
          __new: true
        },
        {
          Id: "102417",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:25:08",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1143", Yesterday: "1686" } },
    { desc: "GMV对比", data: { Today: "10839488", Yesterday: "3298873" } },
    { desc: "会员数", data: { Count: "144177" } },
    { desc: "活跃端口对比", data: { Today: "1202", Yesterday: "1210" } },
    { desc: "曲线图订单量", data: { When: "5", Count: "1143" } },
    { desc: "曲线图订单均价", data: { When: "5", Count: "2055" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "417256",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "YK R6有线耳机",
          When: "21:41:29"
        },
        {
          Id: "417255",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "华为 畅享9plus全网通版黑色4+128G",
          When: "21:41:29",
          __new: true
        },
        {
          Id: "390745",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "耐用王TP-C充电线",
          When: "21:49:45",
          __new: true
        },
        {
          Id: "52835",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "精盐",
          When: "23:24:47",
          __new: true
        },
        {
          Id: "48722",
          Province: "河南省",
          City: "商丘市",
          District: "永城市",
          What: "金笑笑h905",
          When: "18:55:53",
          __new: true
        },
        {
          Id: "48721",
          Province: "河南省",
          City: "商丘市",
          District: "永城市",
          What: "铂乐战舰N6绿",
          When: "18:55:53",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1268", Yesterday: "1143" } },
    { desc: "GMV对比", data: { Today: "11004912", Yesterday: "10839488" } },
    { desc: "会员数", data: { Count: "144731" } },
    { desc: "活跃端口对比", data: { Today: "1836", Yesterday: "1202" } },
    { desc: "曲线图订单量", data: { When: "6", Count: "1268" } },
    { desc: "曲线图订单均价", data: { When: "6", Count: "2126" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "390759",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "正能量礼品充电宝",
          When: "21:52:36"
        },
        {
          Id: "390758",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO Y97 4+128 星夜黑",
          When: "21:52:36",
          __new: true
        },
        {
          Id: "369956",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "优之然U8数据线安卓",
          When: "22:01:16",
          __new: true
        },
        {
          Id: "103185",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:08:01",
          __new: true
        },
        {
          Id: "103184",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:08:01",
          __new: true
        },
        {
          Id: "54603",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "手机壳 古尚系列壳",
          When: "18:26:26",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1170", Yesterday: "1268" } },
    { desc: "GMV对比", data: { Today: "12510452", Yesterday: "11004912" } },
    { desc: "会员数", data: { Count: "145339" } },
    { desc: "活跃端口对比", data: { Today: "2130", Yesterday: "1836" } },
    { desc: "曲线图订单量", data: { When: "7", Count: "1170" } },
    { desc: "曲线图订单均价", data: { When: "7", Count: "1915" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "393710",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "床上四件套",
          When: "22:48:29"
        },
        {
          Id: "393709",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为P20-全网6+64",
          When: "22:48:29",
          __new: true
        },
        {
          Id: "393706",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为NOVA3全网通 6+128g",
          When: "22:45:02",
          __new: true
        },
        {
          Id: "103328",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:04:11",
          __new: true
        },
        {
          Id: "103327",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:04:11",
          __new: true
        },
        {
          Id: "103326",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:04:11",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1587", Yesterday: "1170" } },
    { desc: "GMV对比", data: { Today: "4712630", Yesterday: "12510452" } },
    { desc: "会员数", data: { Count: "146008" } },
    { desc: "活跃端口对比", data: { Today: "2012", Yesterday: "2130" } },
    { desc: "曲线图订单量", data: { When: "8", Count: "1587" } },
    { desc: "曲线图订单均价", data: { When: "8", Count: "2487" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "427324",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "23:20:40"
        },
        {
          Id: "427323",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "米家四位四控插线板",
          When: "22:09:40",
          __new: true
        },
        {
          Id: "427320",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为 畅享8 钢化屏保",
          When: "21:48:04",
          __new: true
        },
        {
          Id: "103799",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:47:04",
          __new: true
        },
        {
          Id: "103798",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:47:04",
          __new: true
        },
        {
          Id: "103797",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:47:04",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1502", Yesterday: "1587" } },
    { desc: "GMV对比", data: { Today: "4205962", Yesterday: "4712630" } },
    { desc: "会员数", data: { Count: "146724" } },
    { desc: "活跃端口对比", data: { Today: "2242", Yesterday: "2012" } },
    { desc: "曲线图订单量", data: { When: "9", Count: "1502" } },
    { desc: "曲线图订单均价", data: { When: "9", Count: "2583" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "462451",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "卓品 S04数据线TYPE-C",
          When: "22:39:27"
        },
        {
          Id: "462450",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "22:04:35",
          __new: true
        },
        {
          Id: "462449",
          Province: "河南省",
          City: "濮阳市",
          District: "华龙区",
          What: "小米紫米5碱性电池",
          When: "21:33:45",
          __new: true
        },
        {
          Id: "54663",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "华为Mate20X（6+128G）全网宝石蓝",
          When: "18:45:38",
          __new: true
        },
        {
          Id: "54662",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "华为Mate20（6+128G）全网亮黑色",
          When: "18:45:38",
          __new: true
        },
        {
          Id: "54661",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "华为Mate20（6+128G）全网极光色",
          When: "18:45:38",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1703", Yesterday: "1502" } },
    { desc: "GMV对比", data: { Today: "5520995", Yesterday: "4205962" } },
    { desc: "会员数", data: { Count: "147598" } },
    { desc: "活跃端口对比", data: { Today: "2310", Yesterday: "2242" } },
    { desc: "曲线图订单量", data: { When: "10", Count: "1703" } },
    { desc: "曲线图订单均价", data: { When: "10", Count: "2919" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "468419",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "华为nova3i全网通4+128G亮黑",
          When: "22:31:02"
        },
        {
          Id: "468418",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "华为nova3i全网通4+128G亮黑",
          When: "22:31:02",
          __new: true
        },
        {
          Id: "468414",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "涮烤一体锅",
          When: "22:30:27",
          __new: true
        },
        {
          Id: "54772",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "B类屏保（000010）",
          When: "19:29:05",
          __new: true
        },
        {
          Id: "54771",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "荣耀 荣耀play全网通黑色6+128G",
          When: "19:29:05",
          __new: true
        },
        {
          Id: "54770",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "卓品 VIVO耳机",
          When: "19:29:05",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2168", Yesterday: "1703" } },
    { desc: "GMV对比", data: { Today: "5256671", Yesterday: "5520995" } },
    { desc: "会员数", data: { Count: "148650" } },
    { desc: "活跃端口对比", data: { Today: "2470", Yesterday: "2310" } },
    { desc: "曲线图订单量", data: { When: "11", Count: "2168" } },
    { desc: "曲线图订单均价", data: { When: "11", Count: "3745" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "471594",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "亿优S620彩",
          When: "22:55:00"
        },
        {
          Id: "471590",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "卓品J01手机支架",
          When: "22:53:36",
          __new: true
        },
        {
          Id: "471589",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为MATE20 全网6+128G",
          When: "22:53:36",
          __new: true
        },
        {
          Id: "105276",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "17:51:14",
          __new: true
        },
        {
          Id: "105275",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "17:51:14",
          __new: true
        },
        {
          Id: "105274",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "17:51:14",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1587", Yesterday: "2168" } },
    { desc: "GMV对比", data: { Today: "5781480", Yesterday: "5256671" } },
    { desc: "会员数", data: { Count: "149152" } },
    { desc: "活跃端口对比", data: { Today: "2228", Yesterday: "2470" } },
    { desc: "曲线图订单量", data: { When: "12", Count: "1587" } },
    { desc: "曲线图订单均价", data: { When: "12", Count: "2727" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "474098",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "21:57:45"
        },
        {
          Id: "474097",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "华为畅享9Plus4+128蓝",
          When: "21:57:45",
          __new: true
        },
        {
          Id: "474093",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "华为畅享9PLUS 全网通 宝石蓝 4+128",
          When: "21:53:30",
          __new: true
        },
        {
          Id: "105476",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "19:42:11",
          __new: true
        },
        {
          Id: "54892",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻夜黑/1充线说明保卡",
          When: "19:41:43",
          __new: true
        },
        {
          Id: "54891",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 蓝色",
          When: "19:41:43",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1381", Yesterday: "1587" } },
    { desc: "GMV对比", data: { Today: "8950766", Yesterday: "5781480" } },
    { desc: "会员数", data: { Count: "149774" } },
    { desc: "活跃端口对比", data: { Today: "2236", Yesterday: "2228" } },
    { desc: "曲线图订单量", data: { When: "13", Count: "1381" } },
    { desc: "曲线图订单均价", data: { When: "13", Count: "2181" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "494423",
          Province: "河南省",
          City: "商丘市",
          District: "梁园区",
          What: "荣耀 畅玩7C 金 4+64",
          When: "22:07:22"
        },
        {
          Id: "494422",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPOR9S钢化屏保",
          When: "21:55:23",
          __new: true
        },
        {
          Id: "494421",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "小天才Z1Y",
          When: "21:53:12",
          __new: true
        },
        {
          Id: "105660",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:05:03",
          __new: true
        },
        {
          Id: "105659",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:04:30",
          __new: true
        },
        {
          Id: "105658",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:04:30",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1495", Yesterday: "1381" } },
    { desc: "GMV对比", data: { Today: "12022341", Yesterday: "8950766" } },
    { desc: "会员数", data: { Count: "150368" } },
    { desc: "活跃端口对比", data: { Today: "2198", Yesterday: "2236" } },
    { desc: "曲线图订单量", data: { When: "14", Count: "1495" } },
    { desc: "曲线图订单均价", data: { When: "14", Count: "2745" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "496329",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "歌奈内存卡-16G",
          When: "21:36:25"
        },
        {
          Id: "496328",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "浮雕手机壳",
          When: "21:35:27",
          __new: true
        },
        {
          Id: "496327",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "OPPO A7x 4+128 冰焰蓝",
          When: "21:35:27",
          __new: true
        },
        {
          Id: "106474",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:21:48",
          __new: true
        },
        {
          Id: "106473",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:21:48",
          __new: true
        },
        {
          Id: "106472",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:21:48",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1549", Yesterday: "1495" } },
    { desc: "GMV对比", data: { Today: "8709094", Yesterday: "12022341" } },
    { desc: "会员数", data: { Count: "150994" } },
    { desc: "活跃端口对比", data: { Today: "2230", Yesterday: "2198" } },
    { desc: "曲线图订单量", data: { When: "15", Count: "1549" } },
    { desc: "曲线图订单均价", data: { When: "15", Count: "2412" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "498167",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "遥控车",
          When: "23:14:35"
        },
        {
          Id: "498166",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "云仕U1耳机",
          When: "22:32:12",
          __new: true
        },
        {
          Id: "498165",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "明派MS19数据线苹果",
          When: "22:13:06",
          __new: true
        },
        {
          Id: "107002",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:12:08",
          __new: true
        },
        {
          Id: "55449",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影蓝/1充线说明保卡",
          When: "18:39:41",
          __new: true
        },
        {
          Id: "55448",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影紫/1充线说明保卡",
          When: "18:39:41",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1330", Yesterday: "1549" } },
    { desc: "GMV对比", data: { Today: "6344927", Yesterday: "8709094" } },
    { desc: "会员数", data: { Count: "151783" } },
    { desc: "活跃端口对比", data: { Today: "2138", Yesterday: "2230" } },
    { desc: "曲线图订单量", data: { When: "16", Count: "1330" } },
    { desc: "曲线图订单均价", data: { When: "16", Count: "2189" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "500002",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "VIVO Z3i 6+128 极光蓝",
          When: "22:11:35"
        },
        {
          Id: "500000",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "苹果X-5.8 钢化屏保",
          When: "21:48:14",
          __new: true
        },
        {
          Id: "499999",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "苹果X-5.8-64G-全网",
          When: "21:48:14",
          __new: true
        },
        {
          Id: "107307",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:18:42",
          __new: true
        },
        {
          Id: "55525",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "VIVO Z3i全网通粉色6+128G",
          When: "20:06:11",
          __new: true
        },
        {
          Id: "55524",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "VIVO Z3i全网通蓝色6+128G",
          When: "20:06:11",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1679", Yesterday: "1330" } },
    { desc: "GMV对比", data: { Today: "5507828", Yesterday: "6344927" } },
    { desc: "会员数", data: { Count: "152633" } },
    { desc: "活跃端口对比", data: { Today: "2468", Yesterday: "2138" } },
    { desc: "曲线图订单量", data: { When: "17", Count: "1679" } },
    { desc: "曲线图订单均价", data: { When: "17", Count: "2948" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "502464",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "卓品S20数据线TPC",
          When: "21:50:57"
        },
        {
          Id: "502463",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "遥控车",
          When: "21:40:49",
          __new: true
        },
        {
          Id: "502462",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPO闪充线",
          When: "21:40:06",
          __new: true
        },
        {
          Id: "107760",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:04:22",
          __new: true
        },
        {
          Id: "107759",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:04:22",
          __new: true
        },
        {
          Id: "55591",
          Province: "河南省",
          City: "漯河市",
          District: "舞阳县",
          What: "钢化膜 裸片",
          When: "18:31:10",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1662", Yesterday: "1679" } },
    { desc: "GMV对比", data: { Today: "1957015", Yesterday: "5507828" } },
    { desc: "会员数", data: { Count: "153476" } },
    { desc: "活跃端口对比", data: { Today: "2344", Yesterday: "2468" } },
    { desc: "曲线图订单量", data: { When: "18", Count: "1662" } },
    { desc: "曲线图订单均价", data: { When: "18", Count: "2537" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "504940",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "5L金龙鱼油",
          When: "21:59:17"
        },
        {
          Id: "504939",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "5L金龙鱼油",
          When: "21:57:55",
          __new: true
        },
        {
          Id: "504938",
          Province: "河南省",
          City: "商丘市",
          District: "梁园区",
          What: "荣耀畅玩7c 3+32g 蓝",
          When: "21:53:40",
          __new: true
        },
        {
          Id: "107831",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网4+128G)",
          When: "17:59:14",
          __new: true
        },
        {
          Id: "107828",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "17:49:08",
          __new: true
        },
        {
          Id: "107827",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+256尊享版)",
          When: "17:49:08",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1595", Yesterday: "1662" } },
    { desc: "GMV对比", data: { Today: "3711836", Yesterday: "1957015" } },
    { desc: "会员数", data: { Count: "154138" } },
    { desc: "活跃端口对比", data: { Today: "2136", Yesterday: "2344" } },
    { desc: "曲线图订单量", data: { When: "19", Count: "1595" } },
    { desc: "曲线图订单均价", data: { When: "19", Count: "2948" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "506809",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "vivo闪充线",
          When: "22:11:30"
        },
        {
          Id: "506808",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "金德力GL366 金",
          When: "22:10:27",
          __new: true
        },
        {
          Id: "506807",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "杰力科X5耳机",
          When: "22:10:23",
          __new: true
        },
        {
          Id: "108848",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:01:21",
          __new: true
        },
        {
          Id: "108847",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:01:21",
          __new: true
        },
        {
          Id: "108846",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:01:21",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1473", Yesterday: "1595" } },
    { desc: "GMV对比", data: { Today: "6680199", Yesterday: "3711836" } },
    { desc: "会员数", data: { Count: "154998" } },
    { desc: "活跃端口对比", data: { Today: "2310", Yesterday: "2136" } },
    { desc: "曲线图订单量", data: { When: "20", Count: "1473" } },
    { desc: "曲线图订单均价", data: { When: "20", Count: "2627" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "508742",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "诺克礼品Q95蓝牙耳机",
          When: "22:59:25"
        },
        {
          Id: "508741",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "希品格调充电宝",
          When: "22:59:25",
          __new: true
        },
        {
          Id: "508740",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "OPPOA5 4+64 幻境蓝",
          When: "22:59:25",
          __new: true
        },
        {
          Id: "109520",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "19:11:58",
          __new: true
        },
        {
          Id: "56512",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "OPPO R17 6+128G 霓光紫",
          When: "18:27:29",
          __new: true
        },
        {
          Id: "56511",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "OPPO R17 6+128G 流光蓝",
          When: "18:27:29",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1448", Yesterday: "1473" } },
    { desc: "GMV对比", data: { Today: "4586372", Yesterday: "6680199" } },
    { desc: "会员数", data: { Count: "155613" } },
    { desc: "活跃端口对比", data: { Today: "2230", Yesterday: "2310" } },
    { desc: "曲线图订单量", data: { When: "21", Count: "1448" } },
    { desc: "曲线图订单均价", data: { When: "21", Count: "2623" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "510615",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "苹果 7P全网通粉色128G",
          When: "23:53:52"
        },
        {
          Id: "510614",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "杰力科苹果线",
          When: "22:44:18",
          __new: true
        },
        {
          Id: "510613",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "希品格调充电宝",
          When: "22:44:18",
          __new: true
        },
        {
          Id: "110244",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:19:57",
          __new: true
        },
        {
          Id: "110243",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:19:57",
          __new: true
        },
        {
          Id: "110242",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:19:57",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1487", Yesterday: "1448" } },
    { desc: "GMV对比", data: { Today: "9838350", Yesterday: "4586372" } },
    { desc: "会员数", data: { Count: "156296" } },
    { desc: "活跃端口对比", data: { Today: "2214", Yesterday: "2230" } },
    { desc: "曲线图订单量", data: { When: "22", Count: "1487" } },
    { desc: "曲线图订单均价", data: { When: "22", Count: "2631" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "512552",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "小块头充电宝",
          When: "22:04:05"
        },
        {
          Id: "512551",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "雪梅碗筷",
          When: "22:04:05",
          __new: true
        },
        {
          Id: "512550",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "读书郎 公主粉",
          When: "21:39:31",
          __new: true
        },
        {
          Id: "110898",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:20:14",
          __new: true
        },
        {
          Id: "110897",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COR-AL10(PLAY全网6+128G)",
          When: "18:20:14",
          __new: true
        },
        {
          Id: "56620",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为Mate20X(EVR-AL00)6+128G宝石蓝",
          When: "18:26:09",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1330", Yesterday: "1487" } },
    { desc: "GMV对比", data: { Today: "3465979", Yesterday: "9838350" } },
    { desc: "会员数", data: { Count: "156902" } },
    { desc: "活跃端口对比", data: { Today: "2224", Yesterday: "2214" } },
    { desc: "曲线图订单量", data: { When: "23", Count: "1330" } },
    { desc: "曲线图订单均价", data: { When: "23", Count: "2271" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "514324",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "VIVO X23 8+128 幻夜蓝",
          When: "22:39:01"
        },
        {
          Id: "514323",
          Province: "河南省",
          City: "商丘市",
          District: "永城市",
          What: "25充电头",
          When: "21:46:01",
          __new: true
        },
        {
          Id: "514322",
          Province: "河南省",
          City: "商丘市",
          District: "永城市",
          What: "安卓10数据线",
          When: "21:46:01",
          __new: true
        },
        {
          Id: "56681",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影蓝/1充线说明保卡",
          When: "18:50:39",
          __new: true
        },
        {
          Id: "56680",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影紫/1充线说明保卡",
          When: "18:50:39",
          __new: true
        },
        {
          Id: "56679",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀:COL-AL10(10全网通尊享版）6GB+128GB /海鸥灰/1充线说明保卡",
          When: "18:50:39",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1778", Yesterday: "1330" } },
    { desc: "GMV对比", data: { Today: "4457150", Yesterday: "3465979" } },
    { desc: "会员数", data: { Count: "157686" } },
    { desc: "活跃端口对比", data: { Today: "2272", Yesterday: "2224" } },
    { desc: "曲线图订单量", data: { When: "24", Count: "1778" } },
    { desc: "曲线图订单均价", data: { When: "24", Count: "3146" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "516608",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵P311充电宝",
          When: "22:17:43"
        },
        {
          Id: "516607",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO X23 8+128 魅影紫",
          When: "22:17:43",
          __new: true
        },
        {
          Id: "516606",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "希品H515耳机",
          When: "22:17:00",
          __new: true
        },
        {
          Id: "112178",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "19:46:29",
          __new: true
        },
        {
          Id: "112177",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "19:46:29",
          __new: true
        },
        {
          Id: "112176",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "19:46:29",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1873", Yesterday: "1778" } },
    { desc: "GMV对比", data: { Today: "3668176", Yesterday: "4457150" } },
    { desc: "会员数", data: { Count: "158541" } },
    { desc: "活跃端口对比", data: { Today: "2442", Yesterday: "2272" } },
    { desc: "曲线图订单量", data: { When: "25", Count: "1873" } },
    { desc: "曲线图订单均价", data: { When: "25", Count: "3000" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "519041",
          Province: "河南省",
          City: "商丘市",
          District: "梁园区",
          What: "荣耀 荣耀10 蓝 6+128",
          When: "21:42:36"
        },
        {
          Id: "519040",
          Province: "河南省",
          City: "商丘市",
          District: "梁园区",
          What: "华为畅享MAX 4+128G 幻夜黑",
          When: "21:39:59",
          __new: true
        },
        {
          Id: "519039",
          Province: "河南省",
          City: "南阳市",
          District: "内乡县",
          What: "OPPO A5 4+64G粉",
          When: "21:38:08",
          __new: true
        },
        {
          Id: "112725",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:10:07",
          __new: true
        },
        {
          Id: "112724",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:10:07",
          __new: true
        },
        {
          Id: "56873",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "屏乐乐299",
          When: "18:11:28",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1714", Yesterday: "1873" } },
    { desc: "GMV对比", data: { Today: "3816739", Yesterday: "3668176" } },
    { desc: "会员数", data: { Count: "159157" } },
    { desc: "活跃端口对比", data: { Today: "2298", Yesterday: "2442" } },
    { desc: "曲线图订单量", data: { When: "26", Count: "1714" } },
    { desc: "曲线图订单均价", data: { When: "26", Count: "2612" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "520985",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "22:13:29"
        },
        {
          Id: "520984",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "vivoy97梦幻粉4+128",
          When: "22:04:55",
          __new: true
        },
        {
          Id: "520983",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "好乐普A32 蓝",
          When: "21:59:30",
          __new: true
        },
        {
          Id: "113300",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:19:48",
          __new: true
        },
        {
          Id: "113299",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "套包9",
          When: "18:19:48",
          __new: true
        },
        {
          Id: "113298",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:19:48",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1741", Yesterday: "1714" } },
    { desc: "GMV对比", data: { Today: "14803257", Yesterday: "3816739" } },
    { desc: "会员数", data: { Count: "159862" } },
    { desc: "活跃端口对比", data: { Today: "2392", Yesterday: "2298" } },
    { desc: "曲线图订单量", data: { When: "27", Count: "1741" } },
    { desc: "曲线图订单均价", data: { When: "27", Count: "2767" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "523057",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "华为MateBook X笔记本（8+256G）玫瑰金",
          When: "22:20:02"
        },
        {
          Id: "523055",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "荣耀畅玩8X 6+128G 移动B2B",
          When: "22:16:16",
          __new: true
        },
        {
          Id: "523054",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "OPPOR9S钢化屏保",
          When: "22:16:16",
          __new: true
        },
        {
          Id: "113936",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "17:55:52",
          __new: true
        },
        {
          Id: "113935",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "套包9",
          When: "17:55:52",
          __new: true
        },
        {
          Id: "113934",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "17:55:52",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1655", Yesterday: "1741" } },
    { desc: "GMV对比", data: { Today: "6188496", Yesterday: "14803257" } },
    { desc: "会员数", data: { Count: "160489" } },
    { desc: "活跃端口对比", data: { Today: "2124", Yesterday: "2392" } },
    { desc: "曲线图订单量", data: { When: "28", Count: "1655" } },
    { desc: "曲线图订单均价", data: { When: "28", Count: "2616" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "524970",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "读书郎智能手表",
          When: "22:22:53"
        },
        {
          Id: "524968",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "荣耀畅玩8X 6+128G 全网",
          When: "22:16:19",
          __new: true
        },
        {
          Id: "524967",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "云仕U7耳机",
          When: "22:16:19",
          __new: true
        },
        {
          Id: "57210",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "HUAWEI nova 3i 全网通公开版 4G+128G INE-AL00蓝楹紫手机",
          When: "20:00:44",
          __new: true
        },
        {
          Id: "57209",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 9i 4+128 黑色",
          When: "20:00:44",
          __new: true
        },
        {
          Id: "57208",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 9i 4+128（魅海蓝）-LLD-AL30-全网通尊享版",
          When: "20:00:44",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1554", Yesterday: "1655" } },
    { desc: "GMV对比", data: { Today: "9244746", Yesterday: "6188496" } },
    { desc: "会员数", data: { Count: "161059" } },
    { desc: "活跃端口对比", data: { Today: "2318", Yesterday: "2124" } },
    { desc: "曲线图订单量", data: { When: "29", Count: "1554" } },
    { desc: "曲线图订单均价", data: { When: "29", Count: "2248" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "526783",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "华为Mate原充电头",
          When: "21:48:53"
        },
        {
          Id: "526782",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "华为Mate原充电线",
          When: "21:48:53",
          __new: true
        },
        {
          Id: "526779",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "云仕C100小怪兽耳机",
          When: "21:39:10",
          __new: true
        },
        {
          Id: "57323",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星GSM手机S8 G9500 64G黑",
          When: "18:41:51",
          __new: true
        },
        {
          Id: "57322",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星S9+ G9650(6+128G)魅海蓝",
          When: "18:41:51",
          __new: true
        },
        {
          Id: "57321",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星GSM手机S9+ G9650(6+64G)黑",
          When: "18:41:51",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1755", Yesterday: "1554" } },
    { desc: "GMV对比", data: { Today: "3724033", Yesterday: "9244746" } },
    { desc: "会员数", data: { Count: "161703" } },
    { desc: "活跃端口对比", data: { Today: "2348", Yesterday: "2318" } },
    { desc: "曲线图订单量", data: { When: "30", Count: "1755" } },
    { desc: "曲线图订单均价", data: { When: "30", Count: "2459" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "528820",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "红米6pro 金色 4+32",
          When: "23:12:36"
        },
        {
          Id: "528819",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "优博思经典系列32G-U盘",
          When: "23:11:40",
          __new: true
        },
        {
          Id: "528818",
          Province: "河南省",
          City: "开封市",
          District: "顺河回族区",
          What: "华为钢化屏保",
          When: "22:47:38",
          __new: true
        },
        {
          Id: "57435",
          Province: "河南省",
          City: "漯河市",
          District: "舞阳县",
          What: "时尚卡通电暖宝",
          When: "20:57:35",
          __new: true
        },
        {
          Id: "57430",
          Province: "河南省",
          City: "许昌市",
          District: "鄢陵县",
          What: "华为mate20全网版极光色6+128G",
          When: "18:45:53",
          __new: true
        },
        {
          Id: "57429",
          Province: "河南省",
          City: "许昌市",
          District: "鄢陵县",
          What: "华为P20Pro全网极光色6+256G",
          When: "18:45:53",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1758", Yesterday: "1755" } },
    { desc: "GMV对比", data: { Today: "6084694", Yesterday: "3724033" } },
    { desc: "会员数", data: { Count: "162572" } },
    { desc: "活跃端口对比", data: { Today: "2390", Yesterday: "2348" } },
    { desc: "曲线图订单量", data: { When: "1", Count: "1758" } },
    { desc: "曲线图订单均价", data: { When: "1", Count: "2776" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "531158",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "卓品Y66电源10000",
          When: "22:10:18"
        },
        {
          Id: "531155",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为NOVA3全网通 6+128g",
          When: "22:05:05",
          __new: true
        },
        {
          Id: "531154",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为NOVA3钢化屏保",
          When: "22:05:05",
          __new: true
        },
        {
          Id: "57507",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "18:08:32",
          __new: true
        },
        {
          Id: "57506",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星GSM手机S9 G9600(4+128G)黑",
          When: "18:04:46",
          __new: true
        },
        {
          Id: "57504",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "VIVO X23幻彩版(6+128G)北极晨曦",
          When: "18:00:58",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1609", Yesterday: "1758" } },
    { desc: "GMV对比", data: { Today: "2654842", Yesterday: "6084694" } },
    { desc: "会员数", data: { Count: "163633" } },
    { desc: "活跃端口对比", data: { Today: "2268", Yesterday: "2390" } },
    { desc: "曲线图订单量", data: { When: "2", Count: "1609" } },
    { desc: "曲线图订单均价", data: { When: "2", Count: "2502" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "533417",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "22:37:53"
        },
        {
          Id: "533416",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "一加onepius6t",
          When: "22:29:11",
          __new: true
        },
        {
          Id: "533415",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "半包钢化膜",
          When: "21:40:20",
          __new: true
        },
        {
          Id: "115752",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BND-AL10(7X全网)",
          When: "18:06:24",
          __new: true
        },
        {
          Id: "57536",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星599",
          When: "19:03:24",
          __new: true
        },
        {
          Id: "57535",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "屏乐乐199",
          When: "18:28:16",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1361", Yesterday: "1609" } },
    { desc: "GMV对比", data: { Today: "4299209", Yesterday: "2654842" } },
    { desc: "会员数", data: { Count: "164219" } },
    { desc: "活跃端口对比", data: { Today: "2584", Yesterday: "2268" } },
    { desc: "曲线图订单量", data: { When: "3", Count: "1361" } },
    { desc: "曲线图订单均价", data: { When: "3", Count: "2289" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "535212",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "VIVO Y93 4+64 紫霞红",
          When: "22:05:50"
        },
        {
          Id: "535211",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "慧能达吹风机",
          When: "22:05:50",
          __new: true
        },
        {
          Id: "535210",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "卡通充电宝",
          When: "22:05:22",
          __new: true
        },
        {
          Id: "116213",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:06:38",
          __new: true
        },
        {
          Id: "116212",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:06:38",
          __new: true
        },
        {
          Id: "116211",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:06:38",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1508", Yesterday: "1361" } },
    { desc: "GMV对比", data: { Today: "4843544", Yesterday: "4299209" } },
    { desc: "会员数", data: { Count: "164892" } },
    { desc: "活跃端口对比", data: { Today: "2314", Yesterday: "2584" } },
    { desc: "曲线图订单量", data: { When: "4", Count: "1508" } },
    { desc: "曲线图订单均价", data: { When: "4", Count: "2457" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "537335",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "洗衣液",
          When: "21:49:31"
        },
        {
          Id: "537334",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "洗衣液",
          When: "21:49:31",
          __new: true
        },
        {
          Id: "537333",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "洗衣液",
          When: "21:49:31",
          __new: true
        },
        {
          Id: "116444",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "活动套包3",
          When: "18:13:53",
          __new: true
        },
        {
          Id: "116443",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:13:53",
          __new: true
        },
        {
          Id: "116442",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "18:13:53",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1148", Yesterday: "1508" } },
    { desc: "GMV对比", data: { Today: "15839172", Yesterday: "4843544" } },
    { desc: "会员数", data: { Count: "165433" } },
    { desc: "活跃端口对比", data: { Today: "2252", Yesterday: "2314" } },
    { desc: "曲线图订单量", data: { When: "5", Count: "1148" } },
    { desc: "曲线图订单均价", data: { When: "5", Count: "1896" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "538818",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "全包钢化膜",
          When: "21:57:54"
        },
        {
          Id: "538817",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "浮雕手机壳",
          When: "21:57:54",
          __new: true
        },
        {
          Id: "538816",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "M11 蓝牙音响",
          When: "21:56:48",
          __new: true
        },
        {
          Id: "57762",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:28:34",
          __new: true
        },
        {
          Id: "57760",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为GSM手机P20Pro(CLT-AL00)6+128G亮黑",
          When: "18:26:42",
          __new: true
        },
        {
          Id: "57759",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为GSM手机P20(EML-AL00)6+64G亮黑",
          When: "18:26:42",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1375", Yesterday: "1148" } },
    { desc: "GMV对比", data: { Today: "3677800", Yesterday: "15839172" } },
    { desc: "会员数", data: { Count: "166058" } },
    { desc: "活跃端口对比", data: { Today: "2374", Yesterday: "2252" } },
    { desc: "曲线图订单量", data: { When: "6", Count: "1375" } },
    { desc: "曲线图订单均价", data: { When: "6", Count: "2124" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "540659",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "vivo Y71 钢化屏保",
          When: "21:51:05"
        },
        {
          Id: "540653",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "洗衣液",
          When: "21:49:45",
          __new: true
        },
        {
          Id: "540652",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "洗衣液",
          When: "21:49:45",
          __new: true
        },
        {
          Id: "118230",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:25:32",
          __new: true
        },
        {
          Id: "118229",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "屏乐乐399",
          When: "19:51:12",
          __new: true
        },
        {
          Id: "118228",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:42:04",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1453", Yesterday: "1375" } },
    { desc: "GMV对比", data: { Today: "7094522", Yesterday: "3677800" } },
    { desc: "会员数", data: { Count: "166691" } },
    { desc: "活跃端口对比", data: { Today: "2374", Yesterday: "2374" } },
    { desc: "曲线图订单量", data: { When: "7", Count: "1453" } },
    { desc: "曲线图订单均价", data: { When: "7", Count: "2264" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "542541",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "普通安卓线",
          When: "21:42:12"
        },
        {
          Id: "542540",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "vivo闪充线",
          When: "21:40:27",
          __new: true
        },
        {
          Id: "542539",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "不锈钢保温壶",
          When: "21:39:17",
          __new: true
        },
        {
          Id: "118616",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:21:39",
          __new: true
        },
        {
          Id: "118615",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:21:00",
          __new: true
        },
        {
          Id: "118614",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:08:09",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1707", Yesterday: "1453" } },
    { desc: "GMV对比", data: { Today: "4465865", Yesterday: "7094522" } },
    { desc: "会员数", data: { Count: "167529" } },
    { desc: "活跃端口对比", data: { Today: "2564", Yesterday: "2374" } },
    { desc: "曲线图订单量", data: { When: "8", Count: "1707" } },
    { desc: "曲线图订单均价", data: { When: "8", Count: "2724" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "544906",
          Province: "河南省",
          City: "漯河市",
          District: "舞阳县",
          What: "红三角彩包热水壶",
          When: "23:10:01"
        },
        {
          Id: "544905",
          Province: "河南省",
          City: "漯河市",
          District: "舞阳县",
          What: "天际通 苹果耳机圆线/M301 白",
          When: "23:10:01",
          __new: true
        },
        {
          Id: "544904",
          Province: "河南省",
          City: "漯河市",
          District: "舞阳县",
          What: "OPPOA5 4+64G 幻境粉",
          When: "23:10:01",
          __new: true
        },
        {
          Id: "118992",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "18:43:05",
          __new: true
        },
        {
          Id: "118991",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "荣耀 BKK-ALOO 8C 4+64G黑",
          When: "18:43:03",
          __new: true
        },
        {
          Id: "118990",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "荣耀 BKK-ALOO 8C 4+64G金",
          When: "18:43:03",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1779", Yesterday: "1707" } },
    { desc: "GMV对比", data: { Today: "2659197", Yesterday: "4465865" } },
    { desc: "会员数", data: { Count: "168380" } },
    { desc: "活跃端口对比", data: { Today: "2714", Yesterday: "2564" } },
    { desc: "曲线图订单量", data: { When: "9", Count: "1779" } },
    { desc: "曲线图订单均价", data: { When: "9", Count: "2698" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "547443",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "荣耀8C",
          When: "22:36:03"
        },
        {
          Id: "547442",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "红三角电热水壶",
          When: "22:03:27",
          __new: true
        },
        {
          Id: "547441",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "OPPO R17 6+128 流光蓝",
          When: "21:44:38",
          __new: true
        },
        {
          Id: "119165",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:18:16",
          __new: true
        },
        {
          Id: "119164",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星A6S G6200（6+128G）锦鲤红",
          When: "18:13:47",
          __new: true
        },
        {
          Id: "119163",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星A6S G6200（6+64G）撒浪黑",
          When: "18:13:47",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1578", Yesterday: "1779" } },
    { desc: "GMV对比", data: { Today: "3988035", Yesterday: "2659197" } },
    { desc: "会员数", data: { Count: "169018" } },
    { desc: "活跃端口对比", data: { Today: "2834", Yesterday: "2714" } },
    { desc: "曲线图订单量", data: { When: "10", Count: "1578" } },
    { desc: "曲线图订单均价", data: { When: "10", Count: "2451" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "549573",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为MATE20 全网6+128G",
          When: "22:18:24"
        },
        {
          Id: "549572",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "陶瓷对杯(华通)",
          When: "22:18:24",
          __new: true
        },
        {
          Id: "549571",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "方锅",
          When: "22:18:24",
          __new: true
        },
        {
          Id: "119503",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:32:23",
          __new: true
        },
        {
          Id: "119502",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:32:23",
          __new: true
        },
        {
          Id: "119499",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "美图MP1605(V6公开版)",
          When: "18:03:42",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1539", Yesterday: "1578" } },
    { desc: "GMV对比", data: { Today: "11489032", Yesterday: "3988035" } },
    { desc: "会员数", data: { Count: "169707" } },
    { desc: "活跃端口对比", data: { Today: "2696", Yesterday: "2834" } },
    { desc: "曲线图订单量", data: { When: "11", Count: "1539" } },
    { desc: "曲线图订单均价", data: { When: "11", Count: "2333" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "551568",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "手机壳",
          When: "22:38:13"
        },
        {
          Id: "551564",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "普通指环扣",
          When: "22:21:57",
          __new: true
        },
        {
          Id: "551563",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "VIVO X23 8+128 魅影紫",
          When: "22:21:57",
          __new: true
        },
        {
          Id: "119887",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:05:35",
          __new: true
        },
        {
          Id: "119886",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "屏乐乐599",
          When: "20:05:27",
          __new: true
        },
        {
          Id: "119885",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:10:56",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1631", Yesterday: "1539" } },
    { desc: "GMV对比", data: { Today: "7192189", Yesterday: "11489032" } },
    { desc: "会员数", data: { Count: "170501" } },
    { desc: "活跃端口对比", data: { Today: "2676", Yesterday: "2696" } },
    { desc: "曲线图订单量", data: { When: "12", Count: "1631" } },
    { desc: "曲线图订单均价", data: { When: "12", Count: "2662" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "553910",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "nova36+128",
          When: "21:58:06"
        },
        {
          Id: "553909",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "手机壳",
          When: "21:58:03",
          __new: true
        },
        {
          Id: "553907",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "二味锅",
          When: "21:57:18",
          __new: true
        },
        {
          Id: "120212",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:08:36",
          __new: true
        },
        {
          Id: "120211",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:07:20",
          __new: true
        },
        {
          Id: "120210",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:04:35",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1635", Yesterday: "1631" } },
    { desc: "GMV对比", data: { Today: "6334356", Yesterday: "7192189" } },
    { desc: "会员数", data: { Count: "171148" } },
    { desc: "活跃端口对比", data: { Today: "2480", Yesterday: "2676" } },
    { desc: "曲线图订单量", data: { When: "13", Count: "1635" } },
    { desc: "曲线图订单均价", data: { When: "13", Count: "2683" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "555932",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO X23 8+128G 幻影红",
          When: "23:18:03"
        },
        {
          Id: "555931",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO X23 8+128G 幻夜蓝",
          When: "23:18:03",
          __new: true
        },
        {
          Id: "555930",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "金属漆软胶壳",
          When: "23:18:03",
          __new: true
        },
        {
          Id: "120894",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:48:07",
          __new: true
        },
        {
          Id: "120893",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "18:31:09",
          __new: true
        },
        {
          Id: "120892",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星399",
          When: "18:18:39",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1837", Yesterday: "1635" } },
    { desc: "GMV对比", data: { Today: "12093975", Yesterday: "6334356" } },
    { desc: "会员数", data: { Count: "171798" } },
    { desc: "活跃端口对比", data: { Today: "2546", Yesterday: "2480" } },
    { desc: "曲线图订单量", data: { When: "14", Count: "1837" } },
    { desc: "曲线图订单均价", data: { When: "14", Count: "2947" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "558451",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "39元 OPPO原装线 普通口",
          When: "22:43:14"
        },
        {
          Id: "558450",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "40元 乐视线GNPPI",
          When: "22:41:28",
          __new: true
        },
        {
          Id: "558448",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "oppo k1 蓝 6+64",
          When: "22:38:00",
          __new: true
        },
        {
          Id: "121328",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:04:07",
          __new: true
        },
        {
          Id: "121327",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:21:47",
          __new: true
        },
        {
          Id: "121326",
          Province: "河南省",
          City: "周口市",
          District: "项城市",
          What: "热水壶",
          When: "18:51:18",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1849", Yesterday: "1837" } },
    { desc: "GMV对比", data: { Today: "3338158", Yesterday: "12093975" } },
    { desc: "会员数", data: { Count: "172635" } },
    { desc: "活跃端口对比", data: { Today: "2626", Yesterday: "2546" } },
    { desc: "曲线图订单量", data: { When: "15", Count: "1849" } },
    { desc: "曲线图订单均价", data: { When: "15", Count: "2903" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "561099",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "OPPO A5 (3+64) 幻影粉",
          When: "22:23:15"
        },
        {
          Id: "561098",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为AI音箱Myna 太空黑",
          When: "22:14:05",
          __new: true
        },
        {
          Id: "561097",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "杰力科TP-C线",
          When: "22:01:52",
          __new: true
        },
        {
          Id: "121607",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "20:26:35",
          __new: true
        },
        {
          Id: "121606",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:17:03",
          __new: true
        },
        {
          Id: "121605",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:15:32",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2096", Yesterday: "1849" } },
    { desc: "GMV对比", data: { Today: "2955711", Yesterday: "3338158" } },
    { desc: "会员数", data: { Count: "173499" } },
    { desc: "活跃端口对比", data: { Today: "2650", Yesterday: "2626" } },
    { desc: "曲线图订单量", data: { When: "16", Count: "2096" } },
    { desc: "曲线图订单均价", data: { When: "16", Count: "2972" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "563842",
          Province: "河南省",
          City: "驻马店市",
          District: "西平县",
          What: "三星A6Star 全网通 6+64 撒浪黑",
          When: "23:29:26"
        },
        {
          Id: "563840",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "OPPO R17（8+128）霓光紫",
          When: "23:07:30",
          __new: true
        },
        {
          Id: "563839",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "OPPO R17（8+128）流光蓝",
          When: "23:07:30",
          __new: true
        },
        {
          Id: "121841",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "18:59:10",
          __new: true
        },
        {
          Id: "121840",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "SOP-Q7红色",
          When: "18:33:26",
          __new: true
        },
        {
          Id: "121837",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "VIVO Y97全网通黑色4+128G",
          When: "18:32:12",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1544", Yesterday: "2096" } },
    { desc: "GMV对比", data: { Today: "4088200", Yesterday: "2955711" } },
    { desc: "会员数", data: { Count: "174194" } },
    { desc: "活跃端口对比", data: { Today: "2634", Yesterday: "2650" } },
    { desc: "曲线图订单量", data: { When: "17", Count: "1544" } },
    { desc: "曲线图订单均价", data: { When: "17", Count: "2819" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "566291",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "vivoy93紫霞红4+64",
          When: "21:35:22"
        },
        {
          Id: "566290",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "严选会员尊享礼包",
          When: "21:32:06",
          __new: true
        },
        {
          Id: "566289",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "华为畅享9plus 宝石蓝 6+128",
          When: "21:31:48",
          __new: true
        },
        {
          Id: "122195",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 10 青春 6+128GB(幻夜黑)-HRY-AL00-全网通尊享版",
          When: "23:48:39",
          __new: true
        },
        {
          Id: "122194",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 畅玩 AUM-AL00 7A 3+32 蓝色",
          When: "23:48:39",
          __new: true
        },
        {
          Id: "122193",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "HUAWEI nova 3 全网通公开版 6G+128G PAR-AL00浅艾蓝手机",
          When: "23:48:39",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1550", Yesterday: "1544" } },
    { desc: "GMV对比", data: { Today: "4990116", Yesterday: "4088200" } },
    { desc: "会员数", data: { Count: "174929" } },
    { desc: "活跃端口对比", data: { Today: "2464", Yesterday: "2634" } },
    { desc: "曲线图订单量", data: { When: "18", Count: "1550" } },
    { desc: "曲线图订单均价", data: { When: "18", Count: "2542" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "568465",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "歌奈闪充数据线TPC",
          When: "22:22:37"
        },
        {
          Id: "568464",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "歌奈智能充电器",
          When: "22:22:37",
          __new: true
        },
        {
          Id: "568463",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "手机支架",
          When: "22:22:37",
          __new: true
        },
        {
          Id: "122596",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:30:35",
          __new: true
        },
        {
          Id: "122595",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:28:13",
          __new: true
        },
        {
          Id: "122594",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "三星A9S A9200(6+128G)柠沁蓝",
          When: "18:07:25",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1578", Yesterday: "1550" } },
    { desc: "GMV对比", data: { Today: "5150104", Yesterday: "4990116" } },
    { desc: "会员数", data: { Count: "175653" } },
    { desc: "活跃端口对比", data: { Today: "2476", Yesterday: "2464" } },
    { desc: "曲线图订单量", data: { When: "19", Count: "1578" } },
    { desc: "曲线图订单均价", data: { When: "19", Count: "2547" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "570469",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "OPPO A7X 4+128G 冰焰蓝",
          When: "23:28:05"
        },
        {
          Id: "570468",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵1A头",
          When: "21:53:57",
          __new: true
        },
        {
          Id: "570467",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "6D钢化膜",
          When: "21:53:41",
          __new: true
        },
        {
          Id: "123177",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 紫色",
          When: "18:54:03",
          __new: true
        },
        {
          Id: "123176",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 红色",
          When: "18:54:03",
          __new: true
        },
        {
          Id: "123175",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 幻影蓝色",
          When: "18:54:03",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1598", Yesterday: "1578" } },
    { desc: "GMV对比", data: { Today: "7646828", Yesterday: "5150104" } },
    { desc: "会员数", data: { Count: "176428" } },
    { desc: "活跃端口对比", data: { Today: "2556", Yesterday: "2476" } },
    { desc: "曲线图订单量", data: { When: "20", Count: "1598" } },
    { desc: "曲线图订单均价", data: { When: "20", Count: "2417" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "572415",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "厂家礼包",
          When: "22:47:08"
        },
        {
          Id: "572414",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为雨伞",
          When: "22:47:08",
          __new: true
        },
        {
          Id: "572413",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为MATE20Pro钢化屏保(曲面软膜)",
          When: "22:47:08",
          __new: true
        },
        {
          Id: "123660",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:04:14",
          __new: true
        },
        {
          Id: "123659",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:04:14",
          __new: true
        },
        {
          Id: "123658",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "屏碎险",
          When: "18:04:12",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1567", Yesterday: "1598" } },
    { desc: "GMV对比", data: { Today: "6736128", Yesterday: "7646828" } },
    { desc: "会员数", data: { Count: "177141" } },
    { desc: "活跃端口对比", data: { Today: "2510", Yesterday: "2556" } },
    { desc: "曲线图订单量", data: { When: "21", Count: "1567" } },
    { desc: "曲线图订单均价", data: { When: "21", Count: "2779" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "574502",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "vivo x23 8+128 幻夜蓝",
          When: "21:42:22"
        },
        {
          Id: "574501",
          Province: "河南省",
          City: "商丘市",
          District: "永城市",
          What: "荣耀9I",
          When: "21:32:27",
          __new: true
        },
        {
          Id: "574482",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "比利碗套装",
          When: "21:30:59",
          __new: true
        },
        {
          Id: "124392",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "OPPO A7X全网通紫色4+128G",
          When: "20:36:32",
          __new: true
        },
        {
          Id: "124391",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "OPPO A5全网通蓝色4+64G",
          When: "20:36:03",
          __new: true
        },
        {
          Id: "124389",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影蓝/1充线说明保卡",
          When: "20:12:59",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1882", Yesterday: "1567" } },
    { desc: "GMV对比", data: { Today: "4311587", Yesterday: "6736128" } },
    { desc: "会员数", data: { Count: "178052" } },
    { desc: "活跃端口对比", data: { Today: "2982", Yesterday: "2510" } },
    { desc: "曲线图订单量", data: { When: "22", Count: "1882" } },
    { desc: "曲线图订单均价", data: { When: "22", Count: "2999" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "577209",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "原机原串合约卡（毛利）",
          When: "23:57:08"
        },
        {
          Id: "577208",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为mate20 6+64极光色",
          When: "23:37:42",
          __new: true
        },
        {
          Id: "577207",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为P20PRO 6+128珠光贝母",
          When: "23:37:25",
          __new: true
        },
        {
          Id: "124688",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为P20(EML-AL00)6+64G极光闪蝶",
          When: "18:09:57",
          __new: true
        },
        {
          Id: "124687",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "VIVO Z3i（6+128G）千禧粉",
          When: "18:09:03",
          __new: true
        },
        {
          Id: "124686",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "VIVO Y97(4+128G)梦幻粉",
          When: "18:09:03",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1908", Yesterday: "1882" } },
    { desc: "GMV对比", data: { Today: "3652576", Yesterday: "4311587" } },
    { desc: "会员数", data: { Count: "178993" } },
    { desc: "活跃端口对比", data: { Today: "2960", Yesterday: "2982" } },
    { desc: "曲线图订单量", data: { When: "23", Count: "1908" } },
    { desc: "曲线图订单均价", data: { When: "23", Count: "3129" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "580027",
          Province: "河南省",
          City: "驻马店市",
          District: "汝南县",
          What: "oppoA5幻镜蓝3+64",
          When: "22:05:49"
        },
        {
          Id: "580026",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "VIVONEX 钢化屏保(丝印)",
          When: "21:34:13",
          __new: true
        },
        {
          Id: "580025",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "荣耀畅玩7 2+16 金色",
          When: "21:28:34",
          __new: true
        },
        {
          Id: "125009",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:43:12",
          __new: true
        },
        {
          Id: "125008",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:41:49",
          __new: true
        },
        {
          Id: "125007",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "18:41:43",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1944", Yesterday: "1908" } },
    { desc: "GMV对比", data: { Today: "5031820", Yesterday: "3652576" } },
    { desc: "会员数", data: { Count: "179833" } },
    { desc: "活跃端口对比", data: { Today: "3028", Yesterday: "2960" } },
    { desc: "曲线图订单量", data: { When: "24", Count: "1944" } },
    { desc: "曲线图订单均价", data: { When: "24", Count: "2987" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "582633",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "公牛U112车充",
          When: "22:25:41"
        },
        {
          Id: "582632",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "卓品J01手机支架",
          When: "22:25:41",
          __new: true
        },
        {
          Id: "582631",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "乔梦堂D1项圈磁吸运动耳机",
          When: "22:11:36",
          __new: true
        },
        {
          Id: "125426",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:23:37",
          __new: true
        },
        {
          Id: "125424",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:27:55",
          __new: true
        },
        {
          Id: "125423",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:27:55",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1811", Yesterday: "1944" } },
    { desc: "GMV对比", data: { Today: "4416133", Yesterday: "5031820" } },
    { desc: "会员数", data: { Count: "180668" } },
    { desc: "活跃端口对比", data: { Today: "3014", Yesterday: "3028" } },
    { desc: "曲线图订单量", data: { When: "25", Count: "1811" } },
    { desc: "曲线图订单均价", data: { When: "25", Count: "2748" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "585013",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "VIVO X23 8+128 幻影蓝",
          When: "22:18:45"
        },
        {
          Id: "585012",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "钢化膜",
          When: "22:09:16",
          __new: true
        },
        {
          Id: "585011",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "A类数据线（700006）",
          When: "21:55:29",
          __new: true
        },
        {
          Id: "125794",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:24:06",
          __new: true
        },
        {
          Id: "125793",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "18:38:20",
          __new: true
        },
        {
          Id: "125792",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为GSM手机Mate10 Pro(BLA-AL00)128G摩卡金",
          When: "18:19:01",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1791", Yesterday: "1811" } },
    { desc: "GMV对比", data: { Today: "9480859", Yesterday: "4416133" } },
    { desc: "会员数", data: { Count: "181460" } },
    { desc: "活跃端口对比", data: { Today: "2906", Yesterday: "3014" } },
    { desc: "曲线图订单量", data: { When: "26", Count: "1791" } },
    { desc: "曲线图订单均价", data: { When: "26", Count: "2927" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "587371",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "抽纸(高档)",
          When: "21:51:35"
        },
        {
          Id: "587370",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为畅享9 全网 4+64G",
          When: "21:51:35",
          __new: true
        },
        {
          Id: "587369",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "歌奈闪充数据线TPC",
          When: "21:50:23",
          __new: true
        },
        {
          Id: "126387",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 黑色",
          When: "18:19:34",
          __new: true
        },
        {
          Id: "126386",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 蓝色",
          When: "18:19:34",
          __new: true
        },
        {
          Id: "126385",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 红色",
          When: "18:19:34",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1722", Yesterday: "1791" } },
    { desc: "GMV对比", data: { Today: "13103158", Yesterday: "9480859" } },
    { desc: "会员数", data: { Count: "182800" } },
    { desc: "活跃端口对比", data: { Today: "2902", Yesterday: "2906" } },
    { desc: "曲线图订单量", data: { When: "27", Count: "1722" } },
    { desc: "曲线图订单均价", data: { When: "27", Count: "2979" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "589805",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "OPPO R17 8+128 流光蓝",
          When: "22:20:32"
        },
        {
          Id: "589804",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "手机壳",
          When: "22:20:32",
          __new: true
        },
        {
          Id: "589803",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "不锈钢保温壶",
          When: "22:20:32",
          __new: true
        },
        {
          Id: "126960",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻夜黑/1充线说明保卡",
          When: "19:21:48",
          __new: true
        },
        {
          Id: "126959",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影蓝/1充线说明保卡",
          When: "19:21:48",
          __new: true
        },
        {
          Id: "126958",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影紫/1充线说明保卡",
          When: "19:21:48",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1710", Yesterday: "1722" } },
    { desc: "GMV对比", data: { Today: "4642097", Yesterday: "13103158" } },
    { desc: "会员数", data: { Count: "183586" } },
    { desc: "活跃端口对比", data: { Today: "2702", Yesterday: "2902" } },
    { desc: "曲线图订单量", data: { When: "28", Count: "1710" } },
    { desc: "曲线图订单均价", data: { When: "28", Count: "2775" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "592039",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "畅享9Plus 4+128g",
          When: "22:55:16"
        },
        {
          Id: "592038",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "畅享9 4+64G",
          When: "22:54:36",
          __new: true
        },
        {
          Id: "592037",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "华为nova 2S全网通6+128G银钻灰",
          When: "22:06:34",
          __new: true
        },
        {
          Id: "127502",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影蓝/1充线说明保卡",
          When: "19:44:30",
          __new: true
        },
        {
          Id: "127501",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 黑色",
          When: "19:44:30",
          __new: true
        },
        {
          Id: "127500",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀 ：JSN－AL00 （8X） 6+128 蓝色",
          When: "19:44:30",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2381", Yesterday: "1710" } },
    { desc: "GMV对比", data: { Today: "8169548", Yesterday: "4642097" } },
    { desc: "会员数", data: { Count: "184639" } },
    { desc: "活跃端口对比", data: { Today: "2994", Yesterday: "2702" } },
    { desc: "曲线图订单量", data: { When: "29", Count: "2381" } },
    { desc: "曲线图订单均价", data: { When: "29", Count: "4369" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "595565",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "方锅",
          When: "22:10:06"
        },
        {
          Id: "595564",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "保温杯",
          When: "22:10:06",
          __new: true
        },
        {
          Id: "595563",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为NOVA3i全网通6+64g",
          When: "22:10:06",
          __new: true
        },
        {
          Id: "128366",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "21:03:42",
          __new: true
        },
        {
          Id: "128365",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:17:29",
          __new: true
        },
        {
          Id: "128364",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:10:25",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "3004", Yesterday: "2381" } },
    { desc: "GMV对比", data: { Today: "8480138", Yesterday: "8169548" } },
    { desc: "会员数", data: { Count: "185934" } },
    { desc: "活跃端口对比", data: { Today: "3362", Yesterday: "2994" } },
    { desc: "曲线图订单量", data: { When: "30", Count: "3004" } },
    { desc: "曲线图订单均价", data: { When: "30", Count: "5150" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "600211",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "华为畅享平板AGS2-W09(4＋64G)香槟金",
          When: "23:59:56"
        },
        {
          Id: "600210",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "华为畅享平板AGS2-W09(4＋64G)香槟金",
          When: "23:59:39",
          __new: true
        },
        {
          Id: "600209",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "华为畅享9(4+64G)全网幻夜黑",
          When: "23:59:12",
          __new: true
        },
        {
          Id: "129008",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星399",
          When: "20:18:32",
          __new: true
        },
        {
          Id: "129007",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:50:14",
          __new: true
        },
        {
          Id: "128981",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "海韵京太P13 10000mAh充电宝",
          When: "18:48:06",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "3612", Yesterday: "3004" } },
    { desc: "GMV对比", data: { Today: "10507925", Yesterday: "8480138" } },
    { desc: "会员数", data: { Count: "187573" } },
    { desc: "活跃端口对比", data: { Today: "4030", Yesterday: "3362" } },
    { desc: "曲线图订单量", data: { When: "31", Count: "3612" } },
    { desc: "曲线图订单均价", data: { When: "31", Count: "6978" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "605634",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "苹果8 PLUS- 64G灰",
          When: "23:05:04"
        },
        {
          Id: "605633",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小米电视4S 55英寸",
          When: "22:43:35",
          __new: true
        },
        {
          Id: "605632",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "华为P20 Pro全网通6+128G极光色",
          When: "22:40:16",
          __new: true
        },
        {
          Id: "130796",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为MATE20PROUD 8+128 极光",
          When: "22:03:40",
          __new: true
        },
        {
          Id: "130795",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为MATE20PRO 6+128 蓝",
          When: "22:03:40",
          __new: true
        },
        {
          Id: "130794",
          Province: "河南省",
          City: "平顶山市",
          District: "汝州市",
          What: "华为MATE20 6+64 翡冷翠",
          When: "22:03:40",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "3432", Yesterday: "3612" } },
    { desc: "GMV对比", data: { Today: "10073594", Yesterday: "10507925" } },
    { desc: "会员数", data: { Count: "189425" } },
    { desc: "活跃端口对比", data: { Today: "3940", Yesterday: "4030" } },
    { desc: "曲线图订单量", data: { When: "1", Count: "3432" } },
    { desc: "曲线图订单均价", data: { When: "1", Count: "7213" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "611455",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "公牛安卓1M线",
          When: "21:57:09"
        },
        {
          Id: "611454",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "不锈钢保温壶",
          When: "21:56:44",
          __new: true
        },
        {
          Id: "611453",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "不锈钢保温壶",
          When: "21:56:44",
          __new: true
        },
        {
          Id: "132780",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "21:10:45",
          __new: true
        },
        {
          Id: "132779",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:55:40",
          __new: true
        },
        {
          Id: "132778",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:12:08",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2750", Yesterday: "3432" } },
    { desc: "GMV对比", data: { Today: "11732507", Yesterday: "10073594" } },
    { desc: "会员数", data: { Count: "190726" } },
    { desc: "活跃端口对比", data: { Today: "3518", Yesterday: "3940" } },
    { desc: "曲线图订单量", data: { When: "2", Count: "2750" } },
    { desc: "曲线图订单均价", data: { When: "2", Count: "4557" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "615431",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "荣耀畅玩7X(4+64G)全网蓝",
          When: "22:45:08"
        },
        {
          Id: "615430",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "荣耀畅玩7X(4+64G)全网金",
          When: "22:44:56",
          __new: true
        },
        {
          Id: "615429",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "华为Mate20(6+128G)全网翡冷翠",
          When: "22:44:52",
          __new: true
        },
        {
          Id: "133404",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:07:39",
          __new: true
        },
        {
          Id: "133403",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:03:27",
          __new: true
        },
        {
          Id: "133402",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:01:20",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2453", Yesterday: "2750" } },
    { desc: "GMV对比", data: { Today: "12791187", Yesterday: "11732507" } },
    { desc: "会员数", data: { Count: "191834" } },
    { desc: "活跃端口对比", data: { Today: "3620", Yesterday: "3518" } },
    { desc: "曲线图订单量", data: { When: "3", Count: "2453" } },
    { desc: "曲线图订单均价", data: { When: "3", Count: "4110" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "618702",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "浮雕手机壳",
          When: "22:52:14"
        },
        {
          Id: "618701",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "X23幻彩版 北极晨曦6+128",
          When: "22:52:14",
          __new: true
        },
        {
          Id: "618700",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "尼龙绳二合一数据线 ",
          When: "22:51:32",
          __new: true
        },
        {
          Id: "134296",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:01:04",
          __new: true
        },
        {
          Id: "134294",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影紫/1充线说明保卡",
          When: "18:36:41",
          __new: true
        },
        {
          Id: "134293",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀:COL-AL10(10全网通尊享版）6GB+128GB /铃兰白/1充线说明保卡",
          When: "18:36:41",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2322", Yesterday: "2453" } },
    { desc: "GMV对比", data: { Today: "11666728", Yesterday: "12791187" } },
    { desc: "会员数", data: { Count: "192839" } },
    { desc: "活跃端口对比", data: { Today: "3420", Yesterday: "3620" } },
    { desc: "曲线图订单量", data: { When: "4", Count: "2322" } },
    { desc: "曲线图订单均价", data: { When: "4", Count: "4283" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "622058",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "保温壶",
          When: "22:57:03"
        },
        {
          Id: "622057",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "汰渍皂粉",
          When: "22:38:21",
          __new: true
        },
        {
          Id: "622052",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "毛绒玩具（大）",
          When: "22:31:12",
          __new: true
        },
        {
          Id: "135264",
          Province: "河南省",
          City: "周口市",
          District: "项城市",
          What: "钢化膜",
          When: "19:03:28",
          __new: true
        },
        {
          Id: "135261",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:47:56",
          __new: true
        },
        {
          Id: "135260",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "BKK-AL00(8C全网4+64G)",
          When: "18:47:56",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2658", Yesterday: "2322" } },
    { desc: "GMV对比", data: { Today: "9034331", Yesterday: "11666728" } },
    { desc: "会员数", data: { Count: "194021" } },
    { desc: "活跃端口对比", data: { Today: "3548", Yesterday: "3420" } },
    { desc: "曲线图订单量", data: { When: "5", Count: "2658" } },
    { desc: "曲线图订单均价", data: { When: "5", Count: "4217" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "625516",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "华为P10原装线",
          When: "22:30:31"
        },
        {
          Id: "625515",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "网红充电宝",
          When: "22:01:37",
          __new: true
        },
        {
          Id: "625514",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "港韵安卓线",
          When: "21:59:28",
          __new: true
        },
        {
          Id: "136038",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星399",
          When: "20:16:55",
          __new: true
        },
        {
          Id: "136037",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "19:49:53",
          __new: true
        },
        {
          Id: "136033",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What: "荣耀:COL-AL10(10全网通尊享版）6GB+128GB /铃兰白/1充线说明保卡",
          When: "18:36:28",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2565", Yesterday: "2658" } },
    { desc: "GMV对比", data: { Today: "10500602", Yesterday: "9034331" } },
    { desc: "会员数", data: { Count: "195259" } },
    { desc: "活跃端口对比", data: { Today: "3486", Yesterday: "3548" } },
    { desc: "曲线图订单量", data: { When: "6", Count: "2565" } },
    { desc: "曲线图订单均价", data: { When: "6", Count: "4705" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "629361",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "小天才 Z1y 蓝色",
          When: "21:46:18"
        },
        {
          Id: "629360",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "钢化膜",
          When: "21:42:05",
          __new: true
        },
        {
          Id: "629359",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "华为 麦芒7 6+64 金",
          When: "21:34:13",
          __new: true
        },
        {
          Id: "136910",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星299",
          When: "20:20:18",
          __new: true
        },
        {
          Id: "136909",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:33:18",
          __new: true
        },
        {
          Id: "136908",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:32:53",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2182", Yesterday: "2565" } },
    { desc: "GMV对比", data: { Today: "7221358", Yesterday: "10500602" } },
    { desc: "会员数", data: { Count: "196200" } },
    { desc: "活跃端口对比", data: { Today: "3430", Yesterday: "3486" } },
    { desc: "曲线图订单量", data: { When: "7", Count: "2182" } },
    { desc: "曲线图订单均价", data: { When: "7", Count: "3436" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "632061",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "华为畅享8PLUS 全网 4+64G",
          When: "21:53:33"
        },
        {
          Id: "632060",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "云仕C100小怪兽耳机",
          When: "21:53:33",
          __new: true
        },
        {
          Id: "632059",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "卓品充电器套装(苹果)",
          When: "21:53:33",
          __new: true
        },
        {
          Id: "137666",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "华为Mate10PRO(6＋64G)蓝",
          When: "18:50:02",
          __new: true
        },
        {
          Id: "137665",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "华为Mate10PRO(6＋128G)蓝",
          When: "18:50:02",
          __new: true
        },
        {
          Id: "137664",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "华为Mate10PRO(6＋128G)灰",
          When: "18:50:02",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2121", Yesterday: "2182" } },
    { desc: "GMV对比", data: { Today: "6936081", Yesterday: "7221358" } },
    { desc: "会员数", data: { Count: "197098" } },
    { desc: "活跃端口对比", data: { Today: "3324", Yesterday: "3430" } },
    { desc: "曲线图订单量", data: { When: "8", Count: "2121" } },
    { desc: "曲线图订单均价", data: { When: "8", Count: "3801" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "634958",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星299会员卡",
          When: "21:59:50"
        },
        {
          Id: "634957",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "海韵4.8A车充",
          When: "21:40:22",
          __new: true
        },
        {
          Id: "634953",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "VIVO X23 8+128 幻夜蓝",
          When: "21:40:02",
          __new: true
        },
        {
          Id: "138597",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星299",
          When: "22:01:36",
          __new: true
        },
        {
          Id: "138596",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:23:39",
          __new: true
        },
        {
          Id: "138593",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "JSN-AL00(8X全网6+128G)",
          When: "18:02:13",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1803", Yesterday: "2121" } },
    { desc: "GMV对比", data: { Today: "8564575", Yesterday: "6936081" } },
    { desc: "会员数", data: { Count: "197875" } },
    { desc: "活跃端口对比", data: { Today: "3362", Yesterday: "3324" } },
    { desc: "曲线图订单量", data: { When: "9", Count: "1803" } },
    { desc: "曲线图订单均价", data: { When: "9", Count: "3265" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "637319",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "VIVO NEX 屏幕指纹版 8+128 宝石红",
          When: "21:14:20"
        },
        {
          Id: "637318",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "储物箱",
          When: "21:14:20",
          __new: true
        },
        {
          Id: "637317",
          Province: "河南省",
          City: "商丘市",
          District: "永城市",
          What: "25全包钢化膜",
          When: "21:14:03",
          __new: true
        },
        {
          Id: "139518",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影紫/1充线说明保卡",
          When: "18:28:25",
          __new: true
        },
        {
          Id: "139517",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "10026电水壶(清华紫光美菱)",
          When: "18:09:56",
          __new: true
        },
        {
          Id: "139514",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "TNY-AL00(Magic2全网8+128高配版)",
          When: "18:06:03",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2150", Yesterday: "1803" } },
    { desc: "GMV对比", data: { Today: "12628983", Yesterday: "8564575" } },
    { desc: "会员数", data: { Count: "207713" } },
    { desc: "活跃端口对比", data: { Today: "3696", Yesterday: "3362" } },
    { desc: "曲线图订单量", data: { When: "10", Count: "2150" } },
    { desc: "曲线图订单均价", data: { When: "10", Count: "3567" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "640347",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "OPPO A5 4+64 幻境蓝",
          When: "21:44:29"
        },
        {
          Id: "640346",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "OPPO A7X 4+128 雾松青",
          When: "21:42:34",
          __new: true
        },
        {
          Id: "640344",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "钢化膜",
          When: "21:41:27",
          __new: true
        },
        {
          Id: "140076",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星199",
          When: "19:16:43",
          __new: true
        },
        {
          Id: "140074",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影蓝/1充线说明保卡",
          When: "19:12:46",
          __new: true
        },
        {
          Id: "140073",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影紫/1充线说明保卡",
          When: "19:12:46",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2268", Yesterday: "2150" } },
    { desc: "GMV对比", data: { Today: "8206171", Yesterday: "12628983" } },
    { desc: "会员数", data: { Count: "208896" } },
    { desc: "活跃端口对比", data: { Today: "3784", Yesterday: "3696" } },
    { desc: "曲线图订单量", data: { When: "11", Count: "2268" } },
    { desc: "曲线图订单均价", data: { When: "11", Count: "4395" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "644206",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "华为 P20 6+128 黑",
          When: "22:09:21"
        },
        {
          Id: "644205",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "钢化膜",
          When: "22:09:21",
          __new: true
        },
        {
          Id: "644204",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "手机壳",
          When: "22:09:21",
          __new: true
        },
        {
          Id: "140682",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "20:47:01",
          __new: true
        },
        {
          Id: "140680",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "伊利小白袋(16袋)提",
          When: "18:15:29",
          __new: true
        },
        {
          Id: "140679",
          Province: "河南省",
          City: "新乡市",
          District: "红旗区",
          What: "牧场酸奶(12袋)提",
          When: "18:15:29",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2665", Yesterday: "2268" } },
    { desc: "GMV对比", data: { Today: "8738023", Yesterday: "8206171" } },
    { desc: "会员数", data: { Count: "210202" } },
    { desc: "活跃端口对比", data: { Today: "3898", Yesterday: "3784" } },
    { desc: "曲线图订单量", data: { When: "12", Count: "2665" } },
    { desc: "曲线图订单均价", data: { When: "12", Count: "4376" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "648034",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "汰渍皂粉",
          When: "22:27:32"
        },
        {
          Id: "648033",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "荣耀PLAY钢化屏保",
          When: "22:20:26",
          __new: true
        },
        {
          Id: "648032",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "歌奈闪充数据线苹果",
          When: "22:20:26",
          __new: true
        },
        {
          Id: "141258",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "洗洁精",
          When: "21:17:56",
          __new: true
        },
        {
          Id: "141257",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "布丁壳",
          When: "21:17:56",
          __new: true
        },
        {
          Id: "141256",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "普通钢化膜",
          When: "21:17:56",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2310", Yesterday: "2665" } },
    { desc: "GMV对比", data: { Today: "34363266", Yesterday: "8738023" } },
    { desc: "会员数", data: { Count: "211337" } },
    { desc: "活跃端口对比", data: { Today: "3118", Yesterday: "3898" } },
    { desc: "曲线图订单量", data: { When: "13", Count: "2310" } },
    { desc: "曲线图订单均价", data: { When: "13", Count: "3727" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "651508",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "华为nova3i全网通4+128G亮黑",
          When: "23:09:22"
        },
        {
          Id: "651507",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "净化器",
          When: "23:09:22",
          __new: true
        },
        {
          Id: "651506",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "万利达水壶",
          When: "23:09:22",
          __new: true
        },
        {
          Id: "141520",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "红钻大礼包",
          When: "19:03:36",
          __new: true
        },
        {
          Id: "141519",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星499",
          When: "18:56:47",
          __new: true
        },
        {
          Id: "141518",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "荣耀GSM手机荣耀10（6+128G)灰",
          When: "18:50:59",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1968", Yesterday: "2310" } },
    { desc: "GMV对比", data: { Today: "5500165", Yesterday: "34363266" } },
    { desc: "会员数", data: { Count: "212279" } },
    { desc: "活跃端口对比", data: { Today: "3132", Yesterday: "3118" } },
    { desc: "曲线图订单量", data: { When: "14", Count: "1968" } },
    { desc: "曲线图订单均价", data: { When: "14", Count: "3389" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "654419",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "机乐堂JM225 苹果I8 <5.5> 钢化",
          When: "22:31:30"
        },
        {
          Id: "654418",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "机乐堂D4/Y1 蓝牙耳机",
          When: "22:31:30",
          __new: true
        },
        {
          Id: "654414",
          Province: "河南省",
          City: "郑州市",
          District: "金水区",
          What: "y93s",
          When: "21:55:50",
          __new: true
        },
        {
          Id: "142021",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星399",
          When: "20:42:21",
          __new: true
        },
        {
          Id: "142020",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "免费贴膜",
          When: "19:11:34",
          __new: true
        },
        {
          Id: "142019",
          Province: "河南省",
          City: "郑州市",
          District: "新密市",
          What: "免费贴膜",
          When: "19:05:58",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2188", Yesterday: "1968" } },
    { desc: "GMV对比", data: { Today: "7451446", Yesterday: "5500165" } },
    { desc: "会员数", data: { Count: "213282" } },
    { desc: "活跃端口对比", data: { Today: "3100", Yesterday: "3132" } },
    { desc: "曲线图订单量", data: { When: "15", Count: "2188" } },
    { desc: "曲线图订单均价", data: { When: "15", Count: "3641" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "657453",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "补卡费",
          When: "21:46:59"
        },
        {
          Id: "657446",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "钢化膜",
          When: "21:42:32",
          __new: true
        },
        {
          Id: "657445",
          Province: "河南省",
          City: "郑州市",
          District: "二七区",
          What: "钢化膜",
          When: "21:42:32",
          __new: true
        },
        {
          Id: "142631",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "小福星399",
          When: "19:50:54",
          __new: true
        },
        {
          Id: "142630",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "全屏柔性防爆膜",
          When: "19:43:14",
          __new: true
        },
        {
          Id: "142629",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "全屏柔性防爆膜",
          When: "19:42:37",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "2217", Yesterday: "2188" } },
    { desc: "GMV对比", data: { Today: "10798707", Yesterday: "7451446" } },
    { desc: "会员数", data: { Count: "214279" } },
    { desc: "活跃端口对比", data: { Today: "3242", Yesterday: "3100" } },
    { desc: "曲线图订单量", data: { When: "16", Count: "2217" } },
    { desc: "曲线图订单均价", data: { When: "16", Count: "3938" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "660758",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "儿童定位手表",
          When: "21:47:13"
        },
        {
          Id: "660757",
          Province: "河南省",
          City: "郑州市",
          District: "中牟县",
          What: "保温壶",
          When: "21:41:19",
          __new: true
        },
        {
          Id: "660753",
          Province: "河南省",
          City: "郑州市",
          District: "中原区",
          What: "华为NOVA3I亮黑全网6+128",
          When: "21:40:17",
          __new: true
        },
        {
          Id: "143264",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影蓝/1充线说明保卡",
          When: "18:34:39",
          __new: true
        },
        {
          Id: "143263",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻夜黑/1充线说明保卡",
          When: "18:34:39",
          __new: true
        },
        {
          Id: "143262",
          Province: "陕西省",
          City: "西安市",
          District: "新城区",
          What:
            "荣耀:COL-AL10(10全网通尊享版）/ 6GB+128GB 幻影紫/1充线说明保卡",
          When: "18:34:39",
          __new: true
        }
      ]
    }
  ],
  [
    { desc: "订单量对比", data: { Today: "1192", Yesterday: "2217" } },
    { desc: "GMV对比", data: { Today: "3952009", Yesterday: "10798707" } },
    { desc: "会员数", data: { Count: "214904" } },
    { desc: "活跃端口对比", data: { Today: "2618", Yesterday: "3242" } },
    { desc: "曲线图订单量", data: { When: "17", Count: "1192" } },
    { desc: "曲线图订单均价", data: { When: "17", Count: "2093" } },
    {
      desc: "每天及时成交",
      data: [
        {
          Id: "662493",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "炒锅",
          When: "16:44:31"
        },
        {
          Id: "662492",
          Province: "河南省",
          City: "平顶山市",
          District: "新华区",
          What: "华为NOVA3 6+128蓝楹紫",
          When: "16:44:31",
          __new: true
        },
        {
          Id: "662491",
          Province: "河南省",
          City: "周口市",
          District: "淮阳县",
          What: "华为麦芒7全网通6+64G亮黑",
          When: "16:43:55",
          __new: true
        },
        {
          Id: "143630",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "COL-AL10(10全网6+128G)",
          When: "16:42:59",
          __new: true
        },
        {
          Id: "143628",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "努比亚N3清水套+贴膜",
          When: "16:42:53",
          __new: true
        },
        {
          Id: "143627",
          Province: "河南省",
          City: "郑州市",
          District: "管城回族区",
          What: "nubia N3黑金",
          When: "16:42:53",
          __new: true
        }
      ]
    }
  ]
]
import Round from "@/components/Rounda"
import Today from "@/components/Todaya"
import History from "@/components/History"
import Sales from "@/components/Sales3"
import { format, addDays } from "date-fns"
export default {
  components: {
    Today,
    History,
    Sales,
    Round
  },
  data() {
    const start = format(addDays(new Date(), -100), "YYYY-MM-DD")
    const end = format(new Date(), "YYYY-MM-DD")
    return {
      preDays: 100,
      start,
      end,
      dateArr: [],

      RptOrders: {
        //订单量
        x: [],
        y: [],
        y1: []
      },
      RecentOrders: [], //成交历史
      StatisTodayAndYesterday: {
        //今日数据
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
      now: new Date() - 0,
      timer: null,
      DATA: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.dateArr = this.getDaysList()
      this.getData()
      // this.getStaticData()
    }, 0)
  },
  methods: {
    onOk() {
      this.$refs.sales.reset()
      this.RptOrders = {
        //订单量
        x: [],
        y: [],
        y1: []
      }
      this.DATA = []
      this.start = format(addDays(new Date(), this.preDays * -1), "YYYY-MM-DD")
      this.dateArr = this.getDaysList()
      this.getData()
    },
    getStaticData(i) {
      let len = ddd.length
      this.timer = setTimeout(() => {
        let data = ddd[i || 0]
        if (data) {
          this.DATA.push(data)
          if (i == 100) {
            // console.log(this.DATA)
          }
        }
        //曲线图
        this.RptOrders = {
          x: this.dateArr,
          y: +data[4].data.Count,
          y1: +data[5].data.Count
        }
        i = i ? ++i : 1
        if (i > this.dateArr.length) {
          clearTimeout(this.timer)
          return Promise.reject()
        }

        //今日数据
        this.StatisTodayAndYesterday.GMV = data[1].data
        this.StatisTodayAndYesterday.OnlineUser = data[3].data
        this.StatisTodayAndYesterday.Order = data[0].data
        this.StatisVIPUsers = +data[2].data.Count

        //历史成交
        this.RecentOrders = data[6].data.slice(1)
        i = i ? i : 1
        this.getStaticData(i)
      }, 10)
    },
    getData(i) {
      this.$post("api/MicroData/Tmp", {
        dt: this.dateArr[i || 0]
      }).then(data => {
        if (data.length) {
          this.DATA.push(data)
          // if (i == 100) {
          //   console.log(this.DATA)
          // }
        }
        //曲线图
        this.RptOrders = {
          x: this.dateArr,
          y: +data[4].data.Count,
          y1: +data[5].data.Count
        }
        i = i ? ++i : 1
        if (i > this.dateArr.length) {
          clearTimeout(this.timer)
          return Promise.reject()
        }
        this.timer = setTimeout(() => {
          this.getData(i)
        }, 10)

        //今日数据
        this.StatisTodayAndYesterday.GMV = data[1].data
        this.StatisTodayAndYesterday.OnlineUser = data[3].data
        this.StatisTodayAndYesterday.Order = data[0].data
        this.StatisVIPUsers = +data[2].data.Count

        //历史成交
        this.RecentOrders = data[6].data.slice(1)
      })
    },
    getDaysList() {
      // let arr = [this.start]
      // let start = new Date(this.start) - 0
      // const end = new Date(this.end) - 0
      // while (start <= end) {
      //   start = start + 24 * 60 * 60 * 1000
      //   arr.push(format(start,'YYYY-MM-DD'))
      // }
      let arr = []
      let preDays = +this.preDays
      for(let d=preDays;d>0;d--) {
        arr.push(format(addDays(new Date - 0, d*-1),'YYYY-MM-DD'))
      }
      return arr
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
      margin-left: 20px;
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
  margin-right: 5px;
  background-color: #cf35d7;
  display: inline-block;
}
.days {
  width: 50px;
}
</style>
