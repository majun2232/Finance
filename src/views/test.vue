<template>
  <div class="">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
     
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <!-- 雷达图 -->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <!-- 饼图 -->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <!-- 柱状图 -->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
<!--     
    <div class="chart-wrapper" v-for="(item,index) of bardata" :key="index">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
     
        <line-chart :receiveData='item' v-if="flag" />
      </el-row>
    </div> -->

    <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-for="(item,index) of bardata" :key="index">
          <bar-chart :receiveData='item'  v-if="flag" />
        </div>
      </el-col>

  </div>
</template>

<script>
  import LineChart from '@c/charts/LineChart'
  import RaddarChart from '@c/charts/RaddarChart'
  import PieChart from '@c/charts/PieChart'
  import BarChart from '@c/charts/BarChart'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    name: '',
    components: {

      LineChart,
      RaddarChart,
      PieChart,
      BarChart,

    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        bardata: {},
        flag: false
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      }
    },
    created() {
      this.$axios.get("/api/chart").then(res => {
        this.bardata = res.data.body
        console.log(this.bardata);

        this.flag = true;
      })
    }

  }
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>