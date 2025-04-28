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
    path: "/",
  },
  {
    id: "about",
    label: "About Us",
    path: "/main/about",
  },
  {
    id: "sell",
    label: "Sell Your Car With Us",
    path: "/cars/sell",
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
  {
    id: "LiveChat",
    label: "LiveChat with Us and Car Experts",
    path: "/chat",
  },
  {
    id: "contact",
    label: "Contact Us",
    path: "/contact",
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
export const shoppingCarsViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/cars/home",
  },
  {
    id: "listing",
    label: "Listing",
    path: "/Cars/listing",
  },
  {
    id: "Sell",
    label: "Sell Your Car",
    path: "/cars/sell",
  },
  {
    id: "AboutCar",
    label: "Why Buy From Us",
    path: "/car/listing",
  },

  {
    id: "search",
    label: "Search",
    path: "/cars/searchCars",
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

export const filterCarsOptions = {
  category: [
    { id: "sedan", label: "Sedan" },
    { id: "suv", label: "SUV" },
    { id: "hatchback", label: "Hatchback" },
    { id: "truck", label: "Truck" },
    { id: "van", label: "Van" },
    { id: "coupe", label: "Coupe" },
    { id: "convertible", label: "Convertible" },
    { id: "wagon", label: "Wagon" },
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

// cars

export const addCarFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter car title",
  },

  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter car description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "sedan", label: "Sedan" },
      { id: "suv", label: "SUV" },
      { id: "hatchback", label: "Hatchback" },
      { id: "truck", label: "Truck" },
      { id: "van", label: "Van" },
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
      { id: "bmw", label: "BMW" },
      { id: "mercedes", label: "Mercedes-Benz" },
      { id: "audi", label: "Audi" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter car price",
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
  {
    label: "Year",
    name: "year",
    componentType: "input",
    type: "number",
    placeholder: "Enter manufacturing year",
  },
  {
    label: "Fuel Type",
    name: "fuelType",
    componentType: "select",
    options: [
      { id: "petrol", label: "Petrol" },
      { id: "diesel", label: "Diesel" },
      { id: "electric", label: "Electric" },
      { id: "hybrid", label: "Hybrid" },
    ],
  },
  {
    label: "Transmission",
    name: "transmission",
    componentType: "select",
    options: [
      { id: "automatic", label: "Automatic" },
      { id: "manual", label: "Manual" },
    ],
  },
  {
    label: "Mileage (km/l)",
    name: "mileage",
    componentType: "input",
    type: "number",
    placeholder: "Enter mileage",
  },
  {
    label: "Color",
    name: "color",
    componentType: "input",
    type: "text",
    placeholder: "Enter car color",
  },
  {
    label: "Engine Capacity (cc)",
    name: "engineCapacity",
    componentType: "input",
    type: "number",
    placeholder: "Enter engine capacity",
  },
  {
    label: "Horsepower",
    name: "horsepower",
    componentType: "input",
    type: "number",
    placeholder: "Enter horsepower",
  },
  {
    label: "Seating Capacity",
    name: "seatingCapacity",
    componentType: "input",
    type: "number",
    placeholder: "Enter seating capacity",
  },
  {
    label: "Safety Rating",
    name: "safetyRating",
    componentType: "input",
    type: "number",
    placeholder: "Enter safety rating (0-5)",
  },

  // Key Features (Boolean Checkboxes)
  {
    label: "Air Conditioning",
    name: "airConditioning",
    componentType: "checkbox",
  },
  {
    label: "Power Steering",
    name: "powerSteering",
    componentType: "checkbox",
  },
  {
    label: "Airbags",
    name: "airbags",
    componentType: "input",
    type: "number",
    placeholder: "Enter number of airbags",
  },
  {
    label: "Rear Camera",
    name: "rearCamera",
    componentType: "checkbox",
  },
  {
    label: "Parking Sensors",
    name: "parkingSensors",
    componentType: "checkbox",
  },
  {
    label: "Sunroof",
    name: "sunroof",
    componentType: "checkbox",
  },
  {
    label: "Bluetooth",
    name: "bluetooth",
    componentType: "checkbox",
  },
  {
    label: "Alloy Wheels",
    name: "alloyWheels",
    componentType: "checkbox",
  },

  // Flags (Optional)
  {
    label: "Featured",
    name: "isFeatured",
    componentType: "checkbox",
  },
  {
    label: "Available",
    name: "isAvailable",
    componentType: "checkbox",
  },
];

export const addCarSellFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter car title",
  },
  {
    label: "email",
    name: "email",
    componentType: "input",
    type: "email",
    placeholder: "Enter phone number",
  },
  {
    label: "Phone Number",
    name: "phone",
    componentType: "input",
    type: "phone",
    placeholder: "Enter phone number",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter car description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "sedan", label: "Sedan" },
      { id: "suv", label: "SUV" },
      { id: "hatchback", label: "Hatchback" },
      { id: "truck", label: "Truck" },
      { id: "van", label: "Van" },
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
      { id: "bmw", label: "BMW" },
      { id: "mercedes", label: "Mercedes-Benz" },
      { id: "audi", label: "Audi" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter car price",
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
  {
    label: "Year",
    name: "year",
    componentType: "input",
    type: "number",
    placeholder: "Enter manufacturing year",
  },
  {
    label: "Fuel Type",
    name: "fuelType",
    componentType: "select",
    options: [
      { id: "petrol", label: "Petrol" },
      { id: "diesel", label: "Diesel" },
      { id: "electric", label: "Electric" },
      { id: "hybrid", label: "Hybrid" },
    ],
  },
  {
    label: "Transmission",
    name: "transmission",
    componentType: "select",
    options: [
      { id: "automatic", label: "Automatic" },
      { id: "manual", label: "Manual" },
    ],
  },
  {
    label: "Mileage (km/l)",
    name: "mileage",
    componentType: "input",
    type: "number",
    placeholder: "Enter mileage",
  },
  {
    label: "Color",
    name: "color",
    componentType: "input",
    type: "text",
    placeholder: "Enter car color",
  },
  {
    label: "Engine Capacity (cc)",
    name: "engineCapacity",
    componentType: "input",
    type: "number",
    placeholder: "Enter engine capacity",
  },
  {
    label: "Horsepower",
    name: "horsepower",
    componentType: "input",
    type: "number",
    placeholder: "Enter horsepower",
  },
  {
    label: "Seating Capacity",
    name: "seatingCapacity",
    componentType: "input",
    type: "number",
    placeholder: "Enter seating capacity",
  },
  {
    label: "Safety Rating",
    name: "safetyRating",
    componentType: "input",
    type: "number",
    placeholder: "Enter safety rating (0-5)",
  },

  // Key Features (Boolean Checkboxes)
  {
    label: "Air Conditioning",
    name: "airConditioning",
    componentType: "checkbox",
  },
  {
    label: "Power Steering",
    name: "powerSteering",
    componentType: "checkbox",
  },
  {
    label: "Airbags",
    name: "airbags",
    componentType: "input",
    type: "number",
    placeholder: "Enter number of airbags",
  },
  {
    label: "Rear Camera",
    name: "rearCamera",
    componentType: "checkbox",
  },
  {
    label: "Parking Sensors",
    name: "parkingSensors",
    componentType: "checkbox",
  },
  {
    label: "Sunroof",
    name: "sunroof",
    componentType: "checkbox",
  },
  {
    label: "Bluetooth",
    name: "bluetooth",
    componentType: "checkbox",
  },
  {
    label: "Alloy Wheels",
    name: "alloyWheels",
    componentType: "checkbox",
  },

  // Flags (Optional)
  {
    label: "Featured",
    name: "isFeatured",
    componentType: "checkbox",
  },
  {
    label: "Available",
    name: "isAvailable",
    componentType: "checkbox",
  },
];
