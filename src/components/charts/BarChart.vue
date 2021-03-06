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
        B: 12,
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
        //提示框，鼠标悬浮交互时的信息提示
        tooltip: {
          trigger: "axis",
          backgroundColor: "#fff",
          textStyle: {
            color: "#000"
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        //  位置
        grid: {
          top: 60,
          left: "6%",
          right: "6%",
          bottom: "8%",
          backgroundColor: "#666",
          containLabel: true
        },
        // 工具
        toolbox: {
          show: true,
          feature: {
            //辅助线标志
            mark: {
              show: true
            },
            //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能
            dataView: {
              show: true,
              readOnly: false
            },
            //动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            //restore，还原，复位原始图表
            restore: {
              show: true
            },
            //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
            saveAsImage: {
              show: true
            }
          }
        },
        //是否启用拖拽重计算特性，默认关闭(即值为false)
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["A", "B"],
            // 坐标轴刻度相关设置。
            axisTick: {
              // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。如下图：
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: true
            }
          }
        ],
        series: [
          {
            name: "销量",
            type: "bar",
            stack: "vistors",
            barWidth: "35%",
            data: [Data["A"], Data["B"]],
            animationDuration,
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = [
                    "#3AA1FF",
                    "#13C2C2",
                    "rgb(25,46,94)",
                    "rgb(195,229,235)"
                  ];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>