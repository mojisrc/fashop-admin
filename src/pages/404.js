import React from 'react';
import { Link } from 'umi';
import { formatMessage } from '@/utils/locale';
import Exception from '@/components/exception';

export default () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'app.exception.description.404' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);
