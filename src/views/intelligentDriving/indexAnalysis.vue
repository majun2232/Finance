<template>
  <div>
    <!-- 柱图 -->
    <el-row :gutter="24">
      <el-col :span="6" :xs="24" :sm="12" :lg="6" v-for="(item,index) of bardata" :key="index" class="chart-wrapper">
        <bar-chart :receiveData='item' v-if="flag" class="bg-purple-light" />
      </el-col>
    </el-row>
    <!-- 仪表图 -->
    <el-row :gutter="24">
      <el-col :span="6" :xs="24" :sm="12" :lg="6" v-for="(item,index) of bardata" :key="index" class="chart-wrapper">

        <gauge :receiveData='item' v-if="flag" class="bg-purple-light"></gauge>
      </el-col>
    </el-row>
    <!-- 线性图 -->
    <line-chart :receiveData='linedata' v-if="flag"></line-chart>
  </div>
</template>

<script>
import BarChart from "@c/charts/BarChart";
import gauge from "@c/charts/gauge";
import LineChart from "@c/charts/LineChart";
export default {
  name: "indexAnalysis",
  data() {
    return {
      bardata: [],
      linedata: [],
      flag: false
    };
  },
  components: {
    BarChart,
    gauge,
    LineChart
  },
  created() {
    this.$axios.get("/api/chart").then(res => {
      this.bardata = res.data.body;
      this.flag = true;
    });
    this.$axios.get("/api/chart1").then(res => {
      this.linedata = res.data.body;
      console.log(this.linedata);
      this.flag = true;
    });
  }
};
</script>

<style lang='scss' scoped>
.chart-wrapper {
  display: block;
  background: #f0f2f5;
  margin-top: 24px;

  .bg-purple-light {
    background: #fff;
  }
}
</style>