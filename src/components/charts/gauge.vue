<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme1
import { debounce } from "@/utils";

const animationDuration = 3000;

export default {
  props: {
    receiveData: {
      type: Object,
      default: {
        A: 12,

        id: "143660303",
        text: " 测试数据",
        title: "$660301"
      }
    },
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
      default: "300px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    // 初始化
    this.initChart();
    // 自适应屏幕大小
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      var Data = this.receiveData;
      this.chart = echarts.init(this.$el, "macarons");
      // 设置标题
      this.chart.setOption({
        title: {
          text: Data.text,
          top: 18,
          left: "6%",
          right: "6%"
        },

        // 工具
        toolbox: {
          show: true,
          right: 20,
          feature: {
            //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
            saveAsImage: {
              show: true
            }
          }
        },

        series: [
          {
            name: "销量",
            type: "gauge",
            radius: "65%",
            // 刻度间隔
            splitNumber: 5,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10,
                // 外圈线的颜色
                color: [
                  [0.25, "#F04864"],
                  [0.5, "#FACC14"],
                  [0.75, "#13C2C2"],
                  [1, "#2FC25B"]
                ]
              }
            },
            splitLine: {
              // 是否显示刻度线
              show: false
            },
            axisTick: {
              // 坐标轴小标记

              length: 1 // 属性length控制线长
            },
            // 是否显示标签
            axisLabel: {
              show: false
            },
            pointer: {
              length: "70%",
              width: 9
            },
            detail: {
              formatter: "{value}%"
            },
            data: [Data["A"] * 100],
            animationDuration
          }
        ]
      });
    }
  }
};
</script>