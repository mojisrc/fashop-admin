import { mock, Random } from 'mockjs';

let Groups = [];
const count = 20;

for (let i = 0; i < count; i++) {
  Groups.push(mock({
    id: '@guid',
    name: '@first',
    displayName: '@cword(3)',
    userNumber: 10,
    remark: '@cparagraph(1)',
    createTime: +Random.date('T'),
  }))
}

function fetchAll(req, res) {
  res.send({
    code: 200,
    message: 'success',
    data: {
      list: Groups
    }
  });
}

function fetchList(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const pageList = Groups.filter((item, index) => {
    return index < limit * page && index >= limit * (page - 1)
  });

  res.send({
    code: 200,
    message: 'success',
    data: {
      list: pageList,
      total: Groups.length
    }
  });
}

function fetchCreate(req, res) {
  const data = req.body;

  Groups.push({
    ...data,
    id: Random.guid(),
    createTime: new Date().getTime()
  });

  res.send({
    code: 200,
    message: 'success',
    data: {}
  });
}

function fetchRemove(req, res) {
  const { groupId } = req.params;

  Groups = Groups.filter(item => item.id !== groupId);

  res.send({
    code: 200,
    message: 'success',
    data: {}
  });
}

function fetchUpdate(req, res) {
  const data = req.body;

  const groupId = data.id;

  Groups = Groups.map(item => {
    if (item.id === groupId) {
      return data;
    } else {
      return item;
    }
  });

  res.send({
    code: 200,
    message: 'success',
    data: {}
  });
}

export default {
  'GET /api/groups/all': fetchAll,
  'GET /api/groups/list': fetchList,
  'Post /api/groups/create': fetchCreate,
  'DELETE /api/groups/remove/:groupId': fetchRemove,
  'PUT /api/groups/update': fetchUpdate,
};
