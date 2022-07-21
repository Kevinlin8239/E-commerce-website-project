export default function Product({ product }) {
  const { title, price, image } = product.attributes;
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </div>
  );
}
