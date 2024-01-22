<template>
    <section class="Execute">
        <!-- 选择路径 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="left-right">
                        <span>Receiver</span>
                        <el-input v-model="InputReceiver" style="width: 50%;">
                        </el-input>
                    </div>
                    <br />
                    <div class="left-right">
                        <span>Amount</span>
                        <el-input v-model="InputAmount" style="width: 50%;"></el-input>
                    </div>
                </el-col>

                <el-col :span="8">
                    <el-button @click="createRouteGraph" type="primary"
                        style="width: 100%; margin: 30px 0;">Route</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- route地图 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div id="graph1" style="width: 100%; height: 300px;"></div>
                </el-col>

                <el-col :span="8">
                    <el-button @click="send" type="primary" style="width: 100%; margin: 120px 10px;">Send</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- 最近的交易 -->
        <el-row :gutter="20">


            <el-col :span="16">
                <el-card>
                    <div>User transactions</div>
                    <div id="chart1" style="width: 800px; height: 300px;"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <!-- 最近的交易 -->
                <el-card>
                    <div>Latest transations</div>
                    <el-table :data="LatestTrx" style="width: 100%">
                        <el-table-column prop="time" label="time" width="">
                        </el-table-column>
                        <el-table-column prop="txhash" label="txhash" width="">
                        </el-table-column>
                    </el-table>
                </el-card>

            </el-col>
        </el-row>

    </section>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'Execute',
    data() {
        return {
            InputAmount: '',
            InputReceiver: 'bc1qmpk4zw23wlft4lqgfszmy6nh32lkqnfhtard3n',
            LatestTrx: [
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." }
            ],
            AmountVolume: {
                amount: [20, 30, 24, 19, 42, 35], //数量
                volume: [41000, 39800, 41287, 42164, 41683, 40128], //金额
            }
        }
    },
    components: {},
    watch: {},
    mounted() {
        this.createBarChart('chart1')

    },
    methods: {
        send() {
            this.$message.success('send success')
        },
        createBarChart(divName) {
            var chartDom = document.getElementById(divName);
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['amount', 'volume']
                },
                xAxis: {
                    type: 'category',
                    data: [
                        '9:01', '9:03', '9:04', '9:06', '9:07', '9:10'
                    ]
                },
                yAxis: [{
                    type: 'value', name: 'amount', position: 'right', min: 0,
                    max: 80
                },
                {
                    type: 'value', name: 'volume', position: 'left', min: 0,
                    max: 80000
                }],
                series: [
                    {
                        name: 'amount',
                        data: this.AmountVolume['amount'],
                        type: 'bar'
                    },
                    {
                        name: 'volume',
                        data: this.AmountVolume['volume'],
                        type: 'bar'
                    }
                ]
            };

            myChart.setOption(option);
        },
        createRouteGraph() {

            var chartDom = document.getElementById('graph1');
            var myChart = echarts.init(chartDom);
            var option;
            const Json = require('../../static/myRoute')

            option = {
                title: {
                    text: 'Transfer Route'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                        if (params.value.type == "node") {
                            return `${params.value.account}`
                        } else {
                            return `${params.value.val}`
                        }
                    }
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'none',
                        symbolSize: 50,
                        roam: true,
                        label: {
                            show: true
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            fontSize: 20
                        },
                        data: Json.nodes,
                        // links: [],
                        links: Json.links,
                        categories: Json.categories,
                        lineStyle: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

        }
    }
}
</script>

<style scoped lang="less">
.left-right {
    display: flex;
    justify-content: space-between;
}
</style>
