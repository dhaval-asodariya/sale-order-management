import React, { useState } from 'react';
import { Box, Button, useDisclosure,Stack, Text,useToast} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSaleOrders, addSaleOrder, updateSaleOrder,updateProducts,fetchProducts } from '../api/index';
import SaleOrderTable from '../components/SaleOrderTable';
import { Skeleton } from '@chakra-ui/react'
import AddEditOrderForm from '../components/AddEditOrderForm';

function SalesDashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isActiveSale, setIsActiveSale] = useState(true)
    const queryClient = useQueryClient();
    const toast = useToast()
  
    const { data: saleOrders, isLoading, error } = useQuery({
      queryKey: ['saleOrders'],
      queryFn: fetchSaleOrders,
    });
    const { data: products } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });
  console.log("saleOrders",saleOrders)
 


  const addMutation = useMutation({
    mutationFn: addSaleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saleOrders'] })
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSaleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saleOrders'] })
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  });

  const handleAdd = () => {
  console.log("currentOrder2",currentOrder)

    setCurrentOrder(null);
  console.log("currentOrder1",currentOrder)

    onOpen();
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);
    onOpen();
  };

  const handleSubmit = (data) => {
    var itemAvailable = true
    var leftQuantity =-1
    
      data.items.forEach((item)=>{
         leftQuantity = item.quantity_in_inventory - item.quantity;
       if(leftQuantity<0){
          itemAvailable = false
          return
       }
      })
  
 
      if ( currentOrder) {
          updateMutation.mutate({id: currentOrder.id , ...data});

      } else if(itemAvailable){
          data.items.forEach((item)=>{
                leftQuantity = item.quantity_in_inventory - item.quantity;
                updateProductMutation.mutate({id:item.sku_id,qunt:leftQuantity})
          })
          addMutation.mutate(data);

      } else{
        toast({
            title: 'insuficient quantity',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
      }
        
    onClose();
    
  };

  if(isLoading){
    return (<Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>)
  }
  return (
    <Box>
       <Text fontSize='3xl'>Sale Dashboard</Text>
       <Text fontSize='2xl'> {isActiveSale?'Active Sale orders':'Complited Sale Orders'}</Text>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Stack direction={'row'} sx={{marginTop:'10px'}} spacing={7}>
            <Button colorScheme='teal' onClick={()=>setIsActiveSale(true)}>Active Sale Orders</Button>
            <Button colorScheme='blue'onClick={()=>setIsActiveSale(false)}>Complited Sale Orders</Button>

        </Stack>
        <Button onClick={handleAdd} colorScheme="blue" mb="4">+ Sale Order</Button>
        </Box>
        <SaleOrderTable orders={saleOrders?.filter(order =>isActiveSale?!order.paid :order.paid)} 
         onEdit={handleEdit} 
        />

        <AddEditOrderForm
          isOpen={isOpen}
          onClose={onClose}
          initialData={currentOrder}
          setInitialData={setCurrentOrder}
          onSubmit={handleSubmit}
          isActiveSale={isActiveSale}
          products = {products}
        />
    </Box>
  )
}

export default SalesDashboard