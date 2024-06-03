export const generateUniqueInvoiceNumber = () => {
    const date = new Date();
    const components = [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      ("0" + date.getDate()).slice(-2),
      ("0" + date.getHours()).slice(-2),
      ("0" + date.getMinutes()).slice(-2),
      Math.floor(Math.random() * 1000) 
    ]
    return `INV-${components.join("")}`;
  };
  