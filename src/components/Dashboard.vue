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
        <!-- 交易列表和网络 -->
        <el-card>
            <el-row>
                <!-- free rate dist -->
                <el-col :span="6">
                    <div id="chart1" style="width: 100%; height: 300px;"></div>
                </el-col>
                <!-- 网络图 -->
                <el-col :span="12">2</el-col>
                <!-- 最近的交易 -->
                <el-col :span="6">
                    <div>Latest transations</div>
                    <el-table :data="LatestTrx" style="width: 100%">
                        <el-table-column prop="time" label="time" width="">
                        </el-table-column>
                        <el-table-column prop="txhash" label="txhash" width="">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
        <!-- 第三行 -->
        <el-card>
            <el-row>
                <!-- inbalance payment channels -->
                <el-col :span="6">
                    <div id="chart2" style="width: 100%;height: 300px;"></div>
                </el-col>
                <!-- succcess ratio 折线图-->
                <el-col :span="12">
                    <div id="chart3" style="width: 100%; height: 300px;"></div>
                </el-col>
                <!-- 交易数量图 -->
                <el-col :span="6">
                    <div id="chart4" style="width: 100%; height: 300px;"></div>

                </el-col>
            </el-row>
        </el-card>
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
                { time: "18:46:05", txhash: "a" },
                { time: "18:46:05", txhash: "b" },
                { time: "18:46:05", txhash: "c" }
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
                'WareHouse-first': [0.5, 0.1, 0.3, 0.8, 0.7],
                'Baseline-greedy': [0.2, 0.3, 0.2, 0.4, 0.3],
                'Baseline-random': [0.1, 0.2, 0.3, 0.4, 0.5]
            }

        }
    },
    components: {},
    watch: {},
    mounted() {
        this.createPieChart('chart1', this.FreeRateDist),
            this.createPieChart('chart2', this.InbPayChannel),
            this.createLineChart('chart3'),
            this.createHistChart('chart4')
    },
    methods: {
        createPieChart(divName, dataArray) {
            var chart = echarts.init(document.getElementById(divName));
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
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
        createLineChart(divName) {
            var chart = echarts.init(document.getElementById(divName));

            var option = {
                legend: {
                    orient: 'horizontal',
                    x: 'left',
                    left: 0,
                    data: ['WareHouse-first', 'Baseline-greedy', 'Baseline-random']
                },
                xAxis: {
                    data: ['9:07', '9:08', '9:09', '9:10', '9:11']
                },
                yAxis: {},
                series: [
                    {
                        name: 'WareHouse-first',
                        data: this.SuccessRatio['WareHouse-first'],
                        type: 'line',
                        stack: 'x',
                        areaStyle: {},
                        smooth: 'true'
                    },
                    {
                        name: 'Baseline-greedy',
                        data: this.SuccessRatio['Baseline-greedy'],
                        type: 'line',
                        stack: 'x',
                        areaStyle: {},
                        smooth: 'true'

                    },
                    {
                        name: 'Baseline-random',
                        data: this.SuccessRatio['Baseline-random'],
                        type: 'line',
                        stack: 'x',
                        areaStyle: {},
                        smooth: 'true'

                    }
                ]
            };
            chart.setOption(option)
        },
        createHistChart(divName) {
            var chart = echarts.init(document.getElementById(divName));

            var option = {
                legend: {
                    orient: 'horizontal',
                    x: 'left',
                    left: 0,
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
            };
            chart.setOption(option)
        },
        createMapGraph(divName, Jsonpath) {
            var chartDom = document.getElementById(divName);
            var myChart = echarts.init(chartDom);
            var option;

            myChart.showLoading();

            myChart.hideLoading();
            option = {
                tooltip: {},
                legend: [
                    {
                        data: graph.categories.map(function (a) {
                            return a.name;
                        })
                    }
                ],
                series: [
                    {
                        name: 'Les Miserables',
                        type: 'graph',
                        layout: 'none',
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        roam: true,
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        },
                        labelLayout: {
                            hideOverlap: true
                        },
                        scaleLimit: {
                            min: 0.4,
                            max: 2
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                ]
            };
            myChart.setOption(option);


            option && myChart.setOption(option);
        }
    }
}
</script>

<style scoped lang="less"></style>
