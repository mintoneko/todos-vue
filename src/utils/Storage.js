// 存储数据（带一周有效期）
function setItemWithExpiration(key, value) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 7 * 24 * 60 * 60 * 1000 // 当前时间 + 7天
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// 读取数据（自动清除过期数据）
function getItemWithExpiration(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();

    // 过期检测
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    // 解析失败时移除无效数据
    localStorage.removeItem(key);
    return null;
  }
}

// 删除指定存储项
function removeItem(key) {
  localStorage.removeItem(key);
}

// 清理所有过期数据
function clearExpired() {
  Object.keys(localStorage).forEach(key => {
    getItemWithExpiration(key);
  });
}

export default {
  setItemWithExpiration,
  getItemWithExpiration,
  removeItem,
  clearExpired
}