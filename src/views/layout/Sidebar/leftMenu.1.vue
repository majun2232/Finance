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
                <el-submenu v-for="items in listItemOne"  :index="items.code" :key="items.code">
                    <template slot="title">
                        <!-- <i :class="'fa fa-margin '+item.icon"></i> -->
                        <span>{{item.text}}</span>
                    </template>

                    <el-submenu v-if="items.children" v-for="(child,seq) in items.children" :index="child.code" :key="seq">
                        <!-- 二级目录 -->
                        <template slot="title">
                            <!-- <i :class="'fa fa-margin '+item.icon"></i> -->
                            <span>{{child.code}}--</span>
                            <span>{{child.text}}</span>
                        </template>


                        <!-- <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
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
    export default {
        name: "leftmenu",
        created() {
            this.fetchData(this.userId, "10")
        },
        data() {
            return {
                items: [{
                        icon: "fa-money",
                        text: "资金管理",
                        path: "fund",
                        code: "10",
                        children: [{
                                path: "foundlist",
                                text: "资金流水1",
                                code: "101"
                            },
                            {
                                path: "/foodlist",
                                text: "资金流水2",
                                code: "102"
                            },
                            {
                                path: "/companyTree",
                                text: "资金流水3",
                                code: "103"
                            }
                        ]
                    },
                    {
                        icon: "fa-asterisk",
                        text: "信息管理",

                        code: "11",
                        path: "info",

                        children: [{
                                path: "infoshow",
                                text: "个人信息",
                                code: "110"
                            },
                            {
                                path: "foodlist",
                                text: "个人信息2",
                                code: "111"
                            },
                            {
                                path: "/companyTree",
                                text: "个人信息3",
                                code: "112"
                            }
                        ]
                    }
                ],
                userId: this.$store.getters.user.user.id,
                listItemOne: [],
                listItemTwo: [],
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
                console.log(key, keyPath);
                // if(keyPath==="")
                // console.log(this.isEmpty(key));

                this.fetchData(this.userId, key)

            },
            fetchData(userId, code) {
                this.listLoading = true
                findnode(userId, code).then(response => {
                    console.log(response.data.data);
                    if (Number(code) < 100)
                        this.listItemOne = response.data.data
                    else(
                        this.listItemTwo = response.data.data
                    )
                })
            }
        },

    };
</script>
<style lang='scss'>



</style>