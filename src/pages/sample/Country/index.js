import React from 'react';
import { useQuery } from 'react-query';
import { Button, Modal, Table, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteData, getData } from 'services/useApi';
import { PRODUCT } from 'boot/axios';
import { getDateFromString } from 'services';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from 'components/Loader/Loader';

const Country= () => {
 
  async function useCountries() {
    const data = await getData(PRODUCT.country)
    return await data.data.countries
  }

 const { data,isLoading,refetch }= useQuery("countries", useCountries)
 async function deleteCountry(params) {
  await deleteData(PRODUCT.delete_country(params))
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
    title: 'Action',
    key: 'action',
    dataIndex:"_id",
    render: (_id) => (
      <div style={{display:"flex"}}>
      <Button style={{padding:"3px 12px" ,marginRight:"5px"}}  type="primary"  >
        <Link  to={`/sample/form/country?${_id}`}><EditOutlined/></Link>
      </Button>
        <Button style={{padding:"3px 12px"}}  type='danger' 
         onClick={() => {
          Modal.confirm({
            title: 'Are you sure?',
            onOk:()=>{deleteCountry(_id) },
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
      <Button type='primary' style={{marginBottom:"30px"}}><Link to="/sample/form/country"><PlusOutlined/>  Add</Link></Button>
       <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>}
    </>
  );
};

export default Country;
