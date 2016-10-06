namespace BL
{
    public class ProductItem
    {
        public int ProductQuantity { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }
        public string ImportProduct { get; set; }

        public bool IsImported
        {
            get { return this.ImportProduct.ToLower().Equals("n") ? false : true; }
        }

        public string ExemptProduct { get; set; }

        public bool IsExempted
        {
            get { return this.ExemptProduct.ToLower().Equals("n") ? false : true; }
        }
        public double ProductPriceWithTax { get; set; }

        public double ProductAmount
        {
            get { return this.ProductPrice * this.ProductQuantity; }
        }
    }
}
