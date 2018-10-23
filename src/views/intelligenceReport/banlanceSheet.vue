<template>
    <div>
        <words-tem :inWordDate='inWordDate' :inWodTmp='inWodTmp' v-if="flag"></words-tem>
<table-show :incomeDate="tableData" v-if="flag"></table-show>
        <ve-histogram :data="chartData"></ve-histogram>
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
                chartData: {
                    columns: ['text', 'A'],
                    rows: []
                }
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