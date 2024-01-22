<template>
    <section class="Channel">

        <el-row :gutter="10">
            <!--  左上支付通道-->
            <el-col :span="16">
                <el-card>
                    <el-row :gutter="10">
                        <el-col :span="16">
                            <el-select v-model="ChannelToSelect" placeholder="choose a channel" style="width: 100%;">
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
                        <el-col :span="6"><el-button @click="ChannelToSelect = ''" type="danger"
                                style="width: 100%;">Close</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="16">Current transaction fee: {{ TxFees }} </el-col>
                        <el-col :span="6"></el-col>
                    </el-row>
                    <br />
                    <!-- 输入手续费 -->
                    <el-row :gutter="10">
                        <el-col :span="16"><el-input v-model="TxFeesToUpdate"
                                placeholder="Input a transaction fee(%)"></el-input> </el-col>
                        <el-col :span="6"><el-button @click="TxFees = TxFeesToUpdate + '%'" type="primary"
                                style="width: 100%;">Update</el-button></el-col>
                    </el-row>
                </el-card>
            </el-col>

            <!-- 右上 -->

            <el-col :span="8" style="height: 388px; overflow: scroll;">
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

        <el-row :gutter="10">
            <!-- 中间 交易数量和收益折线图 -->

            <el-col :span="16">
                <el-card>
                    <div id="chart2" style="width: 100%;height: 300px;"></div>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-row v-for="s in Stats">
                    <el-card style="height: 105px; padding: 30px;">
                        <el-statistic :title="s.title">
                            <template slot="formatter">
                                {{ s.value + s.unit }}
                            </template>
                        </el-statistic>
                    </el-card>
                </el-row>
            </el-col>
        </el-row>

        <!--  统计底部栏-->


    </section>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'Channel',
    data() {
        return {
            ChannelToSelect: '',
            LatestTrx: [
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." },
                { time: "18:46:05", txhash: "81f004a7d6480ad33cca1cb3f7b76233bce5400cc990c..." }
            ],
            Channels: ['ch1', 'ch2', 'ch3', 'ch4'],
            BalancePct: [
                {
                    name: 'User1', value: {
                        value: 100,
                        itemStyle: {
                            color: '#41b883'
                        }
                    }
                },
                {
                    name: 'User2', value: {
                        value: 200,
                        itemStyle: {
                            color: '#35495e'
                        }
                    }
                }
            ],
            TxFees: '1%',
            AmountProfit: {
                amount: [10, 20, 40, 50, 70, 100],
                profit: [1, 2, 4.8, 5.5, 7.9, 10.5]
            },
            Stats: [
                { title: 'Today Revenue', value: 1.04, unit: 'Bitcoins' },
                { title: 'Today Transactions', value: 732, unit: '' },
            ],
            TxFeesToUpdate: ''
        }
    },
    components: {},
    watch: {},
    mounted() {
        this.createBarChart('chart1', this.BalancePct);
        this.createMixChart('chart2', 'Profit and Amount');
        // const testJson = require('../../static/Stu.json')
        // console.log('testData', testJson);

    },
    methods: {
        createBarChart(divName, dataArray) {
            var chart = echarts.init(document.getElementById(divName));
            var option = {
                title: {
                    text: 'BalancePctage'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} "
                },
                legend: {
                    orient: 'horizontal',
                    x: 'left',
                    left: 150,
                    data: dataArray.map(item => item.name)
                },
                xAxis: {

                },
                yAxis: {
                    data: dataArray.map(item => item.name)
                },
                series: [
                    {
                        type: 'bar',
                        data: dataArray.map((item) => item.value)
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
                        lineStyle: {
                            color: '#5470C6',
                            width: 3
                        },
                        // areaStyle: {},
                        smooth: 'true',

                        yAxisIndex: 0
                    },
                    {
                        name: 'amount',
                        data: this.AmountProfit['amount'],
                        type: 'bar',
                        // areaStyle: {},
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
