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
