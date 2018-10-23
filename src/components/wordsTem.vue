<template>
    <div>
        <div>{{inWordDate.text}}</div>
        <span v-for="(item,index) of Preface" :key="index">
            <span> {{item.text}}为</span>
            <span v-if=item.unit> {{item.A}} </span>
            <span v-else> {{item.A}}万元 </span>
            <span>{{item.unit}},</span>
        </span>

    </div>
</template>

<script>
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
        props: ['inWordDate'],
        created() {
            //   下面是数据文件
             var pre =this.inWordDate
            //  下面是文字模板文件数据
            this.Preface = this.inWordDate.model.tables[0].row;
            console.log(this.Preface);
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
        }
    }
</script>

<style lang='scss' scoped>


</style>