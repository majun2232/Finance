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
    <!-- <line-chart :receiveData='linedata' v-if="flag"></line-chart> -->

    <!-- 饼图1 -->
    <el-row :gutter="24">
      <el-col :span="9" class="chart-wrapper">
        <pie-test v-if="flag" class="bg-purple-light"></pie-test>
      </el-col>
       <el-col :span="9" class="chart-wrapper">
        <pie-test1 v-if="flag" class="bg-purple-light"></pie-test1>
      </el-col>
      <el-col :span="6" class="chart-wrapper">
        <pie-chart v-if="flag" class="bg-purple-light"></pie-chart>
      </el-col>
    </el-row>
    <!-- 雷达图 -->
    <el-row  :gutter="24">
      <el-col :span="9" class="chart-wrapper"> 
<RadarTest1 class="bg-purple-light"></RadarTest1>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    

  </div>
</template>

<script>
import BarChart from "@c/charts/BarChart";
import gauge from "@c/charts/gauge";
import LineChart from "@c/charts/LineChart";
import PieTest from "@c/charts/Pietest";
import PieTest1 from "@c/charts/Pietest.1";
import PieChart from "@c/charts/PieChart";
import RadarTest1 from "@c/charts/Radartest1";
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
    LineChart,
    PieTest,
    PieTest1,
    PieChart,
    RadarTest1
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
  background: #f0f2f5;
  margin-top: 24px;

  .bg-purple-light {
    background: #fff;
  }
}
</style>