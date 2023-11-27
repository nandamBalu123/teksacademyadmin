const dataArray = [
  {
    id: 1700729701180,
    duedate: "2023-11-23",
    dueamount: "9000",
    paidamount: "9000",
    paiddate: "2023-11-24",
    modeofpayment: "UPI",
    transactionid: "ffdgdf",
    paymentdone: false,
  },
  {
    id: 1700729701180,
    duedate: "2023-11-24",
    dueamount: "9000",
    paidamount: "8000",
    paiddate: "2023-11-24",
    modeofpayment: "UPI",
    transactionid: "vcxvcx",
    paymentdone: false,
  },
  {
    id: 1700730034131,
    duedate: "",
    dueamount: 1000,
    paidamount: 0,
    paiddate: "",
    modeofpayment: "",
    transactionid: "",
    paymentdone: false,
  },
  {
    id: 1700729701180,
    duedate: "2023-11-25",
    dueamount: "9000",
    paidamount: 0,
    paiddate: "",
    modeofpayment: "",
    transactionid: "",
    paymentdone: false,
  },
  {
    id: 1700729701180,
    duedate: "2023-11-26",
    dueamount: "9000",
    paidamount: 0,
    paiddate: "",
    modeofpayment: "",
    transactionid: "",
    paymentdone: false,
  },
  {
    id: 1700729701180,
    duedate: "2023-11-27",
    dueamount: "9000",
    paidamount: 0,
    paiddate: "",
    modeofpayment: "",
    transactionid: "",
    paymentdone: false,
  },
];

const newObject = {
  id: 123456,
  duedate: "2023-11-28",
  dueamount: "5000",
  paidamount: "0",
  paiddate: "",
  modeofpayment: "",
  transactionid: "",
  paymentdone: false,
};

// Find the index of the last occurrence of paymentdone: true
const lastIndex = dataArray.map((obj) => obj.paymentdone).lastIndexOf(true);

// Insert the new object after the last paymentdone: true
dataArray.splice(lastIndex + 1, 0, newObject);

console.log(lastIndex);
