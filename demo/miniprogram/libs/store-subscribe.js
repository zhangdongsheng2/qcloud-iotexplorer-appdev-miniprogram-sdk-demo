const store = require('../redux/index');

/**
 * @typedef {object} StoreChangeListener redux store 变化 listener
 * @property {function} getter 接受一个 state 参数，返回 state 中被监听变化的字段的值
 * @property {function} onChange 变化回调函数，被监听字段变化时被调用，第一个参数为变化后的值，第二个参数为变化前的值
 * @property {function} onInit 初始值回调函数，取得被监听的字段的初始值时被调用，第一个参数为被监听的字段的初始值
 * @property {function} onInitAndChange 在取得被监听的字段的初始值，以及被监听字段变化时被调用，第一个参数为变化后（或初始）的值
 */

/**
 * 注册若干个 redux store 变化 listener
 * @param {StoreChangeListener[]} definitions listener 定义数组
 * @return {Function} 如果需要解绑变化 listener，执行返回的函数即可
 */
module.exports.subscribeStore = (definitions) => {
  const listeners = [];
  const state = store.getState();

  definitions.forEach(({
    getter,
    onChange = null,
    onInit = null,
    onInitAndChange = null,
  }) => {
    const initialValue = getter(state);
    onInit = onInit || onInitAndChange;
    onChange = onChange || onInitAndChange;
    if (onInit) {
      onInit(initialValue);
    }
    if (onChange) {
      listeners.push({
        getter,
        onChange,
        value: initialValue,
      });
    }
  });

  return store.subscribe(() => {
    const state = store.getState();
    listeners.forEach((listener) => {
      const { getter, onChange, value: oldValue } = listener;
      const newValue = getter(state);
      if (oldValue !== newValue) { // 浅比较
        listener.value = newValue;
        onChange(newValue, oldValue);
      }
    });
  });
};

const statePropGetter = (state, fieldDesc) => {
  let val = state;
  if (Array.isArray(fieldDesc)) {
    fieldDesc.forEach((key) => {
      if (typeof val !== 'object' || val === null) {
        console.error('statePropGetter fail', fieldDesc, key, state);
        val = null;
      } else {
        val = val[key];
      }
    });
  } else {
    val = val[fieldDesc];
  }

  return val === undefined ? null : val;
};

module.exports.mapStateToData = (stateArray, that) => {
  return stateArray.map((key) => {
    if (Array.isArray(key)) {
      const storeField = key[0];
      const dataKey = key[1];
      return {
        getter: (state) => statePropGetter(state, storeField),
        onInitAndChange: (value) => that.setData({ [dataKey]: value }),
      };
    } else {
      return {
        getter: (state) => statePropGetter(state, key),
        onInitAndChange: (value) => that.setData({ [key]: value }),
      };
    }
  });
};
