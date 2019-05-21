//A través del cual se procesa las peticiones del usuario
var express = require('express');
var mongoose = require('mongoose');
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
mongoose.connect('mongodb://localhost:27017/Suicide_database', { useNewUrlParser: true })
  .then(() => {
    // Cuando se realiza la conexión, lanzamos este mensaje por consola
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

//Definir el schema de los datos
var suicideSchemaJSON = {
  country: String,
  year: String,
  sex: String,
  age: String,
  suicides_no: String,
  population: String,
  generation: String,
  suicides_100kpop: String,
  country_year: String,
  HDI_for_year: String,
  gdp_for_year_$: String,
  gdp_per_capita_$: String
};
/*
suSchema.virtual("image.url").get(function () {
  if (this.imageUrl === "" || this.imageUrl === "data.png") {
    return "default.jpg";
  }
  return this.imageUrl;
});
*/
var Suicide = mongoose.model("SU", suicideSchemaJSON);
// Objeto JSON => Java Script Object Notation
/*
{
  titulo: "Mi primer producto",
  descripcion: "Un super producto"
}
{
  titulo: "Mi primer producto",
  descripcion: "Un super producto",
  cantidad_inventario: 10
}
*/

//HTTP verbo get
//Metodos
//GET = Obtener
//POST = Enviar
//Solicitud,Respuesta
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
  respuesta.render("dashboard/index");
});
//Puerto del servidor
app.listen(8080);