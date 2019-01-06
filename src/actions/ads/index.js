import types from '../../constants';
import Fetch from "../../utils/fetch";
import {AdsApi} from "../../config/api/ads";

export const getAdsInfo = ()=>{
    return Fetch.fetch({ api: AdsApi.info })
}

export const saveAdsInfo = ({ params })=>{
    return Fetch.fetch({ api: AdsApi.setAdsInfo, params })
}


