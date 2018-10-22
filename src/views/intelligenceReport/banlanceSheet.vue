<template>
    <div class="table_container">
        <el-table v-if="tableData.length > 0" :data='tableData' max-height="5000" style="width: 100%">
            <el-table-column prop="id" :label="hD[0].text" align='center' width="250">
                <template slot-scope="scope">
                    <span style="color:#f56767">{{scope.row.id }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="text" :label="hD[1].text" align='center' width="250">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content=scope.row.title placement="right">
                        <span style="margin-left: 10px">{{ scope.row.text }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="A" :label="hD[2].text" align='center' width="250">
                <template slot-scope="scope">
                    <span style="color:#00d053"> {{scope.row.A }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="B" :label="hD[3].text" align='center' width="250">
                <template slot-scope="scope">
                    <span style="color:#00d053"> {{scope.row.B }}</span>
                </template>
            </el-table-column>


        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                hD: [],
                valueList: [],
            }
        },
        created() {
            this.$axios.get("/api/10101/201803/0002").then(res => {
                // console.log(res.data);
                this.tableData = res.data.body;
                this.hD = res.data.header;
                //  console.log( this.hD);
                //    console.log( this.tableData);
                // 得出列数的值,获取A,B 
                let needCalacuteCols = this.hD.filter(item => item.type === "decimal");
                for (let index = 0; index < needCalacuteCols.length; index++) {
                    const ele = needCalacuteCols[index].id;
                    // console.info(ele);
                    var coutlist = []
                    this.valueList = [],
                        this.tableData.forEach(element => {
                            if (isNaN(element[ele])) {
                                // console.log(element)
                                // 得到含计算公式的cell集合
                                coutlist.push(element[ele])

                            } else {
                                // 得到只含数据的集合
                                this.valueList.push(element)
                            }
                        });
                    // console.log(coutlist);
                    var itemExpression = []
                    // 遍历含公式的cell集合
                    coutlist.forEach(element => {
                        // console.log(element);
                        //  得到每个行的值,并且替换的事一起干了
                        var item = this.getsell(element, ele)
                        itemExpression.push(item)
                    });
                    // console.log(itemExpression);
                    //   得到替换后的表达式,在此进行 计算
                    // console.log(eval(itemExpression[0]));
                    this.showdata(itemExpression, ele)
                }


            })
        },
        methods: {
            // 得到每个行的值,并且替换的事一起干了
            // A$1100102
            getsell(tableId, listItem) {
                var strs = new Array(); //定义一数组 
                strs = tableId.split(/[\*\+\/\-]/); //正则字符分割 
                for (let index = 0; index < strs.length; index++) {
                    var element = strs[index];
                    var singleone = element.substring(2, element.length)
                    var value = this.getvalue(singleone, listItem)
                    // 此处对查询到的值,直接进行替换
                    tableId = tableId.replace(element, value)
                    // console.log(tableId, element, value);
                }
                // console.log(strrow);
                return tableId
            },
            // 得到行里每个cell的值
            getvalue(v, listItem) {
                // console.log(v);              
                var data = this.valueList
                // console.log(data);
                for (let index = 0; index < data.length; index++) {
                    // console.log(data[index].id);                  
                    if (data[index].id === v) {
                        return data[index][listItem]
                    }
                }
                return 0;
            },
            // 得到值更新到系统
            showdata(itemValue, listItem) {
                var eventvalue = []
                // 得到计算最后的值eventvalue
                itemValue.forEach(element => {
                    eventvalue.push(eval(element))
                })
                // console.log(eventvalue);
                // 把计算的值替换表达式,并渲染到页面
                var startcom = this.valueList.length
                // console.log(startcom);

                for (let index = 0; index < eventvalue.length; index++) {
                    this.tableData[(index + startcom)][listItem] = eventvalue[index]
                    console.log(eventvalue[index]);
                }
            }
        }
    }
</script>

<style lang='scss' scoped>


</style>