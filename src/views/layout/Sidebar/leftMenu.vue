<template>
    <div>
        <div class="logo-contener"></div>
        <el-menu mode="vertical" :collapse="isCollapse" @open="handleOpen">
            <!-- <router-link to="/home">
                <el-menu-item index="0">
                    <i class="fa fa-margin fa-server"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link> -->
            <!-- 循环出主体内容 -->
            <template>
                <el-submenu v-for="item in listItemOne" :index="item.code" :key="item.code">
                    <template slot="title">
                        <i :class="'fa fa-margin '+item.icon"></i>
                        <img :src="item.avatar" alt="" class="avatarleft">
                        <span>{{item.text}}</span>
                    </template>

                    <el-submenu v-if="item.children" v-for="(child,seq) in item.children" :index="child.code" :key="seq">
                        <!-- 二级目录 -->
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>  
                              <img :src="item.avatar" alt="" class="avatarleft">                   
                            <span>{{child.text}}</span>
                        </template>
                          <!-- 三级目录  暂时不用-->
                        <!-- <router-link v-if="item.children" v-for="(citem,cindex) in child.children" :to="citem.path"
                            :key="cindex">
                            <el-menu-item :index='citem.path'>
                                
                                <span>{{citem.text}}</span>
                            </el-menu-item>
                        </router-link> -->
                        
                    </el-submenu>
                </el-submenu>
            </template>


            <router-link to="/test">
                <el-menu-item index="3">
                    <i class="fa fa-margin fa-server"></i>
                    <span slot="title">测试</span>
                </el-menu-item>
            </router-link>
        </el-menu>

    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    import {
        findnode
    } from '../../../api/findnode.js'
    // import Vue from 'vue'
    export default {
        name: "leftmenu",
        created() {
            this.fetchDataInit(this.userId, "10")
        },
        data() {
            return {
                userId: this.$store.getters.user.user.id,
                listItemOne: [],
                listItemTwo: [],
                nodes: [],
                tempNodes: [],
                sideList: [], //所有项目
                clickNodeId: "10"
            };
        },
        computed: {
            ...mapGetters([
                'sidebar', 'user',
            ]),
            isCollapse() {
                return !this.sidebar.opened
            }

        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(keyPath);
                if (keyPath.length === 1) {
                    // console.log("我进来了");
                    this.fetchData(this.userId, keyPath[0])
                    // 测试
                    // this.$set(this.listItemOne[0],"children", [{
                    //             path: "foundlist",
                    //             text: "沃尔沃1",
                    //             code: "101"
                    //         },
                    //         {
                    //             path: "/foodlist",
                    //             text: "沃尔沃二水2",
                    //             code: "102"
                    //         },
                    //         {
                    //             path: "/companyTree",
                    //             text: "沃尔沃二水3",
                    //             code: "103"
                    //         }
                    //     ])
                    console.log(this.listItemOne);
                }
                else{
                    this.fetchData(this.userId, keyPath[1]) 
                }

            },
            fetchDataInit(userId, code) {
                findnode(userId, code).then(response => {
                    this.listItemOne = response.data.data
                })
            },


            fetchData(userId, code) {
                var clickNodeId = userId + "_" + code;
                var flag = false;
                // 只要侧边栏被点开请求过一次,那么下次就不再发送请求11
                // 如果在数组中,找到相同的clickNodeId,那么标记改为真
                for (let index = 0; index < this.nodes.length; index++) {
                    if (this.nodes[index] === clickNodeId) {
                        flag = true
                    }
                }
                if (!flag) {
                    findnode(userId, code).then(response => {
                        this.nodes.push(clickNodeId);
                        if (Number(code) < 9999) {
                            console.log(code);
                            console.log(this.nodes);


                            for (let index = 0; index < this.listItemOne.length; index++) {
                                // 匹配哪个children值加进去 
                                if (this.listItemOne[index].code === code) {
                                    // 以下写法不会触发视图更新,因为是直接用索引改变的
                                    // this.listItemOne[index].children = response.data.data
                                    // this.listItemOne.splice(index,0,response.data.data)
                                    //    Vue.set(this.listItemOne, index, this.listItemOne[index]);
                                    // 下面插入数据是乱的,无法显示完整
                                    // this.$set(this.listItemOne[index].children,index,response.data.data)
                                    //  this.$set(this.listItemOne[index],"children",response.data.data)
                                    this.$set(this.listItemOne[index], "children", response.data.data)
                                }
                            }
                            console.log(this.listItemOne);
                        } else
                            console.log(code);
                    })
                }
            }
        },
        watch: {

        }
    };
</script>
<style lang='scss'>



</style>