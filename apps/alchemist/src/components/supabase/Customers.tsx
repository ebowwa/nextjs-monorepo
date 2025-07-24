// components/ui/common/table/TableContent.ts
export const tableContent = {
    caption: 'Supabase Customers Table Usage',
    header: [
      { title: 'Operation' },
      { title: 'Code' },
    ],
    body: [
      {
        operation: 'Select ID',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select('id')`,
      },
      {
        operation: 'Select Stripe Customer ID',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select('stripe_customer_id')`,
      },
      {
        operation: 'Select User ID',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select('user_id')`,
      },
      {
        operation: 'Read All Rows',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select('*')`,
      },
      {
        operation: 'Read Specific Columns',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select('some_column,other_column')`,
      },
      {
        operation: 'Read Referenced Tables',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select(\`
      some_column,
      other_table (
        foreign_key
      )
    \`)`,
      },
      {
        operation: 'With Pagination',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .range(0, 9)`,
      },
      {
        operation: 'With Filtering',
        code: `let { data: customers, error } = await supabase
    .from('customers')
    .select("*")
    .eq('column', 'Equal to')
    .gt('column', 'Greater than')
    .lt('column', 'Less than')
    .gte('column', 'Greater than or equal to')
    .lte('column', 'Less than or equal to')
    .like('column', '%CaseSensitive%')
    .ilike('column', '%CaseInsensitive%')
    .is('column', null)
    .in('column', ['Array', 'Values'])
    .neq('column', 'Not equal to')
    .contains('array_column', ['array', 'contains'])
    .containedBy('array_column', ['contained', 'by'])`,
      },
      {
        operation: 'Insert a Row',
        code: `const { data, error } = await supabase
    .from('customers')
    .insert([
      { some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select()`,
      },
      {
        operation: 'Insert Many Rows',
        code: `const { data, error } = await supabase
    .from('customers')
    .insert([
      { some_column: 'someValue' },
      { some_column: 'otherValue' },
    ])
    .select()`,
      },
      {
        operation: 'Upsert Matching Rows',
        code: `const { data, error } = await supabase
    .from('customers')
    .upsert({ some_column: 'someValue' })
    .select()`,
      },
      {
        operation: 'Update Matching Rows',
        code: `const { data, error } = await supabase
    .from('customers')
    .update({ other_column: 'otherValue' })
    .eq('some_column', 'someValue')
    .select()`,
      },
      {
        operation: 'Delete Matching Rows',
        code: `const { error } = await supabase
    .from('customers')
    .delete()
    .eq('some_column', 'someValue')`,
      },
      {
        operation: 'Subscribe to All Events',
        code: `const customers = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'customers' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()`,
      },
      {
        operation: 'Subscribe to Inserts',
        code: `const customers = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'customers' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()`,
      },
      {
        operation: 'Subscribe to Updates',
        code: `const customers = supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'customers' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()`,
      },
      {
        operation: 'Subscribe to Deletes',
        code: `const customers = supabase.channel('custom-delete-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'customers' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()`,
      },
      {
        operation: 'Subscribe to Specific Rows',
        code: `const customers = supabase.channel('custom-filter-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'customers', filter: 'column_name=eq.someValue' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()`,
      },
    ],
  };