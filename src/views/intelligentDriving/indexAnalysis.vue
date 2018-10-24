<template>
    <div>
        <!-- 柱图 -->
        <el-row :gutter="24">
            <el-col :span="6" :xs="24" :sm="24" :lg="6" v-for="(item,index) of bardata" :key="index" class="chart-wrapper">
                <bar-chart :receiveData='item' v-if="flag" class="bg-purple-light" />
            </el-col>
        </el-row>
   <!-- 仪表图 -->
        <el-row :gutter="24">
            <el-col :span="6" :xs="24" :sm="24" :lg="6" v-for="(item,index) of bardata" :key="index" class="chart-wrapper">
              
                <gauge :receiveData='item' v-if="flag" class="bg-purple-light" ></gauge>
            </el-col>
        </el-row>


    </div>
</template>

<script>
import BarChart from "@c/charts/BarChart";
import gauge from "@c/charts/gauge";
export default {
  name: "indexAnalysis",
  data() {
    return {
      bardata: {}
    };
  },
  components: {
    BarChart,
    gauge
  },
  created() {
    this.$axios.get("/api/chart").then(res => {
      this.bardata = res.data.body;
      console.log(this.bardata);

      this.flag = true;
    });
  }
};
</script>

<style lang='scss' scoped>
.chart-wrapper {
  display: block;
  background: #f0f2f5;
  //   padding: 16px 16px 0;
  margin-top: 24px;

  .bg-purple-light {
    background: #fff;
  }
}
</style>