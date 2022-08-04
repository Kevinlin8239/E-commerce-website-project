export const PRODUCT_QUERY = `
query {
  products{
    data{
      attributes{
        Title
        Description
        Slug
        Price
        Image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;

export const GET_PRODUCT_QUERY = `
 query getProduct($Slug: String!) {
  products(filters:{Slug:{eq:$Slug}}){
    data{
      attributes{
        Title
        Slug,
        Description,
        Price,
        Image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
 }
`;
