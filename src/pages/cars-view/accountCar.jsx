import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";

import CarOrders from "@/components/CarsShopping/car-orders";
import Address from "@/components/shopping-view/address";

function CarAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="container grid grid-cols-1 gap-8 py-8 mx-auto">
        <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-background">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Car Orders</TabsTrigger>
              <TabsTrigger value="address">Car Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <CarOrders />
            </TabsContent>

            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default CarAccount;
