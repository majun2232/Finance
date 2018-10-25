<template>
    <div :class="className" :style="{height:height,width:width}"/>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
export default {
  name: "Pietest",
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
      // var data = genData();
      // console.log(data);
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        title: {
          text: "天气情况统计",
          top: 10,
          left: "6%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: "center",
          data: ["西凉", "益州", "兖州", "荆州", "幽州"]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["40%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 1548,
                name: "幽州",
                label: {
                  normal: {
                    formatter: [
                      "{title|{b}}{abg|}",
                      "  {weatherHead|天气}{valueHead|天数}{rateHead|占比}",
                      "{hr|}",
                      "  {Sunny|}{value|202}{rate|55.3%}",
                      "  {Cloudy|}{value|142}{rate|38.9%}",
                      "  {Showers|}{value|21}{rate|5.8%}"
                    ].join("\n"),
                    backgroundColor: "#eee",
                    borderColor: "#777",
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                      title: {
                        color: "#eee",
                        align: "center"
                      },
                      abg: {
                        backgroundColor: "#333",
                        width: "100%",
                        align: "right",
                        height: 25,
                        borderRadius: [4, 4, 0, 0]
                      },
                      Sunny: {
                        height: 30,
                        align: "left"
                      },
                      Cloudy: {
                        height: 30,
                        align: "left"
                      },
                      Showers: {
                        height: 30,
                        align: "left"
                      },
                      weatherHead: {
                        color: "#333",
                        height: 24,
                        align: "left"
                      },
                      hr: {
                        borderColor: "#777",
                        width: "100%",
                        borderWidth: 0.5,
                        height: 0
                      },
                      value: {
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "left"
                      },
                      valueHead: {
                        color: "#333",
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "center"
                      },
                      rate: {
                        width: 40,
                        align: "right",
                        padding: [0, 10, 0, 0]
                      },
                      rateHead: {
                        color: "#333",
                        width: 40,
                        align: "center",
                        padding: [0, 10, 0, 0]
                      }
                    }
                  }
                }
              },
              { value: 535, name: "荆州" },
              { value: 510, name: "兖州" },
              { value: 634, name: "益州" },
              { value: 735, name: "西凉" }
            ],
            itemStyle: {
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

<style lang="scss" scoped>
</style>