module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],  // 设置根目录
        alias: {
          '@src': './src',  // 配置别名
        },
      },
    ],
  ],
};
