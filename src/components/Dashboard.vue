<template>
    <section class="Dashboard">
        <!-- 第一行 -->
        <el-row :gutter="10">
            <el-col span="8">
                <el-card>
                    <el-row>Today Cum Trx Fees:<br />
                        <sapn style="font-size: 50px;font-weight: 100; color: rgb(230, 188, 109);">100011</sapn>
                    </el-row>
                    <!-- <el-card> -->
                    <br />
                    <el-row>
                        <el-col span="6">Trx Amount<br />1021</el-col>
                        <el-col span="6">Trx Frequency<br />22 tx/s</el-col>
                        <el-col span="6">Active Users<br />45</el-col>
                        <el-col span="6">New PCs<br />14021</el-col>
                    </el-row>
                    <br />

                    <!-- </el-card> -->

                    <!-- <el-card> -->
                    <el-row>
                        <el-col span="6">Trx volume<br />121</el-col>
                        <el-col span="6">Deposit Bitcoins<br />10323421</el-col>
                        <el-col span="6">Active PCs<br />143021</el-col>
                        <el-col span="6">Closed PCs<br />10231</el-col>
                    </el-row>
                    <!-- </el-card> -->
                </el-card>
            </el-col>
            <!-- <el-col span="5">
                <div>free rate dist</div>
                <div id="chart1" style="width: 100%; height: 150px;"></div>
            </el-col> -->
            <el-col span="5">
                <el-card>
                    <div>PC's Inbalance</div>
                    <div id="chart2" style="width: 100%;height: 210px;"></div>
                </el-card>

            </el-col>
        </el-row>



        <!-- 交易列表和网络 -->
        <el-row :gutter="10">


            <!-- 网络图 -->
            <el-col :span="8">
                <el-card>
                    <div id="graph1" style="width: 100% ; height: 385px; "></div>
                </el-card>

            </el-col>
            <!-- 最近的交易 -->
            <el-col :span="5">
                <el-card style="height: 425px; overflow: scroll;">
                    <div>Latest Transactions</div>
                    <el-table :data="LatestTrx" style="width: 100%">
                        <el-table-column prop="time" label="Time" width="100">
                        </el-table-column>
                        <el-table-column prop="txhash" label="TxHash" width="300">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <!-- succcess ratio 折线图-->
            <el-col :span="8">
                <el-card>
                    <div>Success Ratio of Transactions</div>
                    <div id="chart3" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-col>
            <!-- 交易数量图 -->
            <el-col :span="5">
                <el-card>
                    <div>Transaction Amount</div>
                    <div id="chart4" style="width: 100%; height: 300px;"></div>
                </el-card>
            </el-col>
        </el-row>

    </section>
</template>

<script>
import * as echarts from 'echarts'
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
            ],
            LatestTrx: [
                { time: "18:46:05", txhash: "553bd34716a529cd8d9bdcee12af5635c3506065cab60d35bf274b18e8f57992" },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c035b0c77082260626f2" },
                { time: "18:46:05", txhash: "60fe3b8c14f843beeaffb1b28092b491f522e7643330d5b0d711b637518aa260" }
            ],
            FreeRateDist: [
                { name: '1-2%', value: 48 },
                { name: '>2%', value: 10 },
                { name: '0.1-1%', value: 23 },
                { name: '<0.1%', value: 19 },
            ],
            InbPayChannel: [
                { name: '0-10%', value: 23 },
                { name: '10-20%', value: 17 },
                { name: '20-30%', value: 20 },
                { name: '30-40%', value: 20 },
                { name: '40-50%', value: 20 },
            ],
            SuccessRatio: {
                // 'ThriftPay': [0.6, 0.7, 0.7, 0.8, 0.8],
                'LN': [0.5, 0.5, 0.45, 0.4, 0.45],
                'UG': [0.6, 0.56, 0.5, 0.48, 0.55],
                'UR': [0.56, 0.54, 0.5, 0.42, 0.5],
                'CG': [0.95, 0.9, 0.9, 0.87, 0.92],
                'DC': [0.90, 0.85, 0.84, 0.80, 0.88],
            }

        }
    },
    components: {},
    watch: {},
    mounted() {
        // this.createPieChart('chart1', this.FreeRateDist, 'free rate distribution'),
        this.createPieChart('chart2', this.InbPayChannel, 'Inbalance payment channels');
        this.createLineChart('chart3', '');
        this.createHistChart('chart4', '');
        const Json = require('../../static/net.json')

        this.createMapGraph('graph1', Json)
    },
    methods: {
        createPieChart(divName, dataArray, title) {
            var chart = echarts.init(document.getElementById(divName));
            var option = {
                title: {
                    // text: title
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    top: 10,
                    left: 0,
                    data: dataArray.map(item => item.name)
                },
                series: [
                    {
                        // name: 'Source',
                        name: dataArray.map(item => item.name),
                        type: 'pie',
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: '{d}%',
                            },
                        },
                        data: [
                            ...dataArray
                        ]
                    }
                ]
            }
            chart.setOption(option)
        },
        createLineChart(divName, title) {
            var chart = echarts.init(document.getElementById(divName));

            var option = {
                // title: {
                //     text: title

                // },
                legend: {
                    orient: 'horizontal',
                    y: 'bottom',
                    left: 200,
                    data: ['CG', 'DC', 'UG', 'UR', 'LN']
                },
                xAxis: {
                    data: ['9:07', '9:08', '9:09', '9:10', '9:11']
                },
                yAxis: {},
                series: [
                    {
                        name: 'CG',
                        data: this.SuccessRatio['CG'],
                        type: 'line',
                        // stack: 'x',
                        // areaStyle: {},
                        smooth: 'true'
                    },
                    {
                        name: 'DC',
                        data: this.SuccessRatio['DC'],
                        type: 'line',
                        // stack: 'x',
                        // areaStyle: {},   
                        smooth: 'true'

                    },
                    {
                        name: 'UG',
                        data: this.SuccessRatio['UG'],
                        type: 'line',
                        // stack: 'x',
                        // areaStyle: {},   
                        smooth: 'true'

                    },
                    {
                        name: 'UR',
                        data: this.SuccessRatio['UR'],
                        type: 'line',
                        // stack: 'x',
                        // areaStyle: {},   
                        smooth: 'true'

                    }, {
                        name: 'LN',
                        data: this.SuccessRatio['LN'],
                        type: 'line',
                        // stack: 'x',
                        // areaStyle: {},   
                        smooth: 'true'

                    },

                ]
            };
            chart.setOption(option)
        },
        createHistChart(divName, title) {
            var chart = echarts.init(document.getElementById(divName));

            var option = {
                // title: {
                //     text: title
                // },
                legend: {
                    orient: 'horizontal',
                    bottom: 0,
                    left: 125,
                    data: ['Transasction Amount']
                },
                xAxis: {
                    data: ['9:07', '9:08', '9:09', '9:10', '9:11']
                },
                yAxis: {},
                series: [
                    {
                        name: 'Transasction Amount',
                        data: [1000, 2000, 2500, 2100, 1995],
                        type: 'bar',
                        color: '#91cc75',
                        // stack: 'x',
                        areaStyle: {},
                        // smooth: 'true'
                    },

                ]
            }
            chart.setOption(option)
        },
        createMapGraph(divName, Json) {
            var chartDom = document.getElementById(divName)
            var myChart = echarts.init(chartDom)
            var option

            myChart.showLoading();

            myChart.hideLoading();
            option = {
                title: {
                    // text: 'Transaction Map'
                },
                backgroundColor: '#ffffff',
                tooltip: {
                    trigger: 'item',
                    fontSize: 6,
                    formatter: (params) => {
                        // console.log('params', params)
                        console.log('value', params.value.val)
                        if (params.value.type == "link") {
                            return `balance of A: ${params.value.val[0]},<br/>
                                balance of B: ${params.value.val[1]},<br/>
                                transaction hash:</br> ${params.value.hash}`
                        } else {
                            return `account of node: ${params.value.account}</br>
                            account balance:${params.value.val}`
                        }

                    }
                },
                // legend: [
                //     {
                //         data: Json.categories.map(function (a) {
                //             return a.name;
                //         })
                //     }
                // ],


                series: [
                    {
                        name: 'Net',
                        type: 'graph',
                        layout: 'none',
                        data: Json.nodes,
                        links: Json.links,
                        categories: Json.categories,
                        roam: true,
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        },
                        edgeSymbol: ['circle', ''],
                        edgeSymbolSize: [4, 10],
                        // edgeLabel: {
                        //     fontSize: 14,
                        //     show: false,

                        // },
                        // labelLayout: {
                        //     hideOverlap: true
                        // },
                        scaleLimit: {
                            min: 0.4,
                            max: 2
                        },
                        lineStyle: {
                            color: '#6f9ee7',
                            curveness: 0,
                            width: 2
                        },
                        itemStyle: {
                            normal: { color: 'rgba(106,150,193,1)' }
                        }
                    }
                ]
            };
            myChart.setOption(option);
            // option && myChart.setOption(option);
        }
    }
}
</script>

<style scoped lang="less">
el-card {
    background-color: rgb(60, 58, 58);
}
</style>
