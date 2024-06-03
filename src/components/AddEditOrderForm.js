import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,Text,Radio,Stack,RadioGroup
} from '@chakra-ui/react';
import Select from 'react-select';
import { fetchCustomers, fetchProducts } from '../api';
import { generateUniqueInvoiceNumber } from '../uniqueInvoiceNo'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';



const AddEditOrderForm = ({ isOpen, onClose, initialData, onSubmit ,isActiveSale,setInitialData,products}) => {
  const [formData, setFormData] = useState({
    invoice_no:'',
    customer_id: '',
    customer_name:'',
    invoice_no: generateUniqueInvoiceNumber(),
    invoice_date: new Date().toISOString().split('T')[0],
    items: [],
    paid:false,
  });

  const { data: customers } = useQuery({ queryKey: ['customers'], queryFn: fetchCustomers });
  // const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  useEffect(() => {
    if (initialData) {
      setFormData({
        invoice_no:initialData.invoice_no,
        customer_id: initialData.customer_id,
        customer_name:initialData.customer_name,
        invoice_date: initialData.invoice_date.split('T')[0],
        paid:initialData.paid,
        items: initialData.items.map(item => {
            const product = products?.find(product => product.sku.some(sku => sku.id === item.sku_id));
            const sku = product?.sku.find(sku => sku.id === item.sku_id);
            return {
              ...item,
              name: product?.name || '',
              rate: sku?.selling_price || 0,
              quantity_in_inventory: sku?.quantity_in_inventory || 0,

            };
        }),
      });
    }else {
           
            setFormData({
              customer_id: '',
              invoice_no: generateUniqueInvoiceNumber(),
              invoice_date: new Date().toISOString().split('T')[0],
              items: [],
              paid:false,
            });
    }
  }, [initialData, products]);

  const handleProductChange = selectedOptions => {
    setFormData({
      ...formData,
      items: selectedOptions.map(option => {
        const product = products.find(product => product.sku.some(sku => sku.id === option.value));
        const sku = product.sku.find(sku => sku.id === option.value);
        return {
          sku_id: option.value,
          price: 0,
          quantity: 1,
          name: product.name,
          rate: sku.selling_price,
          quantity_in_inventory: sku.quantity_in_inventory,
         
        };
      }),
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, items: updatedItems });
  };
  const handleCustemerAdd = (e)=>{
    const c_id = parseInt(e.target.value)
    const c_name = customers.filter(customer=>customer.customer == c_id)[0]?.customer_profile?.name
    setFormData({ ...formData, customer_id: c_id,customer_name:c_name})
  }

  const handleFormSubmit = () => {
    onSubmit(formData);
    setFormData({
      invoice_no:'',
      customer_id: '',
      customer_name:'',
      invoice_no: generateUniqueInvoiceNumber(),
      invoice_date: new Date().toISOString().split('T')[0],
      items: [],
      paid:false,
    })
    setInitialData(null)
  };

  const productOptions = products?.flatMap(product =>
    product.sku.map(sku => ({
      value: sku.id,
      label: `${product.name}(${sku.id}) - ${sku.amount + sku.unit}`,
    }))
  ) || [];

  const handleModelclose = ()=>{
    setFormData({
      invoice_no:'',
      customer_id: '',
      customer_name:'',
      invoice_no: generateUniqueInvoiceNumber(),
      invoice_date: new Date().toISOString().split('T')[0],
      items: [],
      paid:false,
    })
    setInitialData(null)
onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={handleModelclose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Sale Order' : 'Add Sale Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="customer" mb="4">
            <FormLabel>Customer</FormLabel>
            <select
              value={formData.customer_id}
              onChange={(e) =>handleCustemerAdd(e)}
            >
              <option value="">Select a customer</option>
              {customers?.map(customer => (
                <option key={customer.id} value={customer.customer}>
                  {customer.customer_profile.name}
                </option>
              ))}
            </select>
          </FormControl>
          <FormControl id="date" mb="4">
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={formData.invoice_date}
              onChange={(e) => setFormData({ ...formData, invoice_date: e.target.value })}
            />
          </FormControl>
          <FormControl id="products" mb="4">
            <FormLabel>Products</FormLabel>
            <Select
              isMulti
              options={productOptions}
              onChange={handleProductChange}
              value={productOptions.filter(option =>
                formData.items.map(item => item.sku_id).includes(option.value)
              )}
            />
          </FormControl>
          {formData.items.map((item, index) => (
            <Box key={index} mb="4" p="4" borderWidth="1px" borderRadius="lg">
              <FormControl id={`items[${index}].name`} mb="4">
                <FormLabel>Product Name</FormLabel>
                <Text> Rate:{item.rate}</Text>
                <Input value={item.name} isReadOnly />
              </FormControl>
              <FormControl id={`items[${index}].price`} mb="4">
                <FormLabel>Price</FormLabel>
                <NumberInput
                  value={item.price}
                  onChange={(value) => handleInputChange(index, 'price', value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl id={`items[${index}].quantity`} mb="4">
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  value={item.quantity}
                  max={item.quantity_in_inventory}
                  onChange={(value) => handleInputChange(index, 'quantity', value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Text>{item.quantity_in_inventory} items in stock</Text>
              <Button colorScheme="red" isDisabled={initialData && !isActiveSale} onClick={() => {
                const updatedItems = formData.items.filter((_, i) => i !== index);
                setFormData({ ...formData, items: updatedItems });
              }}>
                Remove
              </Button>
            </Box>
          ))}
           <FormControl id="paid" mb="4">
            <FormLabel>Payment Status</FormLabel>
            <RadioGroup
              value={formData.paid ? 'paid' : 'unpaid'}
              onChange={(value) => setFormData({ ...formData, paid: value === 'paid' })}
            >
              <Stack direction="row">
                <Radio value="paid">Paid</Radio>
                <Radio value="unpaid">Unpaid</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button isDisabled={initialData && !isActiveSale} colorScheme="blue" mr="3" onClick={handleFormSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={handleModelclose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditOrderForm;
