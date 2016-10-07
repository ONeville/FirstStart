using System;
using System.Collections.Generic;
using BL;

namespace SalesTaxes
{
    class Program
    {
        static void Main(string[] args)
        {

            ProductPurchased saleTaxe = new ProductPurchased();

            //Test in case of helping user to set his own rates 
            //on Import and Exempt tax
            //ProductPurchased saleTaxe = new ProductPurchased(0.15, 0.08);
            
            //Test in case of helping user to set his own rates 
            //on Import, Exempt tax and Round up rate
            //ProductPurchased saleTaxe = new ProductPurchased(0.05, 0.1, 0.06);

            saleTaxe = saleTaxe.GetPurchases(GetEntryData());

            PrintReciept(saleTaxe);

            Console.ReadLine();
        }

        static bool ValidateNumeric(string value, string dataType)
        {
            bool typeFlag = false;

            if (dataType.Equals("number"))
            {
                int number;
                typeFlag = int.TryParse(value, out number);
            }
            
            if (dataType.Equals("amount"))
            {
                double number;
                typeFlag = double.TryParse(value, out number);
            }

            return typeFlag;
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
                product.ProductQuantity = Int32.Parse(GetEntryData(Console.ReadLine(), "number"));

                Console.WriteLine("Item " + countItem + " > enter Product Name: ");
                product.ProductName = GetEntryData(Console.ReadLine(), "text");

                Console.WriteLine("Item " + countItem + " > enter Price: ");
                product.ProductPrice = Double.Parse(GetEntryData(Console.ReadLine(), "amount"));

                Console.WriteLine("Item " + countItem + " > is this product imported [y/n] ? ");
                product.ImportProduct = GetEntryData(Console.ReadLine(), "text");

                Console.WriteLine("Item " + countItem + " > is this product exempted [y/n] ?");
                product.ExemptProduct = GetEntryData(Console.ReadLine(), "text");

                itemList.Add(product);
                countItem++;

                Console.WriteLine("Do you have more Items [y/n]: ");
                input = GetEntryData(Console.ReadLine(), "text");
                if (input.ToLower().Equals("n"))
                {
                    break;
                }
            }

            return itemList;
        }

        static string GetEntryData(string dataEntry, string dataType)
        {
            bool checkEntry = false;
            string errorMessage = null;
            do
            {
                checkEntry = true;

                if (string.IsNullOrEmpty(dataEntry))
                {
                    checkEntry = false;
                    errorMessage = "This field require entry!";
                }
                else if (!dataType.Equals("text"))
                {
                    if (!ValidateNumeric(dataEntry, dataType))
                    {
                        checkEntry = false;
                        errorMessage = "This field require a number!";
                    }
                }


                if (!checkEntry)
                {
                    Console.WriteLine(errorMessage + " Please! try again : ");
                    dataEntry = Console.ReadLine();
                }

            } while (!checkEntry);

            return dataEntry;
        }
        
        static void PrintReciept(ProductPurchased purchase)
        {
            Console.WriteLine("__________________________________");
            foreach (ProductItem item in purchase.ItemGrouped)
            {
                if (item.ProductQuantity > 1)
                {
                    Console.WriteLine(item.ProductName + " : " + item.ProductPriceWithTax +
                        " (" + item.ProductQuantity + " @ " + 
                        (item.ProductPriceWithTax / item.ProductQuantity) + ")");
                }
                else
                {
                    Console.WriteLine(item.ProductName + " : " + item.ProductPriceWithTax); 
                }

                Console.WriteLine("__________________________________");
            }

            //Console.WriteLine("Total amount: " + purchase.TotalAmount);
            //Console.WriteLine("Sales Taxes: " + purchase.TotalTaxAmount);
            //Console.WriteLine("Sales Taxes round off: " + purchase.TotalTaxAmountRoundOff);
            Console.WriteLine("Sales Taxes: " + purchase.TotalTaxAmountRoundOff);
            Console.WriteLine("Total: " + purchase.GrandTotal);
        }
    }
}
