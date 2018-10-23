<template>
  <div>
    <!-- <words-tem :inWordDate='tableData' v-if="flag"></words-tem> -->
    <!-- <table-show :incomeDate='tableData' v-if="flag"></table-show> -->
    <!-- <div>{{inWordDate.text}}</div> -->
    <span v-for="(item,index) of Preface" :key="index">
      <span> {{item.text}}为</span>
      <span v-if=item.unit> {{item.A}} </span>
      <span v-else> {{item.A}}万元 </span>
      <span>{{item.unit}},</span>
    </span>



  </div>
</template>

<script>
  // import tableShow from '@c/tableTem'
  // import wordsTem from '@c/wordsTem'
  export default {
    name: '',
    data() {
      return {
        LiteralData: [],
        PrefaceData: [],
        Preface: [],
        tableData: [],
        flag: false
      }
    },
    components: {
      // tableShow,
      // wordsTem
    },
    created() {
      var pre = []

      this.$axios.get("/api/PrefaceData").then(res => {
          // pre = res.data;
          // console.log(pre);

        }),
        this.$axios.get("/api/Preface").then(res => {
          this.LiteralData = res.data
          this.Preface = res.data.model.tables[0].row;
          // console.log(this.Preface);
          for (let index = 0; index < this.Preface.length; index++) {

            const ele = this.Preface[index];
            // console.log(ele);
            for (let j = 0; j < pre.length; j++) {
              // debugger
              const element = pre[j];
              console.log(element);

              if (ele.id === element.id) {
                if (element.B > 100) {
                  // debugger
                  this.$set(this.Preface, "A", (element.B / 10000).toFixed(2))
                  console.log(this.Preface);

                  break;
                } else {
                  // this.Preface.A.push(element.B.toFixed(2))
                  this.$set(this.Preface, "A", element.B.toFixed(2))
                  break;
                }

              }
            }


          }
          console.log(this.Preface);
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