import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { PRODUCT } from 'boot/axios';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { editData, getData, oneData, postData } from 'services/useApi';

function Product() {
    const [fileList, setFileList] = useState([]);
    const [disabled,setDisabled]=useState(false)
    const location = useLocation();
    const navigate = useHistory();
    const history = location.search.split("?")[1];
     const query = history?history.split("=")[0]:null;
     const [form] = Form.useForm();
     const [data,setData]=useState(null);

     async function useCars() {  
        const data = await getData(PRODUCT.car)
        return await data.data.cars
      }
      async function useCategories() {
        const data = await getData(PRODUCT.category)
        return await data.data.categories
      }
      async function useCountries() {
        const data = await getData(PRODUCT.country)
        return await data.data.countries
      }
     
     async function useProduct() {
        if (query) {
          const data = await oneData(PRODUCT.one_product(query))
          return await data.data.product
        } else {
          return null
        }
      }

      const onUploadChange = ({
        fileList: newFileList
      }) => {
        setFileList(newFileList);
      };

  useEffect(()=>{
    (async () => {
        setData(await useProduct())
       })();
  },[query])
 
  const {data:cars ,isLoading:carLoading}=useQuery("cars",useCars);
  const { data:categories,isLoading:categoryLoading }= useQuery("categories", useCategories);
  const { data:countries,isLoading:countryLoading, }= useQuery("countries", useCountries)

  async function onFinish(values) {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('image', file.originFileObj);
    });

    formData.append('title', values.title);
    formData.append('country', values.country);
    formData.append('car', values.car);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('price', values.price);

    if (query) {
      try {
        setDisabled(true)
        await editData(PRODUCT.put_product(query),  formData,)
        message.success(`${values.title} successfully edited!`);
        navigate.push("/sample/product")
      } catch (error) {
        message.error(`Mission failed`)
      }
    } else {
      try {
        setDisabled(true)
        await postData(PRODUCT.post_product, formData)
        message.success(`${values.title} successfully added!`);
        navigate.push("/sample/product")
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
        layout="vertical"
        style={{width:"400px", margin:"50px auto" ,textAlign:"center"}}
        form={form}
        onFinish={onFinish}
      >
     <Form.Item 
        initialValue={data.title} 
        name="title"  rules={[{ required: true, message: 'Please enter text' }]}>
        <Input  placeholder='Title' />
        </Form.Item>
        
        <Form.Item initialValue={data.price} name="price"  rules={[{ required: true, message: 'Please enter price' }]}>
        <InputNumber placeholder='Price' />
        </Form.Item>

        <Form.Item  name="image"  >
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
        
        <Form.Item  initialValue={data.car._id}  name="car" label="Car">
          <Select>
            {carLoading?"":cars.map(el=><Select.Option key={el._id} value={el._id}>{el.title}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item   initialValue={data.country._id}  name="country" label="Country">
          <Select>
            {countryLoading?"":countries.map(el=><Select.Option key={el._id} value={el._id}>{el.title}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item   initialValue={data.category._id}  name="category" label="Category">
          <Select>
            {categoryLoading?"":categories.map(el=><Select.Option key={el._id} value={el._id}>{el.title}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item   initialValue={data.description}  name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item >
        <Button disabled={disabled} htmlType='submit' key="submit" type='primary'>Edit</Button>
          </Form.Item>
      </Form>
      }
        </>
    )
   } else {
    return(
        <Form
        layout="vertical"
        style={{width:"400px", margin:"50px auto" ,textAlign:"center"}}
        form={form}
        onFinish={onFinish}
      >
     <Form.Item 
          name="title"  rules={[{ required: true, message: 'Please enter text' }]}>
        <Input  placeholder='Title' />
    </Form.Item>

        <Form.Item name="image"  >
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

        <Form.Item name="car" label="Car">
          <Select>
            {carLoading?"":cars.map(el=><Select.Option key={el._id} value={el._id}>{el.title}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item name="country" label="Country">
          <Select>
            {countryLoading?"":countries.map(el=><Select.Option key={el._id} value={el._id}>{el.title}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Select>
            {categoryLoading?"":categories.map(el=><Select.Option key={el._id} value={el._id}>{el.title}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item name="price"  rules={[{ required: true, message: 'Please enter price' }]}>
        <InputNumber placeholder='Price' />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item >
        <Button disabled={disabled} htmlType='submit' key="submit" type='primary'>Add</Button>
          </Form.Item>
      </Form>
    )
   }
}

export default Product
