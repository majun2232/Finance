<template>
    <div :class="className" :style="{height:height,width:width}"/>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
export default {
  name: "Radartest1",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      //   var data = genData();
      //   console.log(data);

      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        title: {
          text: "基础雷达图",
          top: 18,
          left: "6%"
        },
        tooltip: {},
        legend: {
          data: ["预算分配", "实际开销"]
        },
        radar: {
          //   shape: "circle",
          center: ["50%", "55%"],
          //   雷达大小
          radius: "70%",
          name: {
            textStyle: {
              color: "#fff",
              //   fontWeight: "bold",
              backgroundColor: "#1890ff",
              //   fontStyle: "italic",
              borderRadius: 3,
              padding: [5, 5]
            }
          },

          indicator: [
            { name: "销售", max: 6500 },
            { name: "管理", max: 16000 },
            { name: "信息技术", max: 30000 },
            { name: "客服", max: 38000 },
            { name: "研发", max: 52000 },
            { name: "市场", max: 25000 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销"
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>