<template>
  <a-scrollbar class="h-full overflow-y-auto">
    <MsFormTable
      :data="props.requestResult?.responseResult.assertions"
      :columns="columns"
      :selectable="false"
      :scroll="props.scroll"
    >
      <template #assertionItem="{ record }">
        <a-tooltip :content="record.name">
          <div class="flex items-center gap-[4px]">
            【{{
              t(
                responseAssertionTypeMap[(record as ResponseAssertionTableItem).assertionType] ||
                  'apiTestDebug.responseBody'
              )
            }}】
            {{ record.name }}
          </div>
        </a-tooltip>
      </template>
      <template #condition="{ record }">
        <div class="pl-[8px]">
          {{
            record.assertionType === FullResponseAssertionType.RESPONSE_TIME
              ? t('advanceFilter.operator.le')
              : t(statusCodeOptions.find((item) => item.value === record.condition)?.label || '-')
          }}
        </div>
      </template>
      <template #status="{ record }">
        <MsTag :type="record.pass === true ? 'success' : 'danger'" theme="light">
          {{ record.pass === true ? t('common.success') : t('common.fail') }}
        </MsTag>
      </template>
    </MsFormTable>
  </a-scrollbar>
</template>

<script setup lang="ts">
  import { statusCodeOptions } from '@/components/pure/ms-advance-filter/index';
  import MsFormTable from '@/components/pure/ms-form-table/index.vue';
  import { MsTableColumn } from '@/components/pure/ms-table/type';
  import MsTag from '@/components/pure/ms-tag/ms-tag.vue';

  import { useI18n } from '@/hooks/useI18n';

  import { RequestResult, ResponseAssertionTableItem } from '@/models/apiTest/common';
  import { FullResponseAssertionType } from '@/enums/apiEnum';

  import { responseAssertionTypeMap } from '@/views/api-test/components/config';

  const { t } = useI18n();
  const props = defineProps<{
    requestResult?: RequestResult;
    scroll?: {
      x?: number | string;
      y?: number | string;
      maxHeight?: number | string;
      minWidth?: number | string;
    };
  }>();

  const columns: MsTableColumn = [
    {
      title: 'apiTestDebug.assertionItem',
      dataIndex: 'assertionItem',
      slotName: 'assertionItem',
      width: 200,
    },
    {
      title: 'apiTestDebug.actualValue',
      dataIndex: 'actualValue',
      slotName: 'actualValue',
      showTooltip: true,
      inputType: 'text',
      width: 200,
    },
    {
      title: 'apiTestDebug.condition',
      dataIndex: 'condition',
      slotName: 'condition',
      width: 120,
    },
    {
      title: 'apiTestDebug.expectedValue',
      dataIndex: 'expectedValue',
      slotName: 'expectedValue',
      showTooltip: true,
      inputType: 'text',
      width: 200,
    },
    {
      title: 'apiTestDebug.status',
      dataIndex: 'pass',
      slotName: 'status',
      width: 120,
    },
    {
      title: 'apiTestDebug.reason',
      dataIndex: 'message',
      slotName: 'message',
      showTooltip: true,
      inputType: 'text',
      width: 300,
    },
  ];
</script>

<style lang="less" scoped>
  .arco-scrollbar {
    @apply h-full;
  }
</style>
