<template>
    <section class="Channel">
        <el-card>
            <el-row>
                <!--  左上支付通道-->
                <el-col :span="16">
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-select placeholder="choose a channel" style="width: 100%;">
                                <el-option v-for="ch in Channels" :key="ch" :value="ch">
                                </el-option>
                            </el-select></el-col>
                        <el-col :span="6"><el-button type="primary" style="width: 100%;">New</el-button></el-col>
                    </el-row>
                    <br />
                    <!-- 余额比例chart -->
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <div id="chart1" style="width:100%;height: 200px;"></div>
                        </el-col>
                        <el-col :span="6"><el-button type="danger" style="width: 100%;">Close</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">Current transaction fee: </el-col>
                        <el-col :span="6">{{ TxFees }}</el-col>
                    </el-row>
                    <br />
                    <!-- 输入手续费 -->
                    <el-row :gutter="10">
                        <el-col :span="16"><el-input placeholder="Input a transaction fee(%)"></el-input> </el-col>
                        <el-col :span="6"><el-button type="primary" style="width: 100%;">Update</el-button></el-col>
                    </el-row>

                </el-col>


                <!-- 右上 -->
                <el-col :span="8">
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

        <!-- 中间 交易数量和收益折线图 -->
        <el-card>
            <div id="chart2" style="width: 100%;height: 300px;"></div>
        </el-card>
        <!--  统计底部栏-->
        <el-card>
            <!-- 第一行 -->
            <el-row>
                <el-col :span="12" v-for="s in Stats">
                    <el-statistic :title="s.title">
                        <template slot="formatter">
                            {{ s.value + s.unit }}
                        </template>
                    </el-statistic>
                </el-col>
            </el-row>

        </el-card>
    </section>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'Channel',
    data() {
        return {
            LatestTrx: [
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." }
            ],
            Channels: ['ch1', 'ch2', 'ch3', 'ch4'],
            BalancePct: [
                { name: 'me', value: 100 },
                { name: 'counter', value: 200 }
            ],
            TxFees: '1%',
            AmountProfit: {
                amount: [10, 20, 40, 50, 70, 100],
                profit: [1, 2, 4.8, 5.5, 7.9, 10.5]
            },
            Stats: [
                { title: 'Today Revenue', value: 1.04, unit: 'Bitcoins' },
                { title: 'Today Transactions', value: 732, unit: '' },
            ]
        }
    },
    components: {},
    watch: {},
    mounted() {
        this.createPieChart('chart1', this.BalancePct);
        this.createMixChart('chart2', 'Profit and Amount');
        // const testJson = require('../../static/Stu.json')
        // console.log('testData', testJson);

    },
    methods: {
        createPieChart(divName, dataArray) {
            var chart = echarts.init(document.getElementById(divName));
            var option = {
                title: {
                    text: 'BalancePctage'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    x: 'left',
                    left: 150,
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
        createMixChart(divName, title) {
            var chart = echarts.init(document.getElementById(divName));

            var option = {
                title: {
                    text: title
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'cross' }
                },
                legend: {
                    orient: 'horizontal',
                    y: 'bottom',
                    left: 0,
                    data: ['profit', 'amount'],

                },
                xAxis: {
                    data: ['9:07', '9:08', '9:09', '9:10', '9:11', '9:12'],
                    axisTick: {
                        alignWithLabel: true
                    },
                },
                yAxis: [{
                    type: 'value', name: 'profit', position: 'left', min: 0,
                    max: 20,
                },
                {
                    type: 'value', name: 'amount', position: 'right', min: 0,
                    max: 200
                }],
                series: [
                    {
                        name: 'profit',
                        data: this.AmountProfit['profit'],
                        type: 'line',
                        areaStyle: {},
                        smooth: 'true',

                        yAxisIndex: 0
                    },
                    {
                        name: 'amount',
                        data: this.AmountProfit['amount'],
                        type: 'bar',
                        areaStyle: {},
                        smooth: 'true',
                        yAxisIndex: 1,

                    },
                ]
            };

            chart.setOption(option)
        },
    }
}
</script>

<style scoped lang="less"></style>
