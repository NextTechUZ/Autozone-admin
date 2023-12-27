import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Table, message } from 'antd'
import { PRODUCT } from 'boot/axios'
import React from 'react'
import { useQuery } from 'react-query'
import { getDateFromString } from 'services'
import { deleteData, getData } from 'services/useApi'
import "./index.css"
import { Link } from 'react-router-dom'
import Loader from 'components/Loader/Loader'

function Product() {
 
  async function setData() {
    const data = await getData(PRODUCT.product)
    return await data.data.products
  }
   const { data,isLoading,refetch }= useQuery("products", setData);
   async function deleteProduct(params) {
    await deleteData(PRODUCT.delete_product(params))
    refetch()
    message.success("Deleted")
  }
   const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    
    {
      title: 'Date',
    dataIndex: 'created',
    key: 'created',
    render:(text)=> (
      <p>{getDateFromString(text)}</p>
    )
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      render(image){
        return <><img width="100" height="80" src={`https://api.autozoneshop.uz/images/${image}`}/></>
      }
    },
    {
      title:"Price",
      key:"price",
      dataIndex:"price"
    },
    {
      title:"Category",
      key:"category",
      dataIndex:"category",
      render:(category)=>(
        <p className="description">{category.title}</p>
      )
    },
    {
      title:"Car",
      key:"car",
      dataIndex:"car",
      render:(car)=>(
        <p className="description">{car.title}</p>
      )
    },
    {
      title:"Country",
      key:"country",
      dataIndex:"country",
      render:(country)=>(
        <p className="description" >{country.title}</p>
      )
    },
    {
      title:"Description",
      key:"description",
      dataIndex:"description",
      render:(text)=>(
        <p className="description">{text}</p>
      )
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex:"_id",
      render: (_id) => (
        <div style={{display:"flex"}}>
        <Button style={{padding:"3px 12px" ,marginRight:"5px"}}  type="primary"  >
          <Link  to={`/sample/form/product?${_id}`}><EditOutlined/></Link>
        </Button>
          <Button style={{padding:"3px 12px"}}  type='danger' 
           onClick={() => {
            Modal.confirm({
              title: 'Are you sure?',
              onOk:()=>{deleteProduct(_id)},
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              ),
            });
          }}
          ><DeleteOutlined /></Button>
          </div>
      ),
    },
  ];
  
    return (
        <>
         {isLoading?<Loader/>:  
         <div>
         <Button type='primary' style={{marginBottom:"30px"}}><Link to="/sample/form/product"><PlusOutlined/>  Add</Link></Button>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
       </div>}
      </> 
    )
}

export default Product
