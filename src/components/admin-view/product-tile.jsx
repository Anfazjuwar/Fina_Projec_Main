import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      {/* 🧠 Separated the image/content click */}
      <div onClick={() => handleGetAproductdetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image?.[0] || "/fallback.jpg"}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="mt-2 mb-2 text-xl font-bold">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                product?.salesPrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-blue-800`}
            >
              ${product?.price}
            </span>
            {product?.salesPrice > 0 && (
              <span className="text-lg font-bold text-black">
                ${product?.salesPrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      {/* 🛑 Stop propagation to prevent triggering dialog open */}
      <CardFooter className="flex items-center justify-between">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(product?._id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
