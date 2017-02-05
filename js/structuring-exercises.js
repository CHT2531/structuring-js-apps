//Q1) Look at the following code. Run it in a browser. It is a simple currency conversion application. Write a line of code that will run this code and convert 20 pounds into euros. Display the result in the console. No tests for this, just try and get familiar with the code


var conversionRates={
	"dollars":1.25,
	"euros":1.16
}

function convertPoundsApp(amount,currency)
{
	if(isNaN(amount) || amount<0)
	{
		throw new Error("You need to enter a positive number for the amount");
	}
	else
	{
		var selectedRate = conversionRates[currency];
		if(selectedRate===undefined)
		{
			throw new Error("Can only convert dollars or euros");
		}else{
			var convertedAmount=selectedRate*amount
			var formattedAmount=convertedAmount.toFixed(2); //rounds to two decimal places
			return formattedAmount;
		}
	}
}

/*
Q2. Split this single large function into a number of smaller functions. Create four functions. 
(1) validAmount(). This should accept a single argument, a number. The function should return true if the argument is a positive number and false if it isn't. 
(2) getConversionRate(). This should accept a single argument, a string that specifies the currency to convert to e.g. 'dollars'. The function should return a single object from the array of conversion rates that matches the specified currency.
(3) a convert() function. This should accept two arguments, an amount in pounds and an exchange rate. It should return the converted amount e.g. if we call the function with 10 and "dollars" as arguments, it should return  12.50. 
(4) convertPounds() function. This should be a modification of the original function. It will still need to throw errors like in the original but it should use the other functions to perform tasks. For example,

if(!validAmount(amount))
{
	throw new Error("You need to enter a positive number for the amount");
}
*/

/*
Q3. Next try to use the object literal pattern. Create an object called poundConverter. Define conversionRates as a variable in this object, add validAmount(), getConversionRate(), and convert() as functions inside this object. We should be able to use the object as follows:

console.log(poundConverter.convertPounds(20,"dollars"))
*/

/*
Q4. Instead of using the object literal pattern, modify poundConverter so that it is created using the revealing module pattern. Make the convert() and validAmount() functions, and the conversionRates variable private. Make the getConversionRate() and convertPounds() functions publicly accessible.
*/

