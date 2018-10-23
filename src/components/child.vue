<template>
 <div>
   子组件<!--这里很常见的一个问题，就是{{childObject}}可以获取且没有报错，但是{{childObject.items[0]}}不行，往往有个疑问为什么前面获取到值，后面获取不到呢？-->
  <p>{{childObject.items[0]}}</p>
 </div>
</template>
 
<script>
 export default {
  props: ['childObject'],
 
  created () {
   console.log(this.childObject) // 空值
  },
 mounted(){
    //  console.log(this.childData) 
 }
 }
</script>