import { stateHoc } from 'ws-web-utils';
import {
    Loading as LoadingView,
    Failure as FailureView,
    Error as ErrorView,
    NullData as NullDataView,
} from '@/components/fetchView';


const ThisModule = (params = {}) => {
    return stateHoc(Object.assign({}, {
        LoadingView,
        FailureView,
        ErrorView,
        NullDataView,
    }, params))
}


export default ThisModule
