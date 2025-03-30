class SetId {
  static generateId() {
    const a=Date.now().toString(36);
    // 时间戳确保基础唯一性，随机数增加随机因子
    // 转36进制，.substr(2,9)截取小数点后9位
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
}

export default SetId;
// 碰撞概率极低的随机序列