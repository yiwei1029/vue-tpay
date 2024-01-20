<template>
    <section class="Dashboard">
        <el-card>
            <!-- 第一行 -->
            <el-row>
                <el-col :span="12" v-for="s in Stats1">
                    <el-statistic :title="s.title">
                        <template slot="formatter">
                            {{ s.value }}
                        </template>
                    </el-statistic>
                </el-col>
            </el-row>

        </el-card>
        <el-card>
            <!-- 第二行  -->
            <el-row>
                <el-col :span="6" v-for="s in Stats2">
                    <el-statistic :title="s.title">
                        <template slot="formatter">
                            {{ s.value }}
                        </template>
                    </el-statistic>
                </el-col>
            </el-row>
        </el-card>
    </section>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            Stats1: [
                //第一行
                { title: "Today Deposit Coins", value: 4179 },
                { title: "Transaction Fees", value: 2388 }
            ],
            Stats2: [
                //第二行
                { title: "Today Conducted Transactions", value: 732 },
                { title: "Today Active User", value: 1572 },
                { title: "Today Active Payment Channel", value: 37632 },
                { title: "Transaction Amount", value: 1572 }
            ]
        }
    },
    components: {},
    watch: {},
    mounted() { },
    methods: {}
}
</script>

<style scoped lang="less"></style>
