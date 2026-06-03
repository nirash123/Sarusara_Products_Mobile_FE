import api from '../axios';

export default {


  getTodayIncomeCashs: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    cash_type,
  ) =>
    api.get(
      `admin/cashs/today-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&cash_type=${cash_type}&${filterQuery}`
    ),


  getPastIncomeCashs: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      cash_type,
    ) =>
      api.get(
        `admin/cashs/past-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&cash_type=${cash_type}&${filterQuery}`
      ),

  
    getTodayExpenditureCashs: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      cash_type,
    ) =>
      api.get(
        `admin/cashs/today-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&cash_type=${cash_type}&${filterQuery}`
      ),

    getPastExpenditureCashs: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      cash_type,
    ) =>
      api.get(
        `admin/cashs/past-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&cash_type=${cash_type}&${filterQuery}`
      ),


    getTodayIncomeCards: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cards/today-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),


      getPastIncomeCards: (
        filterQuery,
        page,
        paginate,
        sort = "",
        desc = true,
        card_type,
      ) =>
        api.get(
          `admin/cards/past-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
        ),
        

    getTodayExpenditureCards: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cards/today-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),

    getPaymentExpenditureCards: (
        filterQuery,
        page,
        paginate,
        sort = "",
        desc = true,
        card_type,
      ) =>
        api.get(
          `admin/cards/payment-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
        ),

    getPastExpenditureCards: (
        filterQuery,
        page,
        paginate,
        sort = "",
        desc = true,
        card_type,
      ) =>
        api.get(
          `admin/cards/past-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
        ),

 

      payExpenditureCard: (id, payload) => api.post(`admin/cards/pay/${id}`, payload),
      cancelExpenditureCard: (id) => api.post(`admin/cards/cancel/${id}`),



    // Cheques

    getTodayIncomeCheques: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cheques/today-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),

    getTodayExpenditureCheques: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cheques/today-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),


     getPaymentIncomeCheques: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cheques/payment-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),

    getPaymentExpenditureCheques: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cheques/payment-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),

   getPastIncomeCheques: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cheques/past-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),

  getPastExpenditureCheques: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      card_type,
    ) =>
      api.get(
        `admin/cheques/past-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&card_type=${card_type}&${filterQuery}`
      ),

    payIncomeCheque: (id, payload) => api.post(`admin/cheques/pay/income/${id}`, payload),
    cancelIncomeCheque: (id) => api.post(`admin/cheques/cancel/income/${id}`),

    chequeUpdate: (id, payload) => api.put(`admin/cheques/update/${id}`, payload),
    chequeDetails: (id) => api.post(`admin/cheques/details/${id}`),
    payExpenditureCheque: (id, payload) => api.post(`admin/cheques/pay/${id}`, payload),
    cancelExpenditureCheque: (id) => api.post(`admin/cheques/cancel/${id}`),

    



    

  getTodayIncomeCredits: (
    filterQuery,
    page,
    paginate,
    sort = "",
    desc = true,
    credit_type,
  ) =>
    api.get(
      `admin/credits/today-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&credit_type=${credit_type}&${filterQuery}`
    ),


  getPastIncomeCredits: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      credit_type,
    ) =>
      api.get(
        `admin/credits/past-income?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&credit_type=${credit_type}&${filterQuery}`
      ),

  
    getTodayExpenditureCredits: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      credit_type,
    ) =>
      api.get(
        `admin/credits/today-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&credit_type=${credit_type}&${filterQuery}`
      ),

    getPastExpenditureCredits: (
      filterQuery,
      page,
      paginate,
      sort = "",
      desc = true,
      credit_type,
    ) =>
      api.get(
        `admin/credits/past-expenditure?page=${page}&paginate=${paginate}&sort=${ desc ? "" : "-"}${sort}&credit_type=${credit_type}&${filterQuery}`
      ),



    
} 
