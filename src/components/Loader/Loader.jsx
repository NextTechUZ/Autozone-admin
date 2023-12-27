import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
function Loader() {
    return (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40,marginTop:"160px" }} spin />} />
    )
}

export default Loader
