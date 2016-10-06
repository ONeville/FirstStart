using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL;

namespace SalesTaxes
{
    class Program
    {
        static void Main(string[] args)
        {

            ProductPurchased saleTaxe = new ProductPurchased();

            saleTaxe = saleTaxe.GetPurchases(GetEntryData());

            PrintReciept(saleTaxe);

            Console.ReadLine();
        }


        static bool ValidateNumeric(string value)
        {
            int number;
            return int.TryParse(value, out number);
        }

        static List<ProductItem> GetEntryData()
        {
            int countItem = 1;
            string input = "Y";

            List<ProductItem> itemList = new List<ProductItem>();

            while (true)
            {

                ProductItem product = new ProductItem();

                Console.WriteLine("Item " + countItem + " > enter Quantity: ");
                product.ProductQuantity = Int32.Parse(Console.ReadLine());

                Console.WriteLine("Item " + countItem + " > enter Product Name: ");
                product.ProductName = Console.ReadLine();

                Console.WriteLine("Item " + countItem + " > enter Price: ");
                product.ProductPrice = Double.Parse(Console.ReadLine());

                Console.WriteLine("Item " + countItem + " > is this product imported [y/n] ? ");
                product.ImportProduct = Console.ReadLine();

                Console.WriteLine("Item " + countItem + " > is this product exempted [y/n] ?");
                product.ExemptProduct = Console.ReadLine();

                itemList.Add(product);
                countItem++;

                Console.WriteLine("Do you have more Items [y/n]: ");
                input = Console.ReadLine();
                if (input.ToLower().Equals("n"))
                {
                    break;
                }
            }

            return itemList;
        }
        
        static ProductItem GetEntryData(ProductItem item)
        {
            Console.WriteLine(" enter the quantity: ");

            string inputText = Console.ReadLine();

            bool checkEntry = false;

            do
            {
                checkEntry = true;
                
                if (string.IsNullOrEmpty(inputText))
                {
                    checkEntry = false;
                }
                else if (!ValidateNumeric(inputText))
                {
                    checkEntry = false;
                }

                if (!checkEntry)
                {
                    Console.WriteLine("This field require a number!");
                    Console.WriteLine("Please! Enter the quantity: ");
                    inputText = Console.ReadLine();
                }

            } while (!checkEntry);

            item.ProductQuantity = Int32.Parse(inputText);

            return item;
        }

        static void PrintReciept(ProductPurchased purchase)
        {
            foreach (ProductItem item in purchase.Item)
            {
                Console.WriteLine("__________________________________");
                Console.WriteLine(item.ProductName + " : " + item.ProductPriceWithTax);
                Console.WriteLine("__________________________________");
            }

            Console.WriteLine("Total amount: " + purchase.TotalAmount);
            Console.WriteLine("Sales Taxes: " + purchase.TotalTaxAmount);
            Console.WriteLine("Sales Taxes round off: " + purchase.TotalTaxAmountRoundOff);
            Console.WriteLine("Total: " + purchase.GrandTotal);
        }
    }
}
