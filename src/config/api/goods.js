import { env } from '../root';
const ROOT_URL = `${env.domain}/admin/`;
export const GoodsApi = {
    list:{
        url: `${ROOT_URL}goods/list`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    add:{
        url: `${ROOT_URL}goods/add`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    edit:{
        url: `${ROOT_URL}goods/edit`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    info:{
        url: `${ROOT_URL}goods/info`,
        method: 'GET',
        showLoading: false,
        needLogin: true,
    },
    del:{
        url: `${ROOT_URL}goods/del`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    offSale:{
        url: `${ROOT_URL}goods/offSale`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    onSale:{
        url: `${ROOT_URL}goods/onSale`,
        method: 'POST',
        showLoading: false,
        needLogin: true,
    },
    spec:{
        list:{
            url: `${ROOT_URL}goodsspec/list`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        add:{
            url: `${ROOT_URL}goodsspec/add`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        }
    },
    specValue:{
        del:{
            url: `${ROOT_URL}Goodsspecvalue/del`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        add:{
            url: `${ROOT_URL}Goodsspecvalue/add`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },

    },
    batchUpshelf:{
        url: `${ROOT_URL}goods/batchUpshelf`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    batchDownshelf:{
        url: `${ROOT_URL}goods/batchDownshelf`,
        method: 'POST',
        showLoading: true,
        needLogin: true,
    },
    category:{
        list:{
            url: `${ROOT_URL}goodscategory/list`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        sort:{
            url: `${ROOT_URL}goodscategory/sort`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        del:{
            url: `${ROOT_URL}goodscategory/del`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        add:{
            url: `${ROOT_URL}goodscategory/add`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        edit:{
            url: `${ROOT_URL}goodscategory/edit`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        info:{
            url: `${ROOT_URL}goodscategory/info`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        }
    },
    evaluate:{
        list:{
            url: `${ROOT_URL}goodsevaluate/list`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        reply:{
            url: `${ROOT_URL}goodsevaluate/reply`,
            method: 'POST',
            showLoading: false,
            needLogin: true,
        },
        display:{
            url: `${ROOT_URL}goodsevaluate/display`,
            method: 'POST',
            showLoading: false,
            needLogin: true,
        }
    }
}
