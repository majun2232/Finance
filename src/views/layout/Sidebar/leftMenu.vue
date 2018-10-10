<template>
    <el-row >
        <el-col>
          
            <el-menu mode="vertical"  :collapse="isCollapse" text-color="#9fa7ae"
                active-text-color="#fefefe"   background-color="#324057"
                class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <!-- 循环出主体内容 -->
                <template v-for="item in items">
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path" >
                        <template slot="title" >
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title" >{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                            <el-menu-item :index='citem.path'>
                                <span slot="title" >{{citem.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
                <router-link to="/foodlist">
                    <el-menu-item index="1">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">好吃食物</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/companyTree">
                    <el-menu-item index="2">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">公司树</span>
                    </el-menu-item>
                </router-link>

                    <router-link to="/test">
                    <el-menu-item index="3">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">测试</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: "leftmenu",
        data() {
            return {
                items: [{
                        icon: "fa-money",
                        name: "资金管理",
                        path: "fund",
                        children: [{
                            path: "foundlist",
                            name: "资金流水1"
                        },
                        {
                            path: "/foodlist",
                            name: "资金流水2"
                        },
                        {
                            path: "/companyTree",
                            name: "资金流水3"
                        }]
                    },
                    {
                        icon: "fa-asterisk",
                        name: "信息管理",
                        path: "info",
                        children: [{
                            path: "infoshow",
                            name: "个人信息"
                        },
                        {
                            path: "foodlist",
                            name: "个人信息2"
                        },
                        {
                            path: "/companyTree",
                            name: "个人信息3"
                        }]
                    }
                ]
            };
        },
        computed: {
            ...mapGetters([
                'sidebar',
            ]),
            isCollapse() {
                return !this.sidebar.opened
            }
        }
    };
</script>
<style lang='scss' scoped>

</style>