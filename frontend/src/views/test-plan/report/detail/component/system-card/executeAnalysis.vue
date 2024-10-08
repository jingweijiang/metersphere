<template>
  <div class="mb-[16px] font-medium">{{ t('report.detail.executionAnalysis') }}</div>
  <SetReportChart
    size="130px"
    :legend-data="legendData"
    :options="executeCharOptions"
    :request-total="getIndicators(getTotal) || 0"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import SetReportChart from '@/views/api-test/report/component/case/setReportChart.vue';

  import { commonConfig, seriesConfig, statusConfig, toolTipConfig } from '@/config/testPlan';
  import { useI18n } from '@/hooks/useI18n';

  import type { LegendData } from '@/models/apiTest/report';
  import type { PlanReportDetail, StatusListType } from '@/models/testPlan/testPlanReport';

  import { getIndicators } from '@/views/api-test/report/utils';

  const { t } = useI18n();

  const props = defineProps<{
    detail: PlanReportDetail;
    animation?: boolean; // 是否开启动画
  }>();

  const legendData = ref<LegendData[]>([]);

  // 执行分析
  const executeCharOptions = ref({
    ...commonConfig,
    tooltip: {
      ...toolTipConfig,
    },
    animation: props.animation === undefined ? true : props.animation, // 关闭渲染动画
    series: {
      ...seriesConfig,
      data: [
        {
          value: 0,
          name: t('common.success'),
          itemStyle: {
            color: '#00C261',
          },
        },
        {
          value: 0,
          name: t('common.fakeError'),
          itemStyle: {
            color: '#FFC14E',
          },
        },
        {
          value: 0,
          name: t('common.fail'),
          itemStyle: {
            color: '#ED0303',
          },
        },
        {
          value: 0,
          name: t('common.unExecute'),
          itemStyle: {
            color: '#D4D4D8',
          },
        },
        {
          value: 0,
          name: t('common.block'),
          itemStyle: {
            color: '#B379C8',
          },
        },
      ],
    },
  });

  function initExecuteOptions() {
    const pieBorderWidth =
      statusConfig.filter((e) => Number(props.detail.executeCount[e.value]) > 0).length === 1 ? 0 : 2;
    executeCharOptions.value.series.data = statusConfig
      .filter((item) => props.detail.executeCount[item.value] > 0)
      .map((item: StatusListType) => {
        return {
          value: props.detail.executeCount[item.value] || 0,
          name: t(item.label),
          itemStyle: {
            color: item.color,
            borderWidth: pieBorderWidth,
            borderColor: '#ffffff',
          },
        };
      });
    legendData.value = statusConfig.map((item: StatusListType) => {
      const rate = (props.detail.executeCount[item.value] / props.detail.caseTotal) * 100;
      return {
        ...item,
        label: t(item.label),
        count: props.detail.executeCount[item.value] || 0,
        rote: `${Number.isNaN(rate) ? 0 : rate.toFixed(2)}%`,
      };
    }) as unknown as LegendData[];
  }

  const getTotal = computed(() => {
    const { executeCount } = props.detail;
    const { success, error, fakeError, pending, block } = executeCount;
    return success + error + fakeError + pending + block;
  });

  watchEffect(() => {
    if (props.detail) {
      initExecuteOptions();
    }
  });
</script>

<style scoped></style>
