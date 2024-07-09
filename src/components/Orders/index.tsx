// pages/orders.tsx
import { supabase } from '@/lib/supabaseClient';
import useAuth from '@/store/useAuth';
import React, { useEffect, useState } from 'react';
import { Order } from '@/types/orders.interfaces';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('All');
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error(error);
        } else {
          setOrders(data as Order[]);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredOrders = orders.filter((order) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return order.status === 'Completed';
    if (filter === 'Cancelled') return order.status === 'Cancelled';
    return true;
  });

  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const PaginationComponent = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 mx-1 rounded-full ${i === currentPage && 'bg-white text-pink-500 border border-pink-500'}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center mt-6 pb-5">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className={`w-8 h-8 mx-1 rounded-full ${currentPage === 1 ? 'text-gray-300' : 'text-black'}`}
        >
          &lt;
        </button>
        {pages}
        <button
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          className={`w-8 h-8 mx-1 rounded-full ${currentPage === totalPages ? 'text-gray-300' : 'text-black'}`}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{t('Orders')}</h1>
      <div className='bg-white rounded-md shadow-lg'>
        <div className='flex gap-5 pt-10 px-5'>
          <h1 className="text-2xl font-semibold mb-4">{t('numbersOrders')}</h1>
          <div className="flex items-center mb-6">
            <Button
              onClick={() => setFilter('All')}
              className={`mr-4 rounded-full ${filter === 'All' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              {t('All')}
            </Button>
            <Button
              onClick={() => setFilter('Completed')}
              className={`mr-4 rounded-full ${filter === 'Completed' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              {t('Completed')}
            </Button>
            <Button
              onClick={() => setFilter('Cancelled')}
              className={`mr-4 rounded-full ${filter === 'Cancelled' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              {t('Cancelled')}
            </Button>
          </div>
        </div>
        <Table cellPadding={0} aria-label="Orders Table" className='!w-full'>
          <TableHeader>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Order ID')}</TableColumn>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Customer')}</TableColumn>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Date')}</TableColumn>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Time')}</TableColumn>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Mode')}</TableColumn>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Total')}</TableColumn>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Payment Method')}</TableColumn>
            <TableColumn className="border-b border-t py-5 border-gray-200">{t('Status')}</TableColumn>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.order_id} className="border-b border-gray-200">
                <TableCell className="border-b py-5 border-gray-200">{`#${order.order_id}`}</TableCell>
                <TableCell className="border-b border-gray-200">{order.customer}</TableCell>
                <TableCell className="border-b border-gray-200">{order.date}</TableCell>
                <TableCell className="border-b border-gray-200">{order.time}</TableCell>
                <TableCell className="border-b border-gray-200">{order.mode}</TableCell>
                <TableCell className="border-b border-gray-200">{`$${order.total}`}</TableCell>
                <TableCell className="border-b border-gray-200">{order.payment_method}</TableCell>
                <TableCell className="border-b border-gray-200">
                  <span className={`px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-200 text-green-800' : order.status === 'Pending' ? 'bg-gray-200 text-black' : 'bg-red-200 text-red-800'}`}>
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationComponent />
      </div>
    </div>
  );
};

export default Orders;
