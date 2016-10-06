using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductPurchased : ITaxCalculation
    {
        public List<ProductItem> Item { get; set; }
        public double ImportTax { get; set; }
        public double ExemptTax { get; set; }

        public double TotalAmount { get; set; }
        public double TotalTaxAmount { get; set; }
        public double TotalTaxAmountRoundOff { get; set; }
        public double GrandTotal { get; set; }

        public const double RoundTax = 0.05D;

        public ProductPurchased()
        {
            this.ImportTax = 0.1;
            this.ExemptTax = 0.05;
        }

        public ProductPurchased(double importTax, double exemptTax)
        {
            this.ImportTax = importTax;
            this.ExemptTax = exemptTax;
        }

        public ProductItem CalculatePriceWithTax(ProductItem item)
        {
            if (item.IsImported)
            {
                item.ProductPriceWithTax = item.ProductPrice * this.ImportTax;
            }

            if (item.IsExempted)
            {
                item.ProductPriceWithTax = item.ProductPrice * this.ExemptTax;
            }

            return item;
        }

        public double CalculateTaxRoundOff(double priceWithTax)
        {
            double taxCalculated = priceWithTax % RoundTax;
            if (taxCalculated > 0)
            {
                if (taxCalculated > 0.025)
                {
                    priceWithTax -= taxCalculated;
                }
                else
                {
                    priceWithTax += (0.05 - taxCalculated);
                }
            }
            return priceWithTax;
        }

        public ProductPurchased GetPurchases(List<ProductItem> items, double importTax, double exemptTax)
        {
            ProductPurchased result;

            if (importTax > 0 && exemptTax > 0)
            {
                result = new ProductPurchased(importTax, exemptTax);
            }
            else
            {
                result = new ProductPurchased();
            }

            result.Item = new List<ProductItem>();

            foreach (ProductItem item in items)
            {
                ProductItem data = new ProductItem();

                data = CalculatePriceWithTax(item);
                result.Item.Add(data);

                result.TotalTaxAmount += data.ProductPriceWithTax;

                result.TotalTaxAmountRoundOff += CalculateTaxRoundOff(data.ProductPriceWithTax);

                result.TotalAmount += data.ProductAmount;
            }

            result.GrandTotal = result.TotalAmount + result.TotalTaxAmountRoundOff;
            return result;
        }


        public ProductPurchased GetPurchases(List<ProductItem> items)
        {
            return GetPurchases(items, 0, 0);
        }
    }
}
