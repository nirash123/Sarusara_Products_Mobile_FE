import api from '../axios';

export default {

  adminLogin: (payload) => api.post('admin/login', payload),
  getCurrentUser: (payload) => api.post('admin/profile', payload),
  adminPasswordChange: (payload) => api.post('admin/change', payload),

  currentUserUpdate: (id,payload) => api.put(`admin/update/${id}`, payload),

  getNewCurrentUser: (payload) => api.post('admin/new-profile', payload),

  getAdminRole: (payload) => api.post('admin/role', payload),

  accountManagerUpdate: (id,payload) => api.put(`super-admin/update/${id}`, payload),

  getDeviceNumber: (id, payload) => api.post(`admin/device_number/${id}`, payload),

};
