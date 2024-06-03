import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { FaEllipsisH } from 'react-icons/fa';

function SaleOrderTable({orders,onEdit}) {
 console.log('sell table called')
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Invoice No</Th>
          <Th>Customer(id)</Th>
          <Th>Date</Th>
          <Th>Paid</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map(order => (
          <Tr key={order.id}>
            <Td>{order.invoice_no}</Td>
            <Td>{order.customer_name} ({order.customer_id})</Td>
            <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
            <Td>{order.paid ? 'Yes' : 'No'}</Td>
            <Td>
              <IconButton
                icon={<FaEllipsisH />}
                onClick={() => onEdit(order)}
                variant="ghost"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};



export default SaleOrderTable