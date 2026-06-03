import api from '../axios';

export default {

  getAdminShopCaegory: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/shop-category?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),


  // getAdminShopPosCaegory: (
  //   filterQuery,
  //   page,
  //   paginate,
  //   sort = "",
  //   desc = true,
  // ) =>
  //   api.get(
  //     `admin/shop-category/pos?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
  //   ),

  shopCategoryDetails: (id, payload) => api.get(`admin/shop-category/${id}`, payload),
  shopCategoryCreate: (payload) => api.post('admin/shop-category/create', payload),
  shopCategoryUpdate: (id, payload) => api.put(`admin/shop-category/update/${id}`, payload),
  shopCategoryDelete: (id) => api.put(`admin/shop-category/delete/${id}`),

  shopCategoryCount: (id, payload) => api.get(`admin/shop-category/count/${id}`, payload),

  categoryCount: (id, payload) => api.get(`admin/category/count/${id}`, payload),

  shopItemData: (payload) => api.get(`admin/shop-product/itemdata`, payload),
  shopCategoryData: (payload) => api.get(`admin/shop-categorydata`, payload),
  shopSubCategoryData: (id, payload) => api.get(`admin/sub-categorydata/${id}`, payload),

  plasticItemData: (payload) => api.get(`admin/shop-product/plastic-itemdata`, payload),

  getAdminShopProducts: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/shop-product?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  shopProductDetails: (id, payload) => api.get(`admin/shop-product/${id}`, payload),
  shopProductCreate: (payload) => api.post('admin/shop-product/create', payload),
  shopNewProductCreate: (payload) => api.post('admin/shop-product/new-create', payload),
  shopProductUpdate: (id, payload) => api.put(`admin/shop-product/update/${id}`, payload),
  shopProductDelete: (id) => api.delete(`admin/shop-product/delete/${id}`),
  shopProductCancel: (id) => api.post(`admin/shop-product/cancel/${id}`),
  shopSubProductCancel: (id) => api.post(`admin/shop-product/sub-cancel/${id}`),


  getAdminPlasticProducts: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/plastic-product?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  plasticProductDetails: (id, payload) => api.get(`admin/plastic-product/${id}`, payload),
  plasticProductCreate: (payload) => api.post('admin/plastic-product/create', payload),
  plasticProductUpdate: (id, payload) => api.put(`admin/plastic-product/update/${id}`, payload),
  plasticProductDelete: (id) => api.delete(`admin/plastic-product/delete/${id}`),

  getSubCategory: (
    id,
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/sub-category/category/${id}?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  subCategoryDetails: (id, payload) => api.get(`admin/sub-category/${id}`, payload),
  subCategoryCreate: (payload) => api.post('admin/sub-category/create', payload),
  subCategoryUpdate: (id, payload) => api.put(`admin/sub-category/update/${id}`, payload),
  subCategoryDelete: (id) => api.put(`admin/sub-category/delete/${id}`),

  shopSubCategoryCount: (id, payload) => api.get(`admin/sub-category/count/${id}`, payload),

  subItemDetails: (id, payload) => api.get(`admin/shop-product/sub-item/${id}`, payload),
  subItemUpdate: (id, payload) => api.put(`admin/shop-product/sub-item/update/${id}`, payload),


  getShopCategoryProducts: (
    id,
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/shop-product/category/${id}?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getPosShopProducts: (
    id,
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/shop-product/pos/${id}?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getPosAllShopProducts: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/shop-product/pos/all?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),



  getPosReturnShopProducts: (
    id,
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/shop-product/return/pos/${id}?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),



  getCompanyShopProducts: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/items/company?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getCompanyReturnProducts: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/items/company/return?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getCompanyBeforeProducts: (
    cashier_id,
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/items/company/before/${cashier_id}?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

  getAdminSubItems: (
    item_id,
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
  ) =>
    api.get(
      `admin/items/sub_items/${item_id}?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
    ),

}