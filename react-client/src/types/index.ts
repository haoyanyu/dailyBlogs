export interface IPreviewListItem {
  options: any[];
  config: any;
  title?: string;
  type: string;
}

export enum ISessionStatusEnum {
  initial, // 初始化/会话开始(未产生对话)
  chatting, // 对话进行中
  pause, // 会话中断
  restart, // 会话继续
  end, // 会话结束
  temp,
}

interface IMessageContentDTO {
  /** 消息类型  TEXT 文本消息  DISPLAY_TABLE 展示面板消息  UPDATE_TABLE 操作面板消息  OPERATION 用户操作消息(执行/关闭) */
  msgType?: string;
  /** 模型 id */
  modelId?: number;
  /** 操作类型  1 - 执行  2 - 取消 */
  operateType?: number;
  /** 面板 id */
  tableId?: number;
  /** 面板的值 */
  value?: string;
  /** 是否需要前端展示  0-不展示  1-展示 */
  isDisplay?: boolean;
  /** 消息体 */
  content?: string;
  /** 面板状态  0-dead, 无法操作  1-live, 可操作 */
  tableStatus?: number;
}

export interface IMessageItem {
  tableStatus?: number;
  /** 消息角色 */
  role: string;
  /** 是否删除 */
  isDeleted?: number;
  /** 消息 id */
  messageId: string;
  /** 消息序号 */
  index: number;
  /** 会话 id */
  sessionId: number;
  /** 创建时间 */
  createAt?: number;
  /** 消息内容 */
  messageContent: IMessageContentDTO;
}

export interface PreviewRoutes {
  /** 路由名称 */
  path: string;
  params?: any;
  component?: Element | null;
}

export enum IOperateTypeEnum {
  close = 'CLOSE',
  execute = 'EXECUTE',
}

export enum IModelStatusEnum {
  // 模型状态 0-参数不完整 1-初始化(完整渲染) 2-结束(已执行) 3-异常(关闭)
  /** 0-参数不完整 */
  lackParams,
  /** 1-初始化(完整渲染 */
  success,
  /** 2-结束(已执行) */
  finished,
  /** 3-异常(关闭) */
  abnormal,
  /** 更多操作执行中 */
  extra,
}

export enum IFieldTypeEnum {
  array = 'array',
  objectArray = 'objectArray',
  string = 'string',
  number = 'number',
  object = 'object',
  boolean = 'boolean',
}

export enum IModelTypeEnum {
  input = 'input', // 输入框展示
  numberinput = 'numberinput', // 数字输入框展示
  select = 'select', // 选择（单选/多选）
  reconfirm = 'reconfirm', // 二次确认选择（单选）
  group = 'group', // 组合类型，表示内部包含多个大参数，需要拆分开展示
  table = 'table', // 等价于table
  tableItem = 'tableItem', // 等价于table
  asyncSelect = 'asyncSelect', // 组件需要查询api展示数据，供选择（例如： 选择商品、优惠券、赠品、客户群体等）
  dateRange = 'dateRange', // 日期区间类型
  title = 'title', // 标题
}
