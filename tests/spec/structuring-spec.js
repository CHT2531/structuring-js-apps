describe("Tests for structuring code and creating modules. ", function() {
  
  describe("Q2. Tests for structuring the application as a number of functions",function(){
      
      describe("The function validAmount()", function(){
        it("should return true when passed a positive number",function(){
          expect(validAmount(10)).toEqual(true);
         });

        it("should return false when passed a string",function(){
          expect(validAmount("ten")).toEqual(false);
        });

        it("should return false when passed a negative number",function(){
          expect(validAmount(-10)).toEqual(false);
        });
      });

      describe("The function getConversionRate()", function(){
        it("should return a number when passed valid currency string as an argument",function(){
          expect(getConversionRate("dollars")).toEqual(1.25);
         });
        it("should return undefined when passed an invalid currency string as an argument",function(){
          expect(getConversionRate("yen")).toEqual(undefined);
         });
      });

      describe("The function convert()", function(){
        it("should return a number, an accurate conversion, when passed a valid amount and rate as arguments",function(){
          expect(convert(10,1)).toBe('10.00');
         });
      });

      });
    
    describe("Q3. Tests for structuring the application using the object literal pattern",function(){
     
      describe("The function poundConverter.validAmount()", function(){
        it("should return true when passed a positive number",function(){
          expect(poundConverter.validAmount(10)).toEqual(true);
         });

        it("should return false when passed a string",function(){
          expect(poundConverter.validAmount("ten")).toEqual(false);
        });

        it("should return false when passed a negative number",function(){
          expect(poundConverter.validAmount(-10)).toEqual(false);
        });
      });

      describe("The function poundConverter.getConversionRate()", function(){
        it("should return a number when passed valid currency string as an argument",function(){
          expect(poundConverter.getConversionRate("dollars")).toEqual(1.25);
         });
        it("should return undefined when passed an invalid currency string as an argument",function(){
          expect(poundConverter.getConversionRate("yen")).toEqual(undefined);
         });
      });

      describe("The function poundConverter.convert()", function(){
        it("should return a number, an accurate conversion, when passed a valid amount and rate as arguments",function(){
          expect(poundConverter.convert(10,1)).toBe('10.00');
         });
      });

        describe("poundConverter.convertPounds()", function(){
        it("should return a number, an accurate conversion, when passed a valid currency and amount as arguments",function(){
          expect(poundConverter.convertPounds(10,"dollars")).toBe('12.50');
         });
        it("should throw an error if an invalid amount is specified",function(){
          expect(function(){poundConverter.convertPounds(-10,"dollars")}).toThrow(new Error("You need to enter a positive number for the amount"));
         });
       it("should throw an error if an invalid currency is specified",function(){
          expect(function(){poundConverter.convertPounds(10,"yen")}).toThrow(new Error("Can only convert dollars or euros"));
         });
   })
})
  describe("Q4. Tests for structuring the application using the revealing module pattern",function(){
     
      describe("poundConverter.validAmount()", function(){
        it("shouldn't be publicly accessible",function(){
          expect(poundConverter.validAmount).toBeUndefined();
         });
      });

       describe("poundConverter.convert()", function(){
        it("shouldn't be publicly accessible",function(){
          expect(poundConverter.convert).toBeUndefined();
         });
      });

      describe("poundConverter.conversionRates", function(){
        it("shouldn't be publicly accessible",function(){
          expect(poundConverter.conversionRates).toBeUndefined();
         });
      });

      describe("The function poundConverter.getConversionRate()", function(){
        it("should return a number when passed valid currency string as an argument",function(){
          expect(poundConverter.getConversionRate("dollars")).toEqual(1.25);
         });
        it("should return undefined when passed an invalid currency string as an argument",function(){
          expect(poundConverter.getConversionRate("yen")).toEqual(undefined);
         });
      });

      describe("poundConverter.convertPounds()", function(){
        it("should return a number, an accurate conversion, when passed a valid currency and amount as arguments",function(){
          expect(poundConverter.convertPounds(10,"dollars")).toBe('12.50');
         });
        it("should throw an error if an invalid amount is specified",function(){
          expect(function(){poundConverter.convertPounds(-10,"dollars")}).toThrow(new Error("You need to enter a positive number for the amount"));
         });
       it("should throw an error if an invalid currency is specified",function(){
          expect(function(){poundConverter.convertPounds(10,"yen")}).toThrow(new Error("Can only convert dollars or euros"));
         });
     })
      
   })
  
});


