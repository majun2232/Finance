<template>
  <div>
    <words-tem :inWordDate='inWordDate' :inWodTmp='inWodTmp'  v-if="flag"></words-tem> 
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>
  // import tableShow from '@c/tableTem'
  import wordsTem from '@c/wordsTem'
  export default {
    name: '',
    data() {
      return {
     inWordDate: [],
     inWodTmp:[],
        flag: false,
         chartData: {
          columns: ['text', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    },
    components: {
      // tableShow,
      wordsTem
    },
    created() {
      var pre = []
      this.$axios.get("/api/PrefaceData").then(res => {
          this.inWordDate = res.data;
     
        }),
        this.$axios.get("/api/Preface").then(res => {
          this.flag=true;
          this.inWodTmp = res.data.model.tables[0].row;
        })
      // this.$axios.get("/api/10101/201803/0002").then(res => {

      //   this.tableData = res.data
      //   this.flag = true
      // })

    }
  }
</script>

<style lang='scss' scoped>


</style>