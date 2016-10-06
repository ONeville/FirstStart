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
        private double ImportTax { get; set; }
        private double BasisTax { get; set; }

        public double TotalAmount { get; set; }
        public double TotalTaxAmount { get; set; }
        public double TotalTaxAmountRoundOff { get; set; }
        public double GrandTotal { get; set; }

        public const double RoundTax = 0.05D;

        public ProductPurchased()
        {
            ImportTax = 0.05;
            BasisTax = 0.1;
        }

        public ProductPurchased(double importTax, double basisTax)
        {
            ImportTax = importTax;
            BasisTax = basisTax;
        }

        public ProductItem CalculatePriceWithTax(ProductItem item)
        {
            if (item.IsImported && !item.IsExempted)
            {
                item.ProductPriceWithTax = (ImportTax + BasisTax) * item.ProductPrice;
            }
            else if (item.IsImported && item.IsExempted)
            {
                item.ProductPriceWithTax = item.ProductPrice * ImportTax;
            }
            else if (!item.IsImported && !item.IsExempted)
            {
                item.ProductPriceWithTax = item.ProductPrice * BasisTax;
            }
            else
            {
                item.ProductPriceWithTax = item.ProductPrice;
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

        public ProductPurchased GetPurchases(List<ProductItem> items, double importTax, double basisTax)
        {
            ProductPurchased result;

            if (importTax > 0 && basisTax > 0)
            {
                result = new ProductPurchased(importTax, basisTax);
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
