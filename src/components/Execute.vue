<template>
    <section class="Execute">
        <!-- 选择路径 -->
        <el-row :gutter="10">
            <el-col :span="8">
                <el-card>
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <div class="left-right">
                                <span>Recipient</span>
                                <el-input v-model="InputReceiver" style="width: 70%;">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <el-button @click="createRouteGraph"  style="width: 100%; background-color: #9ed13a; color:#fff ">Route</el-button>
                        </el-col>
                    </el-row>
                    <br />
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <div class="left-right">
                                <span>Amount</span>
                                <el-input v-model="InputAmount" style="width: 70%;"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <el-button style="width: 100%; background-color: #5470c6; color:#fff ">Direct</el-button>
                        </el-col>

                    </el-row>

                </el-card>
            </el-col>
            <el-col :span="6">


                <!-- 最近的交易 -->
                <el-card>
                    <div>Latest Transactions</div>
                    <el-table :data="LatestTrx" style="width: 100% ;height: 80px;overflow: scroll;">
                        <el-table-column prop="time" label="Time" width="100">
                        </el-table-column>
                        <el-table-column prop="txhash" label="TxHash" width="">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="10">
            <el-col :span="8">
                <!-- route地图 -->
                <el-card>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <div>Transfer Route</div>
                            <div id="graph1" style="width: 100%; height: 300px;"></div>
                        </el-col>

                        <el-col :span="8">
                            <el-button type="" style="width: 125px; position: absolute; bottom: 160px;right: 10px;">Trx
                                Fee:<br /><br />0.07</el-button>
                            <el-button @click="send" type="primary"
                                style="width: 125px; position: absolute; bottom: 10px;right: 10px;">Send</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div>User Transactions</div>
                    <div id="chart1" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-col>
        </el-row>



        <!-- 最近的交易 -->
        <el-row :gutter="20">


            <el-col :span="16">

            </el-col>
            <el-col :span="8">


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
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1..." }
            ],
            AmountVolume: {
                amount: [20, 60, 45, 46, 42, 35], //数量
                volume: [4.1, 3.8, 3.2, 3.5, 4.2, 3.9], //金额
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
                    data: ['Amount', 'Volume']
                },
                xAxis: {
                    type: 'category',
                    data: [
                        '9:01', '9:03', '9:05', '9:07', '9:09', '9:11'
                    ]
                },
                yAxis: [{
                    type: 'value', name: 'Amount', position: 'right', min: 0,
                    max: 80
                },
                {
                    type: 'value', name: 'Vol(x10^4)', position: 'left', min: 0,
                    max: 4
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
                // backgroundColor: '#0f202e',
                title: {
                    // text: 'Transfer Route'
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
                        itemStyle: {
                            // normal: { color: '#007acc' }
                        },
                        lineStyle: {
                            opacity: 0.9,
                            width: 4,
                            curveness: 0,
                            color: '#38393c'
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
