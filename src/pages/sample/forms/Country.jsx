import React, { useEffect, useState } from 'react';

import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import {
  useLocation
} from 'react-router-dom';
import {
  editData,
  oneData,
  postData
} from 'services/useApi';
import {
  PRODUCT
} from 'boot/axios';

import {
  useHistory
} from 'react-router-dom/cjs/react-router-dom.min';
import Loader from 'components/Loader/Loader';


function Car() {
  const [form] = Form.useForm();
  const [data,setData]=useState(null);
  const [disabled,setDisabled]=useState(false)
  const navigate = useHistory();
  const location = useLocation()
  const history = location.search.split("?")[1];
  const query = history?history.split("=")[0]:null

  async function useCountry() {
    if (query) {
      const data = await oneData(PRODUCT.one_country(query))
      return await data.data.country
    } else {
      return null
    }
  }

  useEffect(()=>{
    (async () => {
        setData(await useCountry())
       })();
  },[query])
  
  async function onFinish(values) {
    if (query) {
      try {
        setDisabled(true)
        await editData(PRODUCT.put_country(query), {
          ...values,
          _id: data._id
        })
        message.success(`${values.title} successfully edited!`);
        navigate.push("/sample/country")
      } catch (error) {
        message.error(`Mission failed`)
      }
    } else {
      try {
        setDisabled(true)
        await postData(PRODUCT.post_country, values)
        message.success(`${values.title} successfully added!`);
        navigate.push("/sample/country")
      } catch (error) {
        message.error(`Mission failed`)
      }

    }
  }


  if (query) {
    return(
      <>
        {!data?<Loader/>:
        <Form
        layout="horizontal"
          style={{width:"400px", margin:"50px auto" ,textAlign:"center"}}
          onFinish={onFinish}
          form={form}
      >

      <Form.Item 
        initialValue={data.title} 
        name="title"  rules={[{ required: true, message: 'Please enter text' }]}>
        <Input  placeholder='Title' />
        </Form.Item>
        <Form.Item >
      <Button disabled={disabled} htmlType='submit' key="submit" type='primary'>Edit</Button>
        </Form.Item>
      </Form>}
      </>
    );
  }
  else
  return(
    <Form
    layout="horizontal"
    style={{width:"400px", margin:"50px auto" ,textAlign:"center"}}
    onFinish={onFinish}
    form={form}
        >
          <Form.Item  
          name="title" 
          rules={[{ required: true, message: 'Please enter text' }]}>
          <Input   placeholder='Title' />
          </Form.Item>
          <Form.Item >
        <Button disabled={disabled} htmlType='submit' key="submit" type='primary'>Add</Button>
          </Form.Item>
        </Form>
  )
}

export default Car