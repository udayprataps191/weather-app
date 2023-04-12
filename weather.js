let weather = {
    apikey: "b527aaa530b615543bc441cfa6b978cb"  , 
    fetchweather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            +"&units=metric&appid=" 
            + this.apikey 
        )
        .then((response) =>{
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
              }
              return response.json();
            })
        .then((data) => this.displayweather(data));
    },
   
     displayweather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;    
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector("h2").innerHTML = "weather in " + name;
        //document.querySelector(".icon").src= "images/partly_cloudy"+ icon +".png";
        document.querySelector("h1").innerHTML = temp + "°C";
        document.querySelector(".description").innerHTML= description;
        document.querySelector(".humidity").innerHTML= "Humidity: " + humidity +"%";
        document.querySelector(".wind").innerHTML= "wind speed:" +speed+  "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
     search: function(){
        this.fetchweather(document.querySelector(".search-bar").value);
     } 
}
document
    .querySelector(".search button")
    .addEventListener("click", function(){
        weather.search()

    });
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
        
    }

});
weather.fetchweather("rajasthan");