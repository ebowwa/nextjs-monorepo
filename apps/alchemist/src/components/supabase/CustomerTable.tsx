"use client";// components/ui/common/table/Table.tsx
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/utils/supabase/config';
import { tableContent } from './Customers';
import { Database } from '../../../types_db'; // Assuming this file is in the same directory

type Customer = Database['public']['Tables']['customers']['Row'];

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CustomerTable = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [selectedOperation, setSelectedOperation] = useState(tableContent.body[0].operation);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCustomerData(selectedOperation);
      setCustomerData(data);
    };
    fetchData();
  }, [selectedOperation]);

  return (
    <div>
      <select value={selectedOperation} onChange={(e) => setSelectedOperation(e.target.value)}>
        {tableContent.body.map((row) => (
          <option key={row.operation} value={row.operation}>
            {row.operation}
          </option>
        ))}
      </select>
      <table>
        <caption>{tableContent.caption}</caption>
        <thead>
          <tr>
            {customerData[0] && Object.keys(customerData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customerData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

export async function fetchCustomerData(operation: string): Promise<any[]> {
    const { data, error } = await supabaseClient
      .rpc(tableContent.body.find((row) => row.operation === operation)?.code || '')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching customer data:', error);
          return { data: [], error: null };
        }
        return { data, error: null };
      });
  
    return data || [];
  }