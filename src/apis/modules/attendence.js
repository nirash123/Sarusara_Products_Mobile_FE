
import api from '../axios';

export default {

    attendenceCreate: (id, payload) => api.post(`admin/attendences/create/${id}`, payload),
    attendencePastCreate: (id, payload) => api.post(`admin/attendences/create/past/${id}`, payload),

    getTodayAttendences: (filterQuery = "", page, paginate, sort = "", desc = true) =>
        api.get(
            `admin/attendences?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
        ),

    getTodayPendingAttendences: (filterQuery = "", page, paginate, sort = "", desc = true) =>
        api.get(
            `admin/attendences/pending?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&${filterQuery}`
        ),

    getPastAttendences: (
        selectedDate = "",
        filterQuery = "",
        page,
        paginate,
        sort = "",
        desc = true
    ) =>
        api.get(
            `admin/attendences/past?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&selectedDate=${selectedDate}&${filterQuery}`
        ),

    getPastPendingAttendences: (
        selectedDate = "",
        filterQuery = "",
        page,
        paginate,
        sort = "",
        desc = true
    ) =>
        api.get(
            `admin/attendences/past/pending?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&selectedDate=${selectedDate}&${filterQuery}`
        ),

    getAllAttendences: (payload) => api.get(`admin/attendences/all`, payload),

    getPendingAttendences: (params) => api.get(`admin/attendences/pending-present`, { params }),

    attendenceUpdate: (id, payload) => api.put(`admin/attendences/update/${id}`, payload),
    attendencePastUpdate: (id, payload) => api.put(`admin/attendences/update/past/${id}`, payload),
    attendenceDelete: (id) => api.delete(`admin/attendences/delete/${id}`),
    attendencePastDelete: (id) => api.delete(`admin/attendences/past/delete/${id}`),
    attendenceEdit: (id) => api.put(`admin/attendences/edit/${id}`),
    attendencePastEdit: (id) => api.put(`admin/attendences/past/edit/${id}`),
    attendenceSubmit: (id) => api.put(`admin/attendences/submit/${id}`),
    attendencePastSubmit: (id) => api.put(`admin/attendences/past/submit/${id}`),
    updateAttendencesStatus: (id, payload) => api.put(`admin/attendences/status/${id}`, payload),
    updatePastAttendencesStatus: (id, payload) => api.put(`admin/attendences/past/status/${id}`, payload),

    // Time

    settingTimeData: (payload) => api.get(`admin/attendences/timedata`, payload),
    timeUpdate: (id, payload) => api.put(`admin/attendences/timeUpdate/${id}`, payload),


    // Payments


    getTodayPayments: (params) => api.get(`admin/payments`, { params }),
    getPendingPayments: (params) => api.get(`admin/payments/pending-present`, { params }),
    getcompletedPayments: (params) => api.get(`admin/payments/completed`, { params }),

    paymentSubmit: (id) => api.put(`admin/payments/submit/${id}`),
    paymentPastSubmit: (id) => api.put(`admin/payments/past/submit/${id}`),

    getPastPayments: (
        selectedDate = "",
        filterQuery = "",
        page,
        paginate,
        sort = "",
        desc = true
    ) =>
        api.get(
            `admin/payments/past?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&selectedDate=${selectedDate}&${filterQuery}`
        ),

    getPastPendingPayments: (
        selectedDate = "",
        filterQuery = "",
        page,
        paginate,
        sort = "",
        desc = true
    ) =>
        api.get(
            `admin/payments/past/pending?page=${page}&paginate=${paginate}&sort=${desc ? "" : "-"}${sort}&selectedDate=${selectedDate}&${filterQuery}`
        ),

    // Paysheet

    getSalaryPaysheets: (
        month = "",
        page = 1,
        paginate = 15,
        sort = "",
        desc = true,
        nameOrEmail = ""
    ) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("paginate", paginate);

        if (month) {
            params.append("month", month); // ✅ correct (NOT filter[month])
        }

        if (sort) {
            params.append("sort", `${desc ? "" : "-"}${sort}`);
        }

        if (nameOrEmail) {
            params.append("filter[name_or_email]", nameOrEmail);
        }

        return api.get(`admin/salary_paysheets?${params.toString()}`);
    },

    getcompletedUserPayments: (id, payload) => api.get(`admin/payments/user-completed/${id}`, payload),
}