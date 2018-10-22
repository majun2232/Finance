<template>
  <!-- <el-table :data="tableData" border="" height="400"  :summary-method="getSummaries"
      show-summary style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="price" label="单价">
      </el-table-column>
      <el-table-column prop="amount" label="数量">
      </el-table-column>
      <el-table-column prop="sum" label="总额">
      </el-table-column>
    </el-table> -->
     <el-table
    :data="tableData6"
    border
    height="400"
    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
  
    <el-table-column
      prop="price"
      label="数值 1（元）">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="数值 2（元）">
    </el-table-column>
   
  </el-table>
</template>

<script>
  export default {
// computed:{
//   tableData() {
//     this.tableData6.map((v,i)=>{
//       v.sum=v.price*v.amount;
//     });
//     console.log(this.tableData6);
    
//     return this.tableData6
//   }
// },      
methods: {
   getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = [];
        // 行的遍历
        columns.forEach((column, index) => {
          console.log(index);

          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          // 把每列包装成一个数组,原数组被“映射”成对应新数组,经过处理飞数字的会变成nan
          const values = data.map(function (item) {
            return Number(item[column.property])
          });
          console.log(values);
          //  如果每一个value都是汉字或其他,那么就返回假,只要有一个是数字就进行求和统计
          if (!values.every(function (value) {
              return isNaN(value)
            })) {
            // 求和函数
            function getSum(total, num) {
              const value = Number(num);
              if (!isNaN(value)) {
                return total + num;
              } else {
                return total;
              }
            }
            // 对数组进行求和
            sums[index] = values.reduce(getSum, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }

    },
    data() {
      return {
          tableData6: [{
      id: '12987122',
      price: 10,
      amount: 23,
    }, {
      id: '12987122',
      price: 12,
      amount: 12,
    }, {
      id: '12987122',
      price: 3,
      amount: 20,
    }]
      };
    },
   
  };
</script>
<style scoped>
  .el-table .warning-row {
    background: rgb(238, 157, 7);
  }

  .el-table .success-row {
    background: #66d62a;
  }

  .item {
    margin: 4px;
    z-index: 1000;
  }
</style>