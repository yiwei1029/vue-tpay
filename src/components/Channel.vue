<template>
    <section class="Channel">
        <el-card>
            <el-row>
                <!--  左上支付通道-->
                <el-col :span="16">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-select placeholder="choose a channel" style="width: 100%;">
                                <el-option v-for="ch in Channels" :key="ch" :value="ch">
                                </el-option>
                            </el-select></el-col>
                        <el-col :span="6"><el-button type="primary">New</el-button></el-col>
                    </el-row>
                    <!-- 余额比例chart -->
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <div id="chart1" style="width:400px;height: 70px;"></div>
                        </el-col>
                        <el-col :span="6"><el-button type="danger">Close</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="10">Transaction fee: </el-col>
                        <el-col :span="6">{{ TxFees }}</el-col>
                    </el-row>
                    <!-- 输入手续费 -->
                    <el-row :gutter="10">
                        <el-col :span="10"><el-input></el-input> </el-col>
                        <el-col :span="6"><el-button type="primary">Update</el-button></el-col>
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
            <div id="chart2" style="width: 600px;height: 300px;"></div>
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
                { time: "18:46:05", txhash: "a" },
                { time: "18:46:05", txhash: "b" },
                { time: "18:46:05", txhash: "c" }
            ],
            Channels: ['ch1', 'ch2', 'ch3', 'ch4'],
            BalancePct: [
                { name: 'me', value: 100 },
                { name: 'counter', value: 200 }
            ],
            TxFees: 0.10,
            AmountProfit: {
                amount: [10, 20, 40, 50, 70, 100],
                profit: [1, 2, 4.8, 5.5, 7.9, 10.5]
            }
        }
    },
    components: {},
    watch: {},
    mounted() {
        this.createPieChart('chart1', this.BalancePct);
        this.createMixChart('chart2');
        // const testJson = require('../../static/Stu.json')
        // console.log('testData', testJson);

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
        createMixChart(divName) {
            var chart = echarts.init(document.getElementById(divName));

            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'cross' }
                },
                legend: {
                    orient: 'horizontal',
                    x: 'left',
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
