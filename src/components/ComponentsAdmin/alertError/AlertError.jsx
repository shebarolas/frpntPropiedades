import React from 'react';
import { Alert, Space } from 'antd';
const onClose = (e) => {
    console.log(e, 'I was closed.');
};

export const AlertError = ({error}) => {
    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >
            <Alert
                message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
                type="warning"
                closable
                onClose={onClose}
            />
            <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
                onClose={onClose}
            />
        </Space>
    )
}
