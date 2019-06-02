import { Random } from 'mockjs';

const modules = [
  { id: 1, name: 'dashboard' },
  { id: 2, name: 'permission' }
];

let actions = [
  { moduleId: 1, name: 'analysis', displayName: 'Analysis', type: 1, remark: 'dashboard1' },
  { moduleId: 1, name: 'workplace',  displayName: 'Workplace',type: 1, remark: 'dashboard2' },
  { moduleId: 2, name: 'actionCreate', displayName: '创建操作API', type: 1, remark: '权限模块创建操作权限' },
  { moduleId: 2, name: 'actionUpdate', displayName: '更新操作API', type: 1, remark: '权限模块修改操作权限' },
  { moduleId: 2, name: 'actionRemove',  displayName: '删除操作API', type: 1, remark: '权限模块删除操作权限' },
  { moduleId: 2, name: 'actionList', displayName: '操作列表API', type: 1, remark: '权限模块查询列表权限' },
  { moduleId: 2, name: 'policyCreate', displayName: '权限策略创建API', type: 1, remark: '权限策略创建操作权限' },
  { moduleId: 2, name: 'policyUpdate', displayName: '权限策略修改API', type: 1, remark: '权限策略修改操作权限' },
  { moduleId: 2, name: 'policyRemove', displayName: '权限策略删除API', type: 1, remark: '权限策略删除操作权限' },
  { moduleId: 2, name: 'policyList', displayName: '权限策略列表API', type: 1, remark: '权限策略查询列表权限' },
];

actions = actions.map(item => {
  return {
    ...item,
    id: Random.guid()
  }
});

function getActions() {
  return actions.map((item) => {
    const action = { ...item };
    action['module'] = getModule(action.moduleId);

    delete action.moduleId;

    return action;
  });
}

function getModule(moduleId) {
  let module;

  for (let i = 0, len = modules.length; i < len; i++) {
    if (modules[i].id === moduleId) {
      module = modules[i];
    }
  }

  return module;
}

function fetchGetModules(req, res) {
  res.send({
    code: 200,
    data: modules,
    message: 'success'
  });
}

function fetchGetActions(req, res) {
  const { moduleId } = req.query;

  let list = getActions();

  if (moduleId) {
    list = list.filter((item) => item['module'].id === Number(moduleId))
  }

  res.send({
    code: 200,
    data: list,
    message: 'success'
  });
}

function fetchUpdateAction(req, res) {
  const data = req.body;

  const id = data.id;

  actions = actions.map(item => {
    if (item['id'] === id) {
      return data;
    } else {
      return item;
    }
  });

  res.send({
    code: 200,
    data: {},
    message: 'success'
  });
}

function fetchRemoveAction(req, res) {
  const { id } = req.body;

  actions = actions.filter(item => item['id'] !== id);

  res.send({
    code: 200,
    data: {},
    message: 'success'
  });
}

function fetchCreate(req, res) {
  const data = req.body;

  actions.push({
    ...data,
    type: 2,
    id: Random.guid()
  });

  res.send({
    code: 200,
    data: {},
    message: 'success'
  });
}

export default {
  'GET /api/actions/modules': fetchGetModules,
  'POST /api/actions/create': fetchCreate,
  'GET /api/actions/list': fetchGetActions,
  'PUT /api/actions/update': fetchUpdateAction,
  'DELETE /api/actions/remove': fetchRemoveAction
};
