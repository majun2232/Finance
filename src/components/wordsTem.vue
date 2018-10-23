<template>
    <div>
        <div>{{inWodTmp.text}}</div>
        <span v-for="(item,index) of Preface" :key="index">
            <span> {{item.text}}为</span>
            <span v-if=item.unit> {{item.A}} </span>
            <span v-else> {{item.A}}万元 </span>
            <span>{{item.unit}},</span>
        </span>

    </div>
</template>

<script>
/* 这是一个生成文字报表的子组件,需要使用时,父组件绑定  :inWordDate='inWordDate' :inWodTmp='inWodTmp'  这样的格式 
 ,记住所有的模板引用都要加  v-if="flag"  否则会报为定义的错误!!!!!
需要传一个模板文字和一个对应的数据,在里面会用 this.$set进行数据拼接,传的对象格式为如下,本模板会自动解析传入的数据 
 */
    export default {
        name: '',
        data() {
            return {
                PrefaceData: [],
                Preface: [],
                // years: '',
                // month: '',
                // unit: '',
            }
        },
        props: ['inWordDate','inWodTmp'],
        created() {
       var pre =this.inWordDate
          this.Preface = this.inWodTmp
          // console.log(this.Preface);
          for (let index = 0,len = this.Preface.length; index < len; index++) {
            const ele = this.Preface[index];
            // console.log(ele);
            for (let j = 0; j < pre.length; j++) {
              const element = pre[j];
              // console.log(element);
              if (ele.id === element.id) {
                if (element.B > 100) {
                    // 下面对原数据进行拼接一个A进去
                  this.$set(this.Preface[index], "A", (element.B / 10000).toFixed(2))
                //   console.log(this.Preface);
                  break;
                } else {
                  this.$set(this.Preface[index], "A", element.B.toFixed(2))
                  break;
                }
              }
            }
          }
  
        }
    }
</script>

<style lang='scss' scoped>


</style>