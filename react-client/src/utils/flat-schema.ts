import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import { IFieldTypeEnum, IModelTypeEnum } from '../types';
import isNil from './isNil';

const tableLengthFields = {
  fieldName: 'length',
  label: '',
  fieldType: 'number',
  modelType: 'numberinput',
  ghost: 1,
  defaultValue: 1,
  min: 1,
  modifiable: 1,
  previewable: 1,
  max: 999999,
};
/**
 * schema，把next中的children填充为完成的schema配置
 * @param flatSchemas array api层级的json结构
 * flatSchema中，某个参数设置完成的后续操作写在next.children里，children是一个string数组，需要去当前层级里查找fieldName与之相匹配的配置，回填到children里
 * @returns 生成一个完整的有UI层级的schema
 */
export const fillNext = (fields, rootSchemas) => {
  const list = fields.map(field => {
    const { fields, options, next } = field;
    if (fields) {
      field.fields = fillNext(fields, fields);
    }
    if (options) {
      field.options = fillNext(options, rootSchemas);
    }
    if (next) {
      const { children } = next;
      // 遍历children中的key,在传入的schemas中找到fieldName与之匹配的项，填充会children中，否则仍然返回为原本的内容
      next.children = children
        .map(fieldName => {
          const target = rootSchemas.find(s => {
            if (s.fieldName === fieldName) {
              s.previewable = 0;
              return s;
            }
            return false;
          });
          return target ? target : fieldName;
        })
        .filter(s => !!s);
    }
    return field;
  });
  return list;
};

// 把schema第一层级中，table模式中的fields根据模型数据做扩充
export const extendTableSchema = (schema, data) => {
  let options: any[] = [];
  schema.forEach(option => {
    if (option.modelType === IModelTypeEnum.table) {
      const { fieldName, label, maxLength } = option;
      // 根据data来扩充table类型的fields
      const expiredTableSize = get(data, [fieldName, 'length'], 0);
      // 插入一条数量field;
      tableLengthFields.fieldName = `${fieldName}.length`;
      tableLengthFields.label = `${label}数量`;
      tableLengthFields.max = maxLength;
      tableLengthFields.defaultValue = expiredTableSize;
      options.push(tableLengthFields);

      // 按照最大数量扩充ui
      for (let index = 0; index < maxLength; index++) {
        const element = cloneDeep(option);
        element.label = `${label} ${index + 1}`;
        element.fieldName = `${fieldName}[${index}]`;
        element.modelType = IModelTypeEnum.tableItem;
        element.fieldType = IFieldTypeEnum.object;
        element.uiHidden = [undefined, null];
        options.push(element);
      }
      return;
    }
    options.push(option);
  });
  return options;
};

export const getAvailableSchema = (originSchema, originData) => {
  const ghostSchema = cloneDeep(originSchema);
  const wholeSchema = fillNext(ghostSchema, ghostSchema).filter(schema => schema.previewable);
  const flatSchema = extendTableSchema(wholeSchema, originData);
  return flatSchema.map(item => {
    if (item.fields) {
      return { ...item, fields: flatSchemaFields(item, originData) };
    }
    return item;
  });
};
/**
 * 向数组中插入一条title类型的field
 * @param schema 原始的schema
 * @param finalArr 最终生成的数组
 */
const addTitleField = (schema, finalArr) => {
  const textSchema = cloneDeep(schema);
  delete textSchema.fields;
  finalArr &&
    finalArr.push({
      modelType: IModelTypeEnum.title,
      label: '',
      template: schema.label,
      modifiable: 0,
    });
};

/**
 * 向数组中插入一条组合展示的field
 * @param schema 需要把fields处理成组合类型的schema
 * @param finalArr 最终数组
 */
const addGroupInField = (schema, finalArr) => {
  const groupSchema = cloneDeep(schema);
  const { fields, previewable, modifiable } = groupSchema;
  groupSchema.children = fields.map(f => ({ ...f }));
  // 当需要组合时，一般认为内部左右参数的展示形式是一样的，所以取第一个可修改的组件的类型
  groupSchema.modelType = fields.find(item => item.modifiable).modelType;
  delete groupSchema.fields;
  finalArr && finalArr.push(groupSchema);
};

/**
 * 例如object、objectArray或者array等的内部属性放在fields里，这里将其扁平化，并移除previewable为0的参数
 * 扁平化处理的同时，为了取值方便，按照层级关系拼接fieldName
 * @param schemaWithFields 有层级的schema
 * @returns 扁平化并重新处理了fieldName的完整schema
 */
export const flatSchemaFields = (schemaWithFields, modelData) => {
  const flatFields: any[] = [];

  const flat = (schema, flatArr) => {
    const { fieldType, fields, fieldName: rootFieldName, groupIn, modelType, forbidden } = schema;
    if (forbidden) return;
    // 有fields数组时说明有层级嵌套，此时才做扁平化处理和重置fieldName
    if (Array.isArray(fields)) {
      /** modelType为title时，需要手动插入一条field， 因为ui里要展示 */
      if (modelType === IModelTypeEnum.title) {
        addTitleField(schema, flatArr);
      }

      // 遍历fields，重置fieldName,并递归扁平化field
      fields.forEach((item, index) => {
        setFieldName({ fieldType, rootFieldName, schema: item, index }, modelData);

        /** 注意： 当前参数是asyncSelect类型时，不再对fields做处理，由高阶组件 with-operation内做 */
        if (item.modelType === IModelTypeEnum.asyncSelect) {
          flatArr && flatArr.push(item);
        } else {
          // 当groupIn为1时，只需要继续递归处理fieldName，不需要对其fields继续扁平化
          flat(item, groupIn ? null : flatArr);
        }
      });

      // groupIn表示该schema内的fields需要组合到一起展示，否则默认每个fields的内容单独展示
      if (groupIn) {
        addGroupInField(schema, flatArr);
      }
    } else {
      // 当参数可预览时才保留
      schema.previewable !== 0 && flatArr && flatArr.push(schema);
    }
  };

  flat(cloneDeep(schemaWithFields), flatFields);
  return flatFields;
};

export const setFieldName = ({ fieldType, rootFieldName, schema, index = 0 }, modelData) => {
  let fieldName = rootFieldName;
  const { fieldName: originFieldName } = schema;

  if ([IFieldTypeEnum.objectArray].includes(fieldType)) {
    fieldName = fieldName + `[${index}]`;
    // hack写法，会员等级里如果没有某些插件时，个别的成长规则不支持配置，此时模型不会返回数据；
    // 所以这里临时加一个forbidden属性，在扁平化递归时过滤掉，从而做到页面上不展示
    // 以后接了权限或店铺能力后，这里可以删掉，根据那个时候的方案来做。
    if (isNil(get(modelData, fieldName))) {
      schema.forbidden = 1;
    }
  }
  // 根据数据结构生成新的fieldNAme, 没有fieldName是不继续拼接
  fieldName = fieldName + (schema.fieldName ? '.' + schema.fieldName : '');

  schema.fieldName = fieldName;
  // 初始的fieldName也继续保留
  schema.originFieldName = originFieldName;
};
