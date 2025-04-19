import createBaseUri from "@/utils/createBaseUri.ts";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { MenuInfo, MenuName, MenuTree } from "@/utils/apiService/type/system/MenuDto";
import api from '../axios'



const MenuApiService = () => {
  const baseUri = createBaseUri("v1/system/menu");

  const getMenuTree = async () => {
    try {
      const response = await api.get<MenuTree[]>(`${baseUri}/tree`);
      console.log('response', response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Menu Tree: ${error}`);
    }
  };

  const getMenu = async (id: string) => {
    try {
      const response = await api.get<MenuInfo>(`${baseUri}/${id}`);
      console.log('response', response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Menu Data: ${error}`);
    }
  };
  
  const getMenuNameByParent = async (parentMenuId: string) => {
    try {
      const response = await api.get<MenuName>(`${baseUri}/name/${parentMenuId}`);
      // console.log('response', response);
      return response.data;
    }catch (error) {
      throw new Error(`Failed to fetch Menu Data: ${error}`);
    }
  };

  const getPrivateMenuNameByParent = async (parentMenuId: string) => {
    try {
      const response = await api.get<MenuName>(`${baseUri}/private/${parentMenuId}`);
      // console.log('response', response);
      return response.data;
    }catch (error) {
      throw new Error(`Failed to fetch Menu Data: ${error}`);
    }
  };

  const registerMenu = async (data: any) => {
    try {
      const response = await api.post(`${baseUri}`, data);
      console.log('response', response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to Register Menu Data: ${error}`);
    }
  };

  const modifyMenu = async (data: any, id: string) => {
    try {
      const response = await api.put(`${baseUri}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('response', response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to Modify Menu Data: ${error}`);
    }
  };

  const deleteMenu = async (id: string) => {
    try {
      const response = await api.delete(`${baseUri}/${id}`);
      console.log('response', response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to Delete Menu Data: ${error}`);
    }
  };

  return {
    getMenuTree,
    getMenu,
    getMenuNameByParent,
    getPrivateMenuNameByParent,
    registerMenu,
    modifyMenu,
    deleteMenu,
  };
}

export default MenuApiService;
