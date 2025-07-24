import CustomerTable from '@/components/supabase/CustomerTable';
// pages/customers.tsx

const CustomersPage = () => {
  return (
    <div>
      <h1>Customers</h1>
      <CustomerTable />
    </div>
  );
};

export default CustomersPage;