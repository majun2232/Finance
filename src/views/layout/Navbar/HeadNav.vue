<template>
    <header class="head-nav">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
        <div class="topcontent">
            <i class="el-icon-search iconclass"></i>
            <el-button type="text" @click="getname" class="underline">请选择公司信息</el-button>
            <el-dialog title="选择公司" :visible.sync="dialogVisible" :before-close="handleClose" :modal-append-to-body="false">
                <companyTree />
                <!-- <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span> -->
            </el-dialog>
            <i class="el-icon-date iconclass"></i>
            <el-dropdown trigger="click">
                <el-button type="text" class="underline el-dropdown-link">年份选择
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) of years" :key="index" @click.native="getyear(item)">{{item}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown trigger="click">
                <el-button type="text" class="underline el-dropdown-link">月份选择
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) of months" :key="index" @click.native="getmonth(item)">{{item}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- 消息提醒 -->
            <i class="el-icon-bell iconclass"></i>

            <div class="userinfo">
                <img :src="user.avatar" alt="" class="avatar">
                <div class="welcome">
                    <p class="name avatarneme">{{user.name}}</p>
                </div>
                <span class="username">
                    <!-- 下啦箭头 -->
                    <el-dropdown trigger="click" @command="setDialogInfo">
                        <span class="el-dropdown-link">
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="headlistUp">
                            <el-dropdown-item command="info">
                                <i class="info"></i>
                                <span>个人信息</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="info">
                                <i class="manage"></i>
                                <span>管理互动</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="info">
                                <i class="about"></i>
                                <span>关于软件</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="info" class="icon-bottom">
                                <i class="help"></i>
                                <span>帮助</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="logout">
                                <i class="logout"></i>
                                <span> 退出</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </div>
        </div>
    </header>
</template>

<script>
    import hamburger from '@c/Hamburger'
    import {
        mapGetters
    } from 'vuex'
    import companyTree from '@c/companyTree.vue'
    export default {
        name: 'Headnav',
        data() {
            return {
                dialogVisible: false,
                isCollapse: true,
                inputCompany: "",
                chooseYear: "",
                chooseMoth: "",
                years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }
        },
        components: {
            hamburger,
            companyTree
        },
        computed: {
            // ...mapGetters([
            //     'user', 'sidebar'
            // ])
            user() {
                return this.$store.getters.user.user;
            },
            sidebar() {
                return this.$store.getters.sidebar;
            }

        },
        methods: {
            setDialogInfo(cmdItem) {
                //    console.log(cmdItem)
                switch (cmdItem) {
                    case "info":
                        this.showInfoList();
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            },
            showInfoList() {
                // console.log("个人信息")
                this.$router.push("/infoshow")
            },
            getname() {
                this.dialogVisible = true
            },
            logout() {
                // console.log("退出")
                // 清除token   
                localStorage.removeItem('authorization');
                localStorage.removeItem('database');
                // 设置vuex store
                this.$store.dispatch('clearCurrentState');
                // 跳转到登陆页面
                this.$router.push('/login')
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            // 控制折叠
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            getyear(child) {
                this.chooseYear = child
                console.log(this.chooseYear);
            },
            getmonth(child) {
                this.chooseMoth = child
                console.log(this.chooseMoth);
            }
        }
    }
</script>
<style>

</style>