const orders = [
  {
    date_of_order: new Date(),
    user_id: "6123be8cc0b7aa66194f6654",
    status: "done",
    products: [
      {
        name: "PlayStation 5",
        price: 499,
      },
      {
        name: "Iphone 12",
        price: 1099,
      },
    ],
  },
  {
    date_of_order: new Date(),
    user_id: "6123be8cc0b7aa66194f6654",
    status: "done",
    products: [
      {
        name: "Cannon EOS-1D",
        price: 1300,
      },
      {
        name: "Amazon Alexa",
        price: 50,
      },
    ],
  },
  {
    date_of_order: new Date(),
    user_id: "612269c0e3e5602e5d90aa5",
    status: "done",
    products: [
      {
        name: "Audio Technica Headphones",
        price: 233,
      },
      {
        name: "JBL FLIP 4",
        price: 140,
      },
    ],
  },
];

module.exports = orders;
