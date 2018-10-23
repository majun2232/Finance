<template>
  <div>
    <words-tem :inWordDate='inWordDate' :inWodTmp='inWodTmp'  v-if="flag"></words-tem> 
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
        PrefaceData: [],
        Preface: [],
        tableData: [],
        flag: false
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