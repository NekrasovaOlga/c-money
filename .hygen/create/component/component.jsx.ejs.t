---
to: <%= absPath %>/<%= component_name %>.jsx
---

import React from 'react';
import style from './<%= component_name %>.module.scss';

export const <%= component_name %> = props => {
    return <div className={style.container}></div>
}