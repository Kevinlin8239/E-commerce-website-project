import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProductDetails() {
  // use state
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  // reset Qty
  useEffect(() => {
    setQty(1);
  }, []);

  // fetch Slug
  const { query } = useRouter();

  // fetch data from Graphql
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { Slug: query.Slug },
  });
  const { data, fetching, error } = results;

  // check the data coming in
  if (fetching) return <p>Loading</p>;
  if (error) return <p>Oh no...{error.message}</p>;

  // extract the data
  const { Title, Description, Image } = data.products.data[0].attributes;

  // extract our data
  const notify = () => {
    toast.success(`${Title} added to your cart!`, { duration: 1000 });
  };

  return (
    <DetailsStyle>
      <img src={Image.data.attributes.formats.medium.url} alt={Title} />
      <ProductInfo>
        <h3>{Title}</h3>
        <p>{Description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusSquare onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusSquare onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
