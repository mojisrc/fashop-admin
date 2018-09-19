import { Fetch } from "../../utils";
import { ArticleApi } from "../../config/api/article"

export const getArticleList = ({ params }) => {
    return Fetch.fetch({ api: ArticleApi.list, params })
}

export const getArticleInfo = ({ params }) => {
    return Fetch.fetch({ api: ArticleApi.info, params })
}
