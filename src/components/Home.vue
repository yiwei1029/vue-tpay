<template>
    <el-container>
        <el-header class="el-header">
            <div>
                <img class="homelogo" src="../assets/homelogo.png" alt="">
                <span>Cmixing User Center</span>
                <el-menu :default-active="activePath" router mode="horizontal" active-text-color="#ff73b3"
                    v-for="menu in MenuList">
                    <el-menu-item :index="'/' + menu.path" @click="saveActive('/' + menu.name)">
                        {{ menu.name }}
                    </el-menu-item>
                </el-menu>
            </div>
            <el-button type="primary" @click="backToLogin" class="btns" style="height: 60%;margin:auto 0">Exit</el-button>
        </el-header>
        <el-container>
            <!-- 主体区域 -->
            <el-main class="el-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>

export default {
    created() {
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    data() {
        return {
            MenuList: [
                { name: 'Dashboard', id: '1', path: 'dashboard', children: [] },
                { name: 'Channel', id: '2', path: 'channel', children: [{ name: 'Directory', id: '2-1', path: 'directory' }] },
                { name: 'Execute', id: '3', path: 'execute', children: [{ name: 'Dashboard', id: '3-1', path: 'dashboard' }] }
            ],

            activePath: '',


        };
    },
    methods: {
        backToLogin() {
            this.$router.push('/login');
        },
        toggleCollapseClick() {
            this.toggleCollapse = !this.toggleCollapse;
        },
        saveActive(activePath) {
            window.sessionStorage.setItem('activePath', activePath)

            this.activePath = activePath
        }
    },
    components: {}
}
</script>
<style lang="less" scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.title_template {
    padding-left: 10px;
}

.toggle-collapse {
    color: #fff;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
    letter-spacing: 0.3rem;

}



.homelogo {
    height: 100%;
}


.el-container {
    height: 100%;
    padding: 0;
}


/* .btns {
  display: flex;
  justify-content: end;
} */
.el-header {
    //background-color: #373d41;
    display: flex;
    justify-content: space-between;
    color: #909399;
    font-size: 20px;
    padding-left: 0;

    >div {
        display: flex;
        /**/
        align-items: center;
        /*上下居中*/
    }
}



.el-main {
    background-color: #eaedf1;
}
</style>
