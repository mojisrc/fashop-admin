import Search from "./search";
import Query from "@/utils/query";
import { parse, stringify } from "qs";
import { history as router } from "umi";

const count = (params) => {
    let count = 0;
    for (var property in params) {
        if (Object.prototype.hasOwnProperty.call(params, property)) {
            count++;
        }
    }
    return count;
};

class PageList {
    static Search = Search;
    page = 1;
    rows = 10;
    type = 1;// 1浏览器输入框获得参数模式  2外部传参模式
    /**
     * string | function
     */
    router;
    param = {};
    rule = [];
    refresh = () => {
    };
    defaultParam = {};
    submit = (values) => {
        this.param = values;
        this.setPage(1);
        this.push();
    };
    reset = () => {
        this.param = this.defaultParam;
        this.setPage(1);
        this.push();
    };
    setPage = (page) => {
        this.page = page ? page : 1;
        return this;
    };
    getParam = () => {
        return this.param;
    };
    push = () => {
        switch (this.type) {
            case 1:
                let path;
                if (typeof this.router === "function") {
                    path = this.router();
                } else {
                    path = this.router;
                }
                const search = stringify(this.filter());
                if (count(search) > 0) {
                    path = `${path}${path.indexOf("?") === -1 ? "?" : "&"}${search}`;
                }
                router.push(path);
                this.refresh();
                break
            case 2:
                this.refresh();
                break
        }
    };

    filter = () => {
        const query = new Query();
        return query.setParams({
            ...this.param,
            page: this.page,
            rows: this.rows
        }).delEmptyParams().delParams(this.rule).getParams();
    };

    constructor(options) {
        let params = parse(window.location.href.split("?")[1]);
        if (typeof options["page"] !== "undefined") {
            this.page = options["page"];
        } else if (typeof params["page"] !== "undefined") {
            this.page = parseInt(params["page"]);
        }
        if (typeof options["rows"] !== "undefined") {
            this.rows = options["rows"];
        } else if (typeof params["rows"] !== "undefined") {
            this.rows = parseInt(params["rows"]);
        }
        if (typeof options["router"] !== "undefined") {
            this.router = options["router"];
        }
        if (typeof options["param"] !== "undefined") {
            this.param = options["param"];
            this.defaultParam = options["param"];
        }
        if (typeof options["rule"] !== "undefined") {
            this.rule = options["rule"];
        }
        if (typeof options["refresh"] !== "undefined") {
            this.refresh = options["refresh"];
        }
        if (typeof options["submit"] !== "undefined") {
            this.submit = options["submit"];
        }
        if (typeof options["reset"] !== "undefined") {
            this.reset = options["reset"];
        }
        if (typeof options["type"] !== "undefined") {
            this.type = options["type"];
        }
        if (count(params) > 0) {
            let _params = {};
            Object.keys(params).forEach((key) => {
                if (typeof params[key] !== "undefined") {
                    _params[key] = params[key];
                }
            });
            this.param = Object.assign({}, options["param"], _params);
        }
    }
}

export default PageList;
