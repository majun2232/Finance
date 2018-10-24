<template>
    <div>
        <words-tem :inWordDate='inWordDate' :inWodTmp='inWodTmp' v-if="flag"></words-tem>
<table-show :incomeDate="tableData" v-if="flag"></table-show>
     <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
    import tableShow from '@c/tableTem'
    import wordsTem from '@c/wordsTem'
    export default {
        name: '',
        data() {
            return {
                inWordDate: [],
                inWodTmp: [],
                tableData: [],
                flag: false,
               
            }
        },
        components: {
            tableShow,
            wordsTem
        },
        created() {
            var pre = []
            this.$axios.get("/api/PrefaceData").then(res => {
                    this.inWordDate = res.data;

                }),
                this.$axios.get("/api/Preface").then(res => {

                    this.inWodTmp = res.data.model.tables[0].row;
                }),
                this.$axios.get("/api/10101/201803/0002").then(res => {
                  console.log(res.data.body);
                  this.tableData=res.data
                    this.chartData.rows= res.data.body
                    this.flag = true
                })

        }
    }
</script>

<style lang='scss' scoped>


</style>