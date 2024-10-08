import type { MsSearchSelectProps, RadioProps } from '@/components/business/ms-select';

import { FilterType, OperatorEnum } from '@/enums/advancedFilterEnum';

import type { CascaderOption, TreeNodeData } from '@arco-design/web-vue';
import type { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list-v2/interface';
import type { TreeSelectProps } from '@arco-design/web-vue/es/tree-select/interface';

export type CascaderModelValue = string | number | Record<string, any> | (string | number | Record<string, any>)[];

export interface MsCascaderProps {
  modelValue: CascaderModelValue;
  options: CascaderOption[];
  mode?: 'MS' | 'native'; // MS的多选、原生;这里的多选指的是出了一级以外的多选，一级是顶级分类选项只能单选。原生模式使用 arco-design 的 cascader 组件，只加了getOptionComputedStyle
  prefix?: string; // 输入框前缀
  levelTop?: string[]; // 顶级选项，多选时则必传
  level?: string; // 顶级选项，该级别为单选选项
  multiple?: boolean; // 是否多选
  strictly?: boolean; // 是否严格模式
  virtualListProps?: VirtualListProps; // 传入开启虚拟滚动
  panelWidth?: number; // 下拉框宽度，默认为 150px
  placeholder?: string;
  loading?: boolean;
  optionSize?: 'small' | 'default';
  pathMode?: boolean; // 是否开启路径模式
  valueKey?: string;
  labelKey?: string; // 传入自定义的 labelKey
}

export interface FilterFormItem {
  dataIndex?: string; // 第一列下拉的value
  title?: string; // 第一列下拉显示的label
  operator?: OperatorEnum; // 第二列的值
  type: FilterType; // 类型：判断第二列下拉数据和第三列显示形式
  value?: any; // 第三列的值
  customField?: boolean; // 是否是自定义字段
  cascaderOptions?: CascaderOption[]; // 级联选择的选项
  selectProps?: Partial<MsSearchSelectProps>; // select的props, 参考 MsSelect
  cascaderProps?: Partial<MsCascaderProps>; // cascader的props, 参考 MsCascader
  treeSelectData?: TreeNodeData[];
  treeSelectProps?: Partial<TreeSelectProps>;
  radioProps?: Partial<RadioProps>;
  checkProps?: Partial<RadioProps>;
}

export type AccordBelowType = 'AND' | 'OR';

export type CombineItem = Pick<FilterFormItem, 'value' | 'operator' | 'customField'>;
export interface ConditionsItem extends CombineItem {
  name?: string;
}

export interface FilterResult {
  // 匹配模式 所有/任一
  searchMode: AccordBelowType;
  // 高级搜索
  conditions?: ConditionsItem[];
  combine?: any; // TODO lmy 此为防报错占位 所有高级筛选都完成后 删除这一行
}
