<template>
    <div class="dashboard-editor-container">
        <el-col :xs="24" :sm="24" :lg="6" class="chart-wrapper" v-for="(item,index) of bardata" :key="index">
            <bar-chart :receiveData='item' v-if="flag" class="barcss" />
        </el-col>
    </div>
</template>

<script>
    import BarChart from '@c/charts/BarChart'
    export default {
        name: 'indexAnalysis',
        data() {
            return {
                bardata: {},
            }
        },
        components: {
            BarChart,
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

<style lang='scss' scoped>
    .dashboard-editor-container {
        // padding: 32px;
        background-color:red ;

 
        .chart-wrapper {
            display: block;
            background: #fff;
            padding: 16px 16px 0;
          margin-top: 24px;
          width: calc(100%-244px);
   margin-right: 24px;
 
            .barcss {

         
            }
        }
    }
</style>