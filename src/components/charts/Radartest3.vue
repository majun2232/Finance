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
      //   var data = genData();
      //   console.log(data);

      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>