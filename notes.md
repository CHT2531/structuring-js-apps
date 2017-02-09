#Structuring and Organising Code

These notes are about best practices and approaches for writing maintainable JavaScript code. 

##What do we mean by maintainable code?
* Code that is easy to test
* Code that is easy to modify
* Code that can be re-used
* Code that can be worked on by a team of people

Look at the following. It is a basic, working solution to the exercise we looked at in the first couple of weeks.   

```javascript
var films=[
        {title:"No Country for Old Men",year:2007},
        {title:"Jaws",year:1975},
        {title:"Winter's Bone",year:2010},
        {title:"Back to the Future",year:1985}
    ];

function doSearch(e){
    if(e.keyCode===13)
    {
        filmList.innerHTML="";
        var searchTerm=searchBox.value.trim();
        if(searchTerm==="")
        {
            msgTxt.innerHTML="You didn't enter anything"
        }else{
            msgTxt.innerHTML="You entered "+searchTerm;
            var matchingFilms = films.filter(function(film){
                return film.title.toLowerCase().search(searchTerm)!==-1
            });
            var filmLis="";
            matchingFilms.forEach(function(film){
                filmLis+="<li>"+film.title+"</li>";
            })
            filmList.innerHTML=filmLis;
        }
        
    }
    
}
var msgTxt=document.querySelector("#msg");
var filmList=document.querySelector("#film-list");
var searchBox=document.querySelector("#search");
searchBox.addEventListener("keyup",doSearch, false);
searchBox.focus();

```
In its current form, this code isn't very maintainable. Using some basic principles we can go through a process to improve the structure and maintainability of the code.

##Functions should 'do one thing'
It is considered good practice for functions to 'do one thing'(dot), the dot principle. Each function should perform a single task. This makes the application easier to test and modify. Here's the application re-written with a separate function for each task:

```javascript
var films=[
        {title:"No Country for Old Men",year:2007},
        {title:"Jaws",year:1975},
        {title:"Winter's Bone",year:2010},
        {title:"Back to the Future",year:1985}
    ];

function keyUpListener(e)
{
    if(e.keyCode===13)
    {
        doSearch();
    }
}

function searchFilms(searchTerm)
{
    var matchingFilms = films.filter(function(film){
        return film.title.toLowerCase().search(searchTerm)!==-1
    });
    return matchingFilms;
}

function outputFilms(matchingFilms){
    var filmLis="";
    matchingFilms.forEach(function(film){
        filmLis+="<li>"+film.title+"</li>";
    })
    filmList.innerHTML=filmLis;
}


function validate(str){
    if(str=="")
    {
        return false;
    }
    return true;
}



function doSearch()
{
    var searchTerm=searchBox.value.trim();
    if(validate(searchTerm))
    {
        msgTxt.innerHTML="You entered "+searchTerm;
        var filteredFilms=searchFilms(searchTerm.toLowerCase())
        outputFilms(filteredFilms);
    }
    else
    {
        msgTxt.innerHTML="You didn't enter anything";
    }
}

var msgTxt=document.querySelector("#msg");
var filmList=document.querySelector("#film-list");
var searchBox=document.querySelector("#search");
searchBox.addEventListener("keyup",keyUpListener, false);
searchBox.focus();
```
Inevitably, we need a function to co-ordinate all the other functions (in this case *doSearch*). However, all the other functions perform a single task. The benefits should be clear:
* We can re-use code. For example, the *validate* function could be used in many different applications.
* We can test each bit individually. For example I can test the *searchFilms* function by writing some simple code:

```javascript
function searchFilms(searchTerm)
{

    var matchingFilms = films.filter(function(film){
        return film.title.toLowerCase().search(searchTerm)!==-1
    });
    return matchingFilms;
}
//create some test data
var testFilms=[
        {title:"test film",year:1999},
        {title:"another film",year:2010}
]
console.log(searchFilms(testFilms,"anothe"));
//should output  {title:"another film",year:2010}
console.log(searchFilms(testFilms,"f"));
//should output  [{title:"test film",year:1999},{title:"another film",year:2010}]
```

Testing the code in this way wouldn't be possible in the original example without generating keypresses and interacting with the form. 

###Loosely coupled event handlers
Notice that the principle has also been applied to the event handler. Originally, there was a single function in the application, *doSearch* , this function was run when a key was pressed. There are a number of problems with this approach:
* What if we wanted to run this function when a button was clicked (instead of in response to a keypress) we would have make significant changes to the *doSearch* function. 
* The only way of testing the function was by executing a keypress event. It's much better if we can test the function simply by calling it e.g. *doSearch()*

##Make functions 'pure', try to make them independent
Once we've broken a program down into function we should think about the design of the functions. Look at the following. Which is the best approach?

```javascript

function validate(str){
    if(str=="")
    {
        return false;
    }
    return true;
}

```
or

```javascript
function validate(){
    var searchBox=document.querySelector("#search");
    var str=searchBox.value.trim()
    if(str=="")
    {
        return false;
    }
    return true;
}

```

In the first example, the function is *pure* it could be used in any application. In the second example the *validate* function is tied to only being used with the element *#search*, again, this makes the code harder to re-use and harder to test. It isn't always possible to make functions pure but we should try to limit dependencies and create pure functions when possible. 

##Avoid global variables
You should know what global variables are. See the functions week 2 for more info. In the above application, *films*, *msgTxt*,*filmList* and *searchBox* are all declared in the global namespace. Generally global variables should be avoided. There are a number of reasons:
* Naming conflicts. In larger applications, we are likely to have many variables. If they are all global variables it is easy to end up declaring two variables with the same name and over writing one of them. It sounds silly but it happens often. 
```javascript
var user={
    name:
}
...
//later on in the code
var user = false; //accidently replaces the original
```
* They often lead to 'tight coupling'. The existence of global variables and making functions dependent on global variables means functions can't be re-used. Again, consider the following example. The function *increase* is dependent on the global variable *count*.
``` javascript

var count = 10;

function increase()
{
    return count++
}
console.log(increase()); //11
```

* No access control. Because they live in the global namespace, global variables can be modified by any code in the application. We don't want this to be possible. Often we want to restrict the way in which data can be modified. If we write library code, we don't want to give other programmers free access to change any part of it. 

##Object Literal Pattern
So how can we avoid using global variables? We need to look at different ways of structuring and organising our code. One option is the object literal pattern.

We should be familiar with structuring data and functions as objects. We looked at this last week. Here's the application re-written as an object literal:
```javascript
var filmSearchApp={
    films:[
        {title:"No Country for Old Men",year:2007},
        {title:"Jaws",year:1975},
        {title:"Winter's Bone",year:2010},
        {title:"Back to the Future",year:1985}
    ],
    msgTxt:document.querySelector("#msg"),
    filmList:document.querySelector("#film-list"),
    searchBox:document.querySelector("#search"),

    init:function(){
        this.searchBox.addEventListener("keyup",filmSearchApp.keyUpListener, false);
        this.searchBox.focus();
    },
    
    keyUpListener:function(e)
    {
        if(e.keyCode===13)
        {
            filmSearchApp.doSearch();
        }
    },
    doSearch:function(){
        this.filmList.innerHTML="";
        var searchTerm=this.searchBox.value;
        if(this.validate(searchTerm)==true)
        {
            this.msgTxt.innerHTML="You entered "+searchTerm;
            var filteredFilms=this.searchFilms(searchTerm.toLowerCase())
            this.outputFilms(filteredFilms);
        }else{
            this.msgTxt.innerHTML="You didn't enter anything";
        }
    },

    searchFilms:function(searchTerm)
    {

        var matchingFilms = this.films.filter(function(film){
            return film.title.toLowerCase().search(searchTerm)!==-1
        });
        return matchingFilms;
    },

    validate:function(str)
    {
        if(str.trim()=="")
        {
            return false;
        }
        return true;
    },

    outputFilms:function(films){
        var filmLis="";
        films.forEach(function(film){
            filmLis+="<li>"+film.title+"</li>";
        })
        this.filmList.innerHTML=filmLis;
    }
}

filmSearchApp.init();
```

Here are a couple of things to point out:
* We no longer have any global variables. The global variables (*films*, *msgTxt*,*filmList*,*searchBox*) are now declared as properties of the *filmSearchApp* object. 
* To access these variables we need to use the *this* keyword or fully reference them e.g. *this.msgTxt* or *filmSearchApp.msgTxt*
* To refer to the functions we need to do the same e.g. *this.outputFilms(filteredFilms)*. We have to be careful in some circumstances. Consider the following:
```javascript

init:function(){
        this.searchBox.addEventListener("keyup",this.keyUpListener, false);
        this.msgTxt.innerHTML="";
        this.searchBox.value="";
        this.searchBox.focus();
    },

```
In this code *this* doesn't always refer to the *filmSearchApp* object, in the first line of the function *this* refers to the *searchBox* object as this is the object we are calling *addEventListener* on. So in this example we need to explicitely state that we want to call the *keyUpListener* method of the *filmSearchApp*. 

```javascript
this.searchBox.addEventListener("keyup",filmSearchApp.keyUpListener, false);
```
Sometimes this isn't enough and we have to explicitely *bind* our object to the function. You can read more about function binding here  
http://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/ .


###Structure the application into modules
Usually we can break an application into different parts or modules. In this application I'm going to create two modules
* A film module. This will declare my film objects and provide functions for working with the films such as search. We can think of this as being like the model in an MVC architecture
* A filmSearchApp module. This will simply tie all the functionality together. It's going to play the role of the controller and view.
 
```javascript

var filmModel={
    
    films:[
        {title:"No Country for Old Men",year:2007},
        {title:"Jaws",year:1975},
        {title:"Winter's Bone",year:2010},
        {title:"Back to the Future",year:1985}
    ],


    search:function(searchTerm)
    {

        var matchingFilms = this.films.filter(function(film){
            return film.title.toLowerCase().search(searchTerm)!==-1
        });
        return matchingFilms;
    }
}

var filmSearchApp={

    msgTxt:document.querySelector("#msg"),
    filmList:document.querySelector("#film-list"),
    searchBox:document.querySelector("#search"),
    init:function(){
        this.searchBox.addEventListener("keyup",filmSearchApp.keyUpListener, false);
        this.msgTxt.innerHTML="";
        this.searchBox.value="";
        this.searchBox.focus();
    },
    validate:function(str){
        if(str=="")
        {
            return false;
        }
        return true;
    },
    keyUpListener:function(e)
    {
        if(e.keyCode===13)
        {
            filmSearchApp.doSearch();
        }
    },
    doSearch:function(){
        var searchTerm=this.searchBox.value;
        if(this.validate(searchTerm))
        {
            this.msgTxt.innerHTML="You entered "+searchTerm;
            var filteredFilms=filmModel.search(searchTerm.toLowerCase());
            this.outputFilms(filteredFilms);
        }
    },
    outputFilms:function(films){
        var filmLis="";
        films.forEach(function(film){
            filmLis+="<li>"+film.title+"</li>";
        })
        this.filmList.innerHTML=filmLis;
    }
    
}

filmSearchApp.init();
```

This has a number of advantages.
* Modules can be re-used. 
* Makes the code easier to read.
* Modules can be worked on and tested independently. 

###Dependencies
Ideally modules should be independent. They shouldn't rely on other modules in order to work. The *filmModel* module above is a good example. It makes no references to any other modules. This means it can be used at many points in our application, we can re-use it. Plus, if we make changes to other modules, the *filmModel* will be unaffected. We should aim to make our modules independent if possible. 

Inevitably there has to be some point in our application where modules need to have some knowledge of each other. Often you will have an *App* module that ties everything together. That's exactly what we have in the above example. The *filmSearchApp* module is dependent on *filmModel*. For example in the line:
```javascript
var filteredFilms=filmModel.search(searchTerm.toLowerCase());
```

##The Revealing Module Pattern
The object literal pattern is useful but has one major weakness, all the variables and functions are publicly accessible. Any code from outside the object can call the functions and access the variables. If we want to control access to functions and variables we need a different approach. 

###Why does it matter if everything is publicly accessible?
It is often considered good practice to provide some kind of information hiding. Consider the following example: 
```javascript

var filmModel={
    films:[
        {title:"No Country for Old Men",year:2007},
        {title:"Jaws",year:1975},
        {title:"Winter's Bone",year:2010},
        {title:"Back to the Future",year:1985}
    ],
    search:function(searchTerm)
    {

        var matchingFilms = this.films.filter(function(film){
            return film.title.toLowerCase().search(searchTerm)!==-1
        });
        return matchingFilms;
    }
}
//I can change the list of films from outside the object
filmModel.films=[
{title:"The Last Airbender",year:2010},
{title:"Battlefield Earth",year:2000},
{title:"Reefer Madness",year:1936}
]

```
Using an object literal, variables inside the object can be manipulated from outside the object. In the above example we are able to change the list of films. We want to prevent this and instead only allow client code (code that uses the module) to access to certain functions and pieces of data. In this case we want client code to be able to call the *search* function but we don't want to give direct access to the actual list of films. Here's how we can do this. We call this the revealing module pattern.

```javascript

var filmModel=(function(){
    var films=[
        {title:"No Country for Old Men",year:2007},
        {title:"Jaws",year:1975},
        {title:"Winter's Bone",year:2010},
        {title:"Back to the Future",year:1985}
    ];
    function search(searchTerm){
        var matchingFilms = films.filter(function(film){
            return film.title.toLowerCase().search(searchTerm)!==-1
        });
        return matchingFilms;
    }
    return {
        search:search
    }
})()
//returns {title:"Winter's Bone",year:2010}
console.log(filmModel.search("w"));

```
The pattern involves the creation of an anonymous function that is called as soon as it is created. Here's another, simpler example:
```javascript
function(){
    console.log("hello "); 
}() //function is called as soon as it is created 
```
In the *filmModel* example, the anonymous function returns an  object that is made up of the functions we want to give access to (in this case one function, *search*). This returned object is assigned to *filmModel* so we can call *filmModel.search* just as we did with the object literal pattern. The key difference is we can't access the *films* variable from client code as the closure means it is only accessible via the *search* function. 

Most people find this confusing when they first look at it. Have a look at the recommended reading/links. Once you've seen several examples, you will see they all follow the same pattern. In some ways the code becomes a bit neater we don't have to worry about all the *this* references used with object literals. 

Here's the *filmSearchApp* object re-written using the revealing module pattern. Note, only one of the functions is made public:

```javascript

var filmSearchApp=(function(){
    
    var msgTxt=document.querySelector("#msg");
    var filmList=document.querySelector("#film-list");
    var searchBox=document.querySelector("#search");

    function validate(str){
        if(str.trim()=="")
        {
            return false;
        }
        return true;
    };
    function keyUpListener(e)
    {
        if(e.keyCode===13)
        {
            doSearch();
        }
    };
    function doSearch(){
        filmList.innerHTML="";
        msgTxt.innerHTML="";
        var searchTerm=searchBox.value;
        if(validate(searchTerm))
        {
            msgTxt.innerHTML="You entered "+searchTerm;
            var filteredFilms=filmModel.search(searchTerm.toLowerCase());
            outputResults(filteredFilms);
        }
    };
    function outputResults(films){
        var filmLis="";
        films.forEach(function(film){
            filmLis+="<li>"+film.title+"</li>";
        })
        filmList.innerHTML=filmLis;
    };
    function  init (){
        searchBox.addEventListener("keyup",keyUpListener, false);
        msgTxt.innerHTML="";
        searchBox.value="";
        searchBox.focus();
    }
    return {
        init:init
    };
})()

filmSearchApp.init();

```

##Separate files
When we split an application into separate modules, we often develop each module in a separate file. We then have to make sure that we load them in the correct order when we link to them with *script* elements. *filmSearcApp* is dependent on *filmModel* so *filmModel* has to be loaded first. 
```html
...
<script src="js/filmModel.js"></script>
<script src="js/filmSearchApp.js"></script>
...
```
You may be able to see some problems with this approach. Next week we will look at the issue of script loading in more detail. 

##References / Further reading
* Professional JavaScript for Web Developers, Third Edition
by  Nicholas C. Zakas - Chapter 24 Best Practices
* Learning JavaScript Design Patterns - http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
* Using Objects to Organize Your Code - http://rmurphey.com/blog/2009/10/15/using-objects-to-organize-your-code/
* How Do You Structure JavaScript? The Module Pattern Edition - https://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/
* Global Variables Are Bad - http://c2.com/cgi/wiki?GlobalVariablesAreBad
* Namespacing in JavaScript - https://msdn.microsoft.com/en-us/magazine/gg578608.aspx
* Code Organisation in jQuery - https://learn.jquery.com/code-organization/ 


