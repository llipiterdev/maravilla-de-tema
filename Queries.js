
//Suicidios por 100k personas por género
//Histograma
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "sex": { $ne : null}}},
    {$group : {
        _id: "$sex",
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "Gender": "$_id", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Suicides per 100k":1}}
])

//Suicidios por 100k personas por edad
//Histograma
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "age": { $ne : null}}},
    {$group : {
        _id: "$age",
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "Age": "$_id", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Suicides per 100k":1}}
])
//Suicidios por 100k por Generación
//Histograma
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "generation": { $ne : null}}},
    {$group : {
        _id: "$generation",
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "Generation": "$_id", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Suicides per 100k":1}}
])

//Suicidios por 100k por Continente
//Histograma
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "continent": { $ne : null}}},
    {$group : {
        _id: "$continent",
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "Continent": "$_id", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Suicides per 100k":1}}
])

//Suicidios por 100k en el tiempo
//Diagrama de linea (o de puntos)
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "year": { $ne : null}}},
    {$group : {
        _id: "$year",
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "Year": "$_id", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Year":1}}
])
//Suicidios por 100k en el tiempo para colombia
//Diagrama de línea (o de puntos)
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "year": { $ne : null}, "country": "Colombia"}},
    {$group : {
        _id: "$year",
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "Year": "$_id", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Year":1}}
])
//Suicidios por 100k para los 10 primeros países
//Histograma horizontal, la categoría es el eje y
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "year": { $ne : null}}},
    {$group : {
        _id: "$country",
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "country": "$_id", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Suicides per 100k": -1}},
    {$limit : 10},
    {$sort : {"Suicides per 100k": 1}}
])
//Suicidios por 100k ratio H/M para los 10 primeros países
//Histograma horizontal, la categoría es el eje y
db.SU.aggregate([
    {$addFields : { "SuicInt": {$toInt:"$suicides_no"}, "TotalPobInt" : {$toInt :"$population"}}},
    {$match : { "year": { $ne : null}}},
    {$group : {
        _id: {country:"$country", sex:"$sex"},
        "TotalSuicides": {
          $sum: "$SuicInt"
        },
        "TotalPopulation":{
          $sum: "$TotalPobInt"
        }
      }},
    {$project : {"Suicides%": { $divide : ["$TotalSuicides","$TotalPopulation"]}}},
    {$project : {_id : 0, "Country": "$_id.country", "Gender":"$_id.sex", "Suicides per 100k" : { $multiply: ["$Suicides%",100000]}}},
    {$sort : {"Country":1, "Gender":1}},
    {$group : {
        _id:"$Country",
        "SuicWomen" : {$sum : { $cond : [{ $eq : ["$Gender" , "female"]}, "$Suicides per 100k",0]} },
        "SuicMen" : {$sum : { $cond : [{ $eq : ["$Gender" , "male"]}, "$Suicides per 100k",0]} }
    }},
    {$match : {"SuicWomen" : { $ne : 0}}},
    {$project : {"Country":1, "Suicide Ratio" : { $divide : ["$SuicMen","$SuicWomen"]}}},
    {$sort: {"Suicide Ratio":-1}},
    {$limit : 10},
    {$sort: {"Suicide Ratio":1}}
])
//GDP por país para los 10 primeros paises
//Histograma horizontal, la categoría es el eje y
db.SU.aggregate([
    {$addFields : { "GDPInt": {$toInt:"$gdp_per_capita ($)"}}},
    {$match : { "year": { $ne : null}}},
    {$group : {
        _id: "$country",
        "avgGDP": {
          $avg: "$GDPInt"
        }
      }},
    {$project: {"Country":"$_id", "_id":0, "GDP average ($)":"$avgGDP"}},
    {$sort: {"GDP average ($)":-1}},
    {$limit : 10},
    {$sort: {"GDP average ($)":1}}
])