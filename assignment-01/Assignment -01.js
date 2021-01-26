var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200,{"content-type":"text-html"});
    res.end();

    //creating car objects
    var car1 = new Object();
    car1.CarName = "Maruti";
    car1.CarModel = "Swift";
    car1.ManufacturingYear = 2020;
    car1.price = 216742.20;
    car1.LastServiceDate = new Date("2021-01-03T10:12:44.000Z");
    
    var car2 = new Object();
    car2.CarName = "ABC";
    car2.CarModel = "XYZ";
    car2.ManufacturingYear = 2018;
    car2.price = 365142.45;
    car2.LastServiceDate = new Date("2020-01-03T10:12:44.000Z");
    
    var car3 = {
        CarName : "NNN",
        CarModel : "BHC",
        ManufacturingYear : 1999,
        Price : 458213.33,
        LastServiceDate : new Date("2019-10-25T12:12:12.000Z")
    }

    //Array of cars
    var carArray = new Array();
    carArray = [car1,car2,car3];

    let year = 2000;

    //adding cars
    for ( var i = 0; i < 10; i++) {
        carArray.push({
            CarName : "NNN",
            CarModel : "MMM",
            ManufacturingYear : year++,
            Price : 100000.33,
            LastServiceDate : new Date("2019-10-25T12:12:12.000Z")
        })
      }

    console.log("Cars added successfully.")

    console.log("---------------------");
    console.log("Total cars count :", carArray.length);
    console.log("---------------------");


    var filteredCars = new Array() //Array for filtered cars
    //filter carsArray by car name, model and manufacturing year
    carArray.forEach(car => {
        if(car.CarName == "NNN" && car.ManufacturingYear > 2003 && (car.CarModel == "XYZ" || car.CarModel == "MMM")){
            filteredCars.push(car)
        }
    });

    //Print total filtered record
    console.log("Filter records are : ",filteredCars.length)

    console.log("---------------------");

    //print current date and time
    let today = new Date();
    console.log("Current date and time is: ",today.toLocaleString())

    console.log("---------------------");

    //previous month date from current date
    let prevMonthDate = new Date(today.getFullYear(),today.getMonth()-1,today.getDate())
    console.log("Previous month's date from today: ",prevMonthDate.toLocaleString())
    
    console.log("---------------------");

    // Print last date of next month from current date.
    let nextMonthLastDay = new Date(today.getFullYear(),today.getMonth()+1,today.getDate())
    console.log("Last day of next month from today: ",nextMonthLastDay.toLocaleString())    


}).listen(8080);