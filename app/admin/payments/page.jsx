"use client"
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import DataTable from 'react-data-table-component';

import { apiGet } from '@/src/services/api/api_service';
import { customStyles } from '@/src/styles/admin/datatable/customStyles';
import { paymentColumns } from '@/src/utils/data/columns/paymentColumns';

function Payments() {
  
  const getPayments = async () => {
    const {data} = await apiGet('payments');
    return data;
  }

  const {data,isLoading,error} = useQuery({
    queryKey: ['payments'],
    queryFn: getPayments
  })


  return (
    <div>
      {isLoading ? <div>Loading...</div>:
      <DataTable 
        data={data}
        columns={paymentColumns}
        customStyles={customStyles}
      />
      }
    </div>
  )
}

export default Payments