import { mock, Random } from 'mockjs';

let Policies = [];


function fetchList(req, res) {
  res.send({
    code: 200,
    message: 'success',
    data: Policies
  });
}

function fetchCreate(req, res) {
  const data = req.body;

  Policies.push({
    id: Random.guid(),
    type: 2,
    attachmentCount: 0,
    ...data
  });

  res.send({
    code: 200,
    message: 'success',
    data: {}
  });
}

function fetchRemove(req, res) {
  const { id } = req.params;

  Policies = Policies.filter(item => item.id !== id);

  res.send({
    code: 200,
    message: 'success',
    data: {}
  });
}


export default {
  'GET /api/policies/list': fetchList,
  'POST /api/policies/create': fetchCreate,
  'DELETE /api/policies/remove/:id': fetchRemove
};


