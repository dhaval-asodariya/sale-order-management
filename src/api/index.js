const saleOrders = [{
    id: 1,
    customer_id: 11908,
    customer_name:"Ram",
    items: [{ sku_id: 246, price: 12, quantity: 12 }],
    paid: false,
    invoice_no: "INV-202406030342121",
    invoice_date: "2024-07-05"
  },
  {
    id: 2,
    customer_id: 11908,
    customer_name:"Ram",
    items: [{ sku_id: 247, price: 32, quantity: 1 },{sku_id: 248, price: 54, quantity: 1}],
    paid: true,
    invoice_no: "INV-202406030342122",
    invoice_date: "2024-05-29"
  },
  {
    id: 3,
    customer_id: 11908,
    customer_name:"Ram",
    items: [{ sku_id: 2489, price: 32, quantity: 1 }],
    paid: true,
    invoice_no: "INV-202406030342123",
    invoice_date: "2024-05-29"
  }]
  export const fetchSaleOrders = async () => {
      return saleOrders
    };
    
    export const addSaleOrder = async (newOrder) => {
      const newId = Math.max(...saleOrders.map(order=>order.id))+1
      const orderWithId = { id: newId, ...newOrder }
      saleOrders.push(orderWithId)
      return orderWithId
    };
    
    export const updateSaleOrder = async ( updatedOrder) => {

      const index = saleOrders.findIndex(order => order.id === updatedOrder.id);
      if (index === -1) {
        throw new Error('Sale order not found');
      }
      saleOrders[index] = { ...updatedOrder };

      return saleOrders[index];
    };

    export const fetchCustomers = async () => {
        return [
          {
            id: 9,
            customer: 11908,
            customer_profile: {
              id: 11908,
              name: "Ram",
              color: [182, 73, 99],
              email: "jesus_christ@church.com",
              pincode: "Mumbai",
              location_name: "Mumbai, Maharashtra, India",
              type: "C",
              profile_pic: null,
              gst: ""
            }
          },
          {
            id: 10,
            customer: 11910,
            customer_profile: {
              id: 11910,
              name: "Dhaval",
              color: [182, 73, 99],
              email: "xyz@church.com",
              pincode: "surat",
              location_name: "surat, gujrat, India",
              type: "C",
              profile_pic: null,
              gst: ""
            }
          }
        ];
      };
      
      const products = [
        {
          id: 209,
          display_id: 8,
          owner: 1079,
          name: "New Product",
          category: "The god of War",
          characteristics: "New Product Characteristics",
          features: "",
          brand: "New Product Brand",
          sku: [
            {
              id: 248,
              selling_price: 54,
              max_retail_price: 44,
              amount: 33,
              unit: "kg",
              quantity_in_inventory: 15,
              product: 209
            },
            {
              id: 247,
              selling_price: 32,
              max_retail_price: 32,
              amount: 33,
              unit: "kg",
              quantity_in_inventory: 15,
              product: 209
            },
            {
              id: 246,
              selling_price: 23,
              max_retail_price: 21,
              amount: 22,
              unit: "kg",
              quantity_in_inventory: 100,
              product: 209
            }
          ],
          updated_on: "2024-05-24T12:46:41.995873Z",
          adding_date: "2024-05-24T12:46:41.995828Z"
        },{
          id: 2099,
          display_id: 8,
          owner: 1079,
          name: "Cosmetic product",
          category: "The god of War",
          characteristics: "New Product Characteristics",
          features: "",
          brand: "New Product Brand",
          sku: [
            {
              id: 2489,
              selling_price: 54,
              max_retail_price: 44,
              amount: 33,
              unit: "kg",
              quantity_in_inventory: 20,
              product: 2099
            },
            {
              id: 2479,
              selling_price: 32,
              max_retail_price: 32,
              amount: 33,
              unit: "kg",
              quantity_in_inventory: 20,
              product: 2099
            },
            {
              id: 2469,
              selling_price: 23,
              max_retail_price: 21,
              amount: 22,
              unit: "kg",
              quantity_in_inventory: 11,
              product: 2099
            }
          ],
          updated_on: "2024-05-24T12:46:41.995873Z",
          adding_date: "2024-05-24T12:46:41.995828Z"
        }
      ]
      export const fetchProducts = async () => {
        return products
      };

      export const updateProducts = async ( data) => {
        
        const skuId = data.id
        const leftQuantity = data.qunt
       
        const productIndex =products.findIndex(product=>product.sku.some(sku=>sku.id == skuId))
         const skuIndex = products[productIndex].sku.findIndex(sku=>sku.id==skuId)
        products[productIndex].sku[skuIndex].quantity_in_inventory = leftQuantity
      
      }