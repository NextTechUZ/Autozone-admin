import React from 'react';
import {useIntl} from 'react-intl';
import {Button, Checkbox, Form, Input} from 'antd';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';

const SignInJwtAuth = () => {
  const {signInUser} = useAuthMethod();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const {messages} = useIntl();

  return (
    <div className='sign'>
      <div className='sign-content'>
        <Form
          className='sign-form'
          name='basic'
          initialValues={{
            rememberMe: true,
            username: 'victus',
            password: '1212qwqw',
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='username'
            className='form-field'
            rules={[{required: true, message: 'Please input your Email!'}]}>
            <Input placeholder={messages['common.email']} />
          </Form.Item>

          <Form.Item
            name='password'
            className='form-field'
            rules={[{required: true, message: 'Please input your Password!'}]}>
            <Input.Password placeholder={messages['common.password']} />
          </Form.Item>

          <div className='rememberMe'>
            <Form.Item name='rememberMe' valuePropName='checked'>
              <Checkbox>
                <IntlMessages id='common.rememberMe' />
              </Checkbox>
            </Form.Item>
          </div>

          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.login' />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInJwtAuth;
