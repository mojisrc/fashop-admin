## 使用

- 支持多种权限组合判断，如下：
```jsx
<CheckAuth action="goods/info && goods/list && ( order/list || order/info)">
 你要输出的权限内容
</CheckAuth>
```
