export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "cartparts", label: "Cartparts" },
      { id: "batteries", label: "Batteries" },
      { id: "oil", label: "Oil" },
      { id: "Tools", label: "Tools" },
      { id: "others", label: "Others" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "toyota", label: "Toyota" },
      { id: "honda", label: "Honda" },
      { id: "nissan", label: "Nissan" },
      { id: "mazda", label: "Mazda" },
      { id: "subaru", label: "Subaru" },
      { id: "mitsubishi", label: "Mitsubishi" },
      { id: "suzuki", label: "Suzuki" },

      { id: "bmw", label: "BMW" },
      { id: "mercedes", label: "Mercedes-Benz" },
      { id: "audi", label: "Audi" },
      { id: "volkswagen", label: "Volkswagen" },
      { id: "porsche", label: "Porsche" },
      { id: "opel", label: "Opel" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
export const shoppingViewMainHeaderMenuItems = [
  {
    id: "homemain",
    label: "Homemain",
    path: "/main/home",
  },
  {
    id: "about",
    label: "About Us",
    path: "/main/about",
  },
  {
    id: "faq",
    label: "Your Questions",
    path: "/main/faq",
  },
  {
    id: "sell",
    label: "Sell Your Car With Us",
    path: "/main/sell-car",
  },
  {
    id: "carparts",
    label: "Car Parts",
    path: "/shop/home",
  },
  {
    id: "cars",
    label: "Cars",
    path: "/cars/home",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "cartparts",
    label: "Cartparts",
    path: "/shop/listing",
  },
  {
    id: "batteries",
    label: "Batteries",
    path: "/shop/listing",
  },
  {
    id: "oil",
    label: "Oil",
    path: "/shop/listing",
  },
  {
    id: "tools",
    label: "Tools",
    path: "/shop/listing",
  },
  {
    id: "others",
    label: "Others",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  cartparts: "Cartparts",
  batteries: "Batteries",
  oil: "Oil",
  tools: "Tools",
  others: "Others",
};

export const brandOptionsMap = {
  toyota: "Toyota",
  honda: "Honda",
  nissan: "Nissan",
  mazda: "Mazda",
  subaru: "Subaru",
  mitsubishi: "Mitsubishi",
  suzuki: "Suzuki",
  bmw: "BMW",
  mercedes: "Mercedes-Benz",
  audi: "Audi",
  volkswagen: "Volkswagen",
  porsche: "Porsche",
  opel: "Opel",
};

export const filterOptions = {
  category: [
    { id: "cartparts", label: "Cartparts" },
    { id: "batteries", label: "Batteries" },
    { id: "oil", label: "Oil" },
    { id: "Tools", label: "Tools" },
    { id: "others", label: "Others" },
  ],
  brand: [
    { id: "toyota", label: "Toyota" },
    { id: "honda", label: "Honda" },
    { id: "nissan", label: "Nissan" },
    { id: "mazda", label: "Mazda" },
    { id: "subaru", label: "Subaru" },
    { id: "mitsubishi", label: "Mitsubishi" },
    { id: "suzuki", label: "Suzuki" },

    { id: "bmw", label: "BMW" },
    { id: "mercedes", label: "Mercedes-Benz" },
    { id: "audi", label: "Audi" },
    { id: "volkswagen", label: "Volkswagen" },
    { id: "porsche", label: "Porsche" },
    { id: "opel", label: "Opel" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
