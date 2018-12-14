import { parse, stringify } from 'qs';
// todo params class
export default class Query {
    params;
    parse() {
        this.params = parse(window.location.href.split('?')[1])
        return this
    }

    delEmptyParams() {
        let params = this.params
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === "undefined") {
                delete this.params[key]
            }
        });
        return this
    }

    getParams() {
        return this.params
    }

    addParams(params) {
        Object.keys(params).forEach((key) => {
            this.params[key] = params[key]
        })
    }

    // todo fixed rules eq other field
    delParams(condition = [
        // 等于
        { key: 'state', rule: ['eq', 'all'] },
        // 依赖另外个字段的存在
        { key: 'keywords_type', rule: ['rely', 'keywords'] },
    ]) {
        for (var i = 0; i < condition.length; i++) {
            let rule = condition[i].rule
            let field = condition[i].key
            switch (rule[0]) {
                case 'eq':
                    if (this.params[field] === rule[1]) {
                        delete this.params[field]
                    }
                    break;
                case 'rely':
                    if (this.params[rule[1]] === undefined) {
                        delete this.params[field]
                    }
                    break;
                default:
                    break;
            }
        }
        return this
    }

    withPageParams() {
        const { page, rows } = Query.getPageLimit()
        this.addParams({ page, rows })
        return this
    }


    /**
     * 为了列表类型的接口调用方便
     * @param delCondition
     * @returns {*}
     */
    static invokerForListParams(delCondition = []) {
        const QueryClass = new Query()
        return QueryClass.parse().delEmptyParams().withPageParams().delParams(delCondition).getParams()
    }

    static getQuery() {
        return parse(window.location.href.split('?')[1]);
    }

    static getPath(path = '', query = {}) {
        const search = stringify(query);
        if (search.length) {
            return `${path}?${search}`;
        }
        return path;
    }

    static getPageLimit(page = 1, rows = 10) {
        const query = Query.getQuery();
        return {
            page: query['page'] !== undefined && parseInt(query['page'], 10) > 0 ? parseInt(query['page'], 10) : page,
            rows: query['rows'] !== undefined && parseInt(query['rows'], 10) > 0 ? parseInt(query['rows'], 10) : rows,
        }
    }

    static page(page = 1, rows = 10) {
        const { historyPrefix } = window.fashop
        const path = Query.getPath(window.location.pathname.replace(process.env.NODE_ENV === "production" && APP_TYPE !== "site" ? historyPrefix : historyPrefix, ''), {
            ...Query.getQuery(),
            page,
            rows
        })
        if(path.indexOf("/") === 0){
            return path
        }else{
            return `/${path}`
        }
    }

}
