<template>
  <div>
    <div>{{LiteralData.text}}</div>
    <span v-for="(item,index) of Preface"  :key="index">
      <span> {{item.text}}为</span>
      <span v-if=item.unit> {{item.A}} </span>
      <span v-else> {{item.A}}万元 </span>
      <span>{{item.unit}},</span>
    </span>
    <table :data='PrefaceData'></table>
  </div>
</template>

<script>
import table from '@c/table'
  export default {
    name: '',
    data() {
      return {
        LiteralData: [],
        PrefaceData: [],
        Preface: [],
        years: '',
        month: '',
        unit: '',
          tableData: [],
                hD: []
      }
    },
    created() {
      var pre = []
      this.$axios.get("/api/PrefaceData").then(res => {
          pre = res.data;
          // console.log(pre);

        }),
        this.$axios.get("/api/Preface").then(res => {
          this.LiteralData = res.data
          this.Preface = res.data.model.tables[0].row;
          console.log( this.Preface);
          for (let index = 0; index < this.Preface.length; index++) {

            const ele = this.Preface[index];
            // console.log(ele);
            for (let j = 0; j < pre.length; j++) {
              // debugger
              const element = pre[j];
              if (ele.id === element.id) {
                if (element.B > 100) {
                  this.Preface.A.push((element.B / 10000).toFixed(2))
                
                  break;
                } else
                 this.Preface.A.push(element.B.toFixed(2))
                
                break;
              }
            }


          }
        }),
          this.$axios.get("/api/10101/201803/0002").then(res => {
             this.tableData = res.data.body;
                this.hD = res.data.header;
          })
    },
    mounted() {

    },
    components: {
// table,
    }
  }
</script>

<style lang='scss' scoped>


</style>