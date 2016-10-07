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
        public List<ProductItem> ItemGrouped { get; set; }
        private double _importTax { get; set; }
        private double _basisTax { get; set; }
        private double _roundUpTax { get; set; }

        public double TotalAmount { get; set; }
        public double TotalTaxAmount { get; set; }
        public double TotalTaxAmountRoundOff { get; set; }
        public double GrandTotal { get; set; }

        public ProductPurchased()
        {
            _importTax = 0.05;
            _basisTax = 0.1;
            _roundUpTax = 0.05;
        }

        public ProductPurchased(double importTax, double basisTax)
        {
            _importTax = importTax;
            _basisTax = basisTax;
        }

        public ProductPurchased(double importTax, double basisTax, double roundUpTax)
        {
            _importTax = importTax;
            _basisTax = basisTax;
            _roundUpTax = roundUpTax;
        }

        public ProductItem CalculatePriceWithTax(ProductItem item)
        {
            if (item.IsImported && !item.IsExempted)
            {
                item.ProductPriceWithTax = (_importTax + _basisTax) * item.ProductPrice;
            }
            else if (item.IsImported && item.IsExempted)
            {
                item.ProductPriceWithTax = item.ProductPrice * _importTax;
            }
            else if (!item.IsImported && !item.IsExempted)
            {
                item.ProductPriceWithTax = item.ProductPrice * _basisTax;
            }
            else
            {
                item.ProductPriceWithTax = item.ProductPrice;
            }

            return item;
        }

        public double CalculateTaxRoundOff(double priceWithTax)
        {
            return Math.Ceiling(priceWithTax / _roundUpTax) * _roundUpTax;
        }

        public ProductPurchased GetPurchases(List<ProductItem> items, double importTax, double basisTax, double roundUpTax)
        {
            ProductPurchased result;

            if (importTax > 0 && basisTax > 0 && roundUpTax > 0)
            {
                result = new ProductPurchased(importTax, basisTax, roundUpTax);
            }
            else if (importTax > 0 && basisTax > 0 && roundUpTax.Equals(0.0))
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

            result.ItemGrouped = result.Item
                .GroupBy(x => new { x.ProductName, x.ProductPriceWithTax })
                .Select(y => new ProductItem()
                {
                    ProductName = y.Key.ProductName,
                    ProductPriceWithTax = y.Sum(z => z.ProductPriceWithTax),
                    ProductQuantity = y.Count()
                }
                ).ToList();

            result.GrandTotal = result.TotalAmount + result.TotalTaxAmountRoundOff;
            return result;
        }

        public ProductPurchased GetPurchases(List<ProductItem> items)
        {
            return GetPurchases(items, 0, 0, 0);
        }
    }
}
