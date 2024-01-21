<template>
    <section class="Execute">
        <!-- 选择路径 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="left-right">
                        <span>Receiver</span>
                        <el-input style="width: 50%;">
                        </el-input>
                    </div>

                    <div class="left-right">
                        <span>Amount</span>
                        <el-input style="width: 50%;"></el-input>
                    </div>
                </el-col>

                <el-col :span="8">
                    <el-button type="primary" style="width: 100%;">Route</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- route地图 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16">
                    route
                </el-col>

                <el-col :span="8">
                    <el-button type="primary" style="width: 100%;">Send</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- 最近的交易 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div id="chart1" style="width: 800px; height: 300px;"></div>
                </el-col>

                <el-col :span="8">
                    <!-- 最近的交易 -->
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

    </section>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'Execute',
    data() {
        return {
            LatestTrx: [
                { time: "18:46:05", txhash: "a" },
                { time: "18:46:05", txhash: "b" },
                { time: "18:46:05", txhash: "c" }
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
