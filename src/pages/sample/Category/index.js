import { useQuery } from 'react-query';
import { Button, Modal, Table, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteData, getData } from 'services/useApi';
import { PRODUCT } from 'boot/axios';
import { getDateFromString } from 'services';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from 'components/Loader/Loader';


const Category = () => {

  async function useCategories() {
    const data = await getData(PRODUCT.category)
    return await data.data.categories
  }

 const { data,isLoading,refetch }= useQuery("categories", useCategories);

 async function deleteCategory(params) {
  await deleteData(PRODUCT.delete_category(params))
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
    title: 'Action',
    key: 'action',
    dataIndex:"_id",
    render: (_id) => (
      <div style={{display:"flex"}}>
      <Button style={{padding:"3px 12px" ,marginRight:"5px"}}  type="primary"  >
        <Link  to={`/sample/form/category?${_id}`}><EditOutlined/></Link>
      </Button>
        <Button style={{padding:"3px 12px"}}  type='danger' 
         onClick={() => {
          Modal.confirm({
            title: 'Are you sure?',
            onOk:()=>{deleteCategory(_id)},
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
  <Button type='primary' style={{marginBottom:"30px"}}><Link to="/sample/form/category"><PlusOutlined/> Add</Link></Button>
   <Table columns={columns} dataSource={data}   pagination={{ pageSize: 5 }}  />
</div>
    }
    </>
  );
};

export default Category;
