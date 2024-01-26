import {api} from "../boot/axios";
  
  const getData = async (url) => {
    try {
      const res = await api.get(url)
      return res.data
    } catch {
     console.error("Error 404");
    }
  }
  
  const postData = async (url, data) => {
    try {
      const res = await api.post(url, data)
      return res.data
    } catch {
        console.error("Error 404");
    }
  }
  
  const editData = async (url, data) => {
    try {
      const res = await api.patch(url, data);
      return res.data;
    } catch (error) {
        console.error("Error 404") 
    }
  };
  
  const deleteData = async (url) => {
    try {
      const res = await api.delete(url);
      return res.data;
    } catch (error) {
        console.error("Error 404")
    }
  };
  const oneData = async (url) => {
    try {
      const res = await api.get(url)
      return res.data
    } catch (error) {
        console.error("Error 404")
    }
  }
  export {
    getData,
    postData,
    editData,
    deleteData,
    oneData
  };