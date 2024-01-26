import React, { useEffect } from 'react';
import {
  PlusOutlined
} from '@ant-design/icons';

import {
  Button,
  Form,
  Input,
  Upload,
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
  useState
} from 'react';
import {
  useHistory
} from 'react-router-dom/cjs/react-router-dom.min';
import Loader from 'components/Loader/Loader';

function Category() {
  const [fileList, setFileList] = useState([]);
  const [data,setData]=useState(null);
  const [disabled,setDisabled]=useState(false)
  const [form] = Form.useForm();
  const navigate = useHistory();
  const location = useLocation()

  const history = location.search.split("?")[1];
  const query = history?history.split("=")[0]:null


  const onUploadChange = ({
    fileList: newFileList
  }) => {
    setFileList(newFileList);
  };

  async function useCategory() {
    if (query) {
      const data = await oneData(PRODUCT.one_category(query))
      return await data.data.category
    } else {
      return null
    }
  }

  useEffect(()=>{
    (async () => {
        setData(await useCategory())
       })();
  },[query])

  async function onFinish(values) {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('image', file.originFileObj);
    });

    formData.append('title', values.title);
    if (query) {
      try {
        setDisabled(true)
        await editData(PRODUCT.put_category(query),  formData,)
        message.success(`${values.title} successfully edited!`);
        navigate.push("/sample/category")
      } catch (error) {
        message.error(`Mission failed`)
      }
    } else {
      try {
        setDisabled(true)
        await postData(PRODUCT.post_category, formData)
        message.success(`${values.title} successfully added!`);
        navigate.push("/sample/category")
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

        <Form.Item initialValue={data.image} name="image"  >
          <Upload  
          listType="picture-card" 
          fileList={fileList}
          onChange={onUploadChange}
          beforeUpload={() => false} >
          <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Image</div>
          </div>
          </Upload>
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

          <Form.Item
           name="image"
           rules={[{ required: true, message: 'Please upload image' }]} >
            <Upload  
            listType="picture-card"  
            fileList={fileList}
            onChange={onUploadChange}
            beforeUpload={() => false}  >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Image</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item >
        <Button disabled={disabled} htmlType='submit' key="submit" type='primary'>Add</Button>
          </Form.Item>
        </Form>
  )
}

export default Category