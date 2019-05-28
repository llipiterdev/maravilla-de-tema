//A través del cual se procesa las peticiones del usuario
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var multer = require('multer');
var cloudinary = require("cloudinary");
var app_password = "123";
var method_override = require("method-override");

cloudinary.config({
  cloud_name: "dzhaleuoj",
  api_key: "966977923799895",
  api_secret: "qz_iBU_YnWRlwjlbczSDgniwKlw"
});
var carga = multer({ dest: './uploads' });
var app = express();
var Suicide = null;
mongoose.connect('mongodb://admin:UWNKVSWOJXVDHBYB@sl-us-south-1-portal.3.dblayer.com:19753/STD?authSource=admin&ssl=true', { useNewUrlParser: true })
 .then(() => {
 // Cuando se realiza la conexión, lanzamos este mensaje por consola
 Suicide = mongoose.model("SU", suicideSchemaJSON,'SU');
 console.log('La conexión a MongoDB se ha realizado correctamente!!');
 })
 .catch(err => console.log(err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(carga);
app.use(method_override("_method"));
app.set("view engine", "jade");
app.use(express.static("public_globe"));
app.use(express.static("public"));
app.use(express.static(__dirname));


//Definir el schema de los datos
var suicideSchemaJSON = new Schema ({
  country: String,
  year: Number,
  sex: String,
  age: String,
  suicides_no: Number,
  population: Number,
  generation: String,
  suicides_100kpop: Number,
  country_year: String,
  HDI_for_year: String,
  gdp_for_year_$: String,
  gdp_per_capita_$: String,
  latitude: Number,
  longitude: Number,
  continent: String
});

app.get("/", function (solicitud, respuesta) {
  respuesta.render("index");
  //res.end("Hola mundo");
});

/*
app.get("/menu", function (solicitud, respuesta) {
  Product.find(function (error, documento) {
    if (error) { console.log(error); }
    respuesta.render("menu/index", { products: documento })
  });
});

app.put("/menu/:id", function (solicitud, respuesta) {
  if (solicitud.body.password == app_password) {
    //console.log(solicitud.bodyParser);
    var data = {
      title: solicitud.body.title,
      description: solicitud.body.description,
      imageUrl: "data.png",
      pricing: solicitud.body.pricing
    };
    Console.log(data);
    if (solicitud.files.hasOwnProperty("image_avatar")) {
      cloudinary.uploader.upload(solicitud.files.image_avatar.path,
        function (result) {
          data.imageUrl = result.url;
          Product.update({ "_id": solicitud.params.id }, data, function (product) {
            respuesta.redirect("/menu");
          });
        }
      );
    } else {
      Product.update({ "_id": solicitud.params.id }, data, function (product) {
        respuesta.redirect("/menu");
      });
    }
  } else {
    respuesta.redirect("/");
  }
});
app.get("/menu/edit/:id", function (solicitud, respuesta) {
  var id_producto = solicitud.params.id;
  console.log(id_producto);
  Product.findOne({ "_id": id_producto }, function (error, producto) {
    console.log(producto);
    respuesta.render("menu/edit", { product: producto });
  });
});

app.post("/data", function (solicitud, respuesta) {
  var data = {
    country: "Colombia",
    year: "2014",
    sex: "female",
    age: "55-74 years",
    suicides_no: "21",
    population: "1438935",
    generation: "Boomers",
    suicides_100kpop: "1.46",
    country_year: "Colombia2014",
    HDI_for_year_$: "0.675",
    gdp_for_year_$: "63,067,077,179",
    gdp_per_capita_$: "2309"
  }
  var suicide = new Suicide(data)
  suicide.save(function (error) {
    console.log(suicide);
    respuesta.render("/data");
  });
});
*/

app.post("/data", function (solicitud, respuesta) {
  if (solicitud.body.password == app_password) {
    Suicide.find(function (error, documento) {
      if (error) {
        console.log(error);
      }
      console.log(documento.id);
      respuesta.render("data/index", { suicides: documento })
    }).where('country').equals('Colombia').limit(20);
  } else {
    respuesta.redirect("/");
  }
});


app.get("/data", function (solicitud, respuesta) {
 respuesta.render("data/form");
 });
/*
app.post("/menu", function (solicitud, respuesta) {
  if (solicitud.body.password == app_password) {
    //console.log(solicitud.bodyParser);
    var data = {
      title: solicitud.body.title,
      description: solicitud.body.description,
      imageUrl: "data.png",
      pricing: solicitud.body.pricing
    }
    var product = new Product(data);
    //console.log(solicitud,files);
    if (solicitud.files.hasOwnProperty("image_avatar")) {
      cloudinary.uploader.upload(solicitud.files.image_avatar.path,
        function (result) {
          product.imageUrl = result.url;
          product.save(function (err) {
            console.log(product);
            respuesta.redirect("/menu");
          });
        }
      );
    } else {
      product.save(function (err) {
        console.log(product);
        respuesta.redirect("/menu");
      });
    }
  } else {
    respuesta.render("menu/new");
  }
});
app.get("/menu/new", function (solicitud, respuesta) {
  respuesta.render("menu/new");
});

app.get("/menu/delete/:id", function (solicitud, respuesta) {
  var id = solicitud.params.id;
  Product.findOne({ "_id": id }, function (err, producto) {
    respuesta.render("menu/delete", { producto: producto });
  });
});
app.delete("/menu/:id", function (solicitud, respuesta) {
  var id = solicitud.params.id;
  if (solicitud.body.password == app_password) {
    Product.remove({ "_id": id }, function (err) {
      if (err) { console.log(err); }
      respuesta.redirect("/menu");
    });
  } else {
    respuesta.redirect("/menu");

  }
});
*/
app.get("/acerca", function (solicitud, respuesta) {
  respuesta.render("acerca/index");
});
app.get("/globe", function (solicitud, respuesta) {
  respuesta.render("globe/index");
});
app.get("/dashboard", function (solicitud, respuesta) {
  respuesta.sendFile(__dirname+'/public/js/myjs.js');
  respuesta.render("dashboard/index");
});

app.get("/gender", function (solicitud, respuesta) {
  console.log('Llego a consultar el conteo del genero')
  mongoose.connection.db.collection('SU').aggregate([
    {

      $group : {
        _id: '$sex',
        total : {$sum:'$suicides_no'}
    },
    
  }]).toArray(function(err, docs){

    let totales = [];
    if(err){

      respuesta.send('Error en la consulta')
    }
    for(let i = 0;i<docs.length;i++){
      let actual = docs[i];

      totales.push({label: actual._id,valor:actual.total})
    }
    respuesta.send({data : totales})

  })

});


app.get("/generation", function (solicitud, respuesta) {
console.log('Llego a consultar el conteo de la generación')
mongoose.connection.db.collection('SU').aggregate([
  {

    $group : {
      _id: '$generation',
      total : {$sum:'$suicides_no'}
  },
  
}]).toArray(function(err, docs){

  let totales = [];
  if(err){

    respuesta.send('Error en la consulta')
  }


  for(let i = 0;i<docs.length;i++){
    let actual = docs[i];
   totales.push({label:actual._id, valor: actual.total})
  }

  respuesta.send({data : totales})

})

});

app.get("/age", function (solicitud, respuesta) {
  console.log('Llego a consultar el conteo de la edad')
  mongoose.connection.db.collection('SU').aggregate([
    {

      $group : {
        _id: '$age',
        total : {$sum:'$suicides_no'}
      }
    },
    {
    $sort : {
      _id: 1
    }
  } 
  ]).toArray(function(err, docs){

    let totales = [];
    if(err){

      respuesta.send('Error en la consulta')
    }
    for(let i = 0;i<docs.length;i++){
      let actual = docs[i];

      if(actual._id == '5-14 years'){
        totales.unshift({label: actual._id.replace(" years",""), valor:actual.total})
      } else {
        totales.push({label: actual._id.replace(" years",""), valor:actual.total})
      }
    }
    respuesta.send({data : totales})

  })

});

app.get("/continent", function (solicitud, respuesta) {
  console.log('Llego a consultar el conteo por cada continente')
  mongoose.connection.db.collection('SU').aggregate([
    {
  
      $group : {
        _id: '$continent',
        total : {$sum:'$suicides_no'}
    },
    
  }]).toArray(function(err, docs){
  
    let totales = [];
    if(err){
  
      respuesta.send('Error en la consulta')
    }
  
  
    for(let i = 0;i<docs.length;i++){
      let actual = docs[i];
     totales.push({label:actual._id, valor: actual.total})
    }
  
    respuesta.send({data : totales})
  
  })
  
  });


//Puerto del servidor
app.listen(8080);
