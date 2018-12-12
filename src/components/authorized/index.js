import Authorized from './authorized';
import AuthorizedRoute from './authorizedRoute';
import Secured from './secured';
import check from './checkPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;

export default renderAuthorize(Authorized);
