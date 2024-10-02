import React, { Suspense } from 'react';
const Loadable = (Component) => (props) =>
(
<Suspense fallback={<div>LOADING........</div>}>
    <Component {...props} />
</Suspense>
);

export default Loadable;