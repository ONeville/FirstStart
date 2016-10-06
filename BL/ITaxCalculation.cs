using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface ITaxCalculation
    {
        ProductItem CalculatePriceWithTax(ProductItem item);
        double CalculateTaxRoundOff(double value);
    }

}
