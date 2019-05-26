//A través del cual se procesa las peticiones del usuario
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var multer = require('multer');
var cloudinary = require("cloudinary");
var app_password = "123";
var method_override = require("method-override");
var carga = multer({ dest: './uploads' });
var app = express();
var Suicide = null;

mongoose.connect('mongodb://localhost:27017/Suicide_database', { useNewUrlParser: true })
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        Suicide = mongoose.model("SU", suicideSchemaJSON, 'SU');
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
var suicideSchemaJSON = new Schema({
    country: String,
    year: Number,
    sex: String,
    age: String,
    suicides_no: Number,
    population: Number,
    generation: String,
    suicides_100kpop: Number,
    country_year: String,
    gdp_for_year_$: String,
    gdp_per_capita_$: String,
    latitude: Number,
    longitude: Number,
    continent: String
});

//Pagina de Inicio
app.get("/", function(solicitud, respuesta) {
    respuesta.render("index");
});

//Pagina Cargar y Mostrar Datos
app.post("/data", function(solicitud, respuesta) {
    if (solicitud.body.password == app_password) {
        Suicide.find(function(error, documento) {
            if (error) { console.log(error); }
            respuesta.render("data/index", { suicides: documento })
        }).limit(20);
    } else {
        respuesta.redirect("/");
    }
});
app.get("/data", function(solicitud, respuesta) {
    respuesta.render("data/form");
});

//Pagina Nuevo Registro
app.post("/data", function(solicitud, respuesta) {
    if (solicitud.body.password == app_password) {
        //console.log(solicitud.bodyParser);
        var data = {
            country: solicitud.body.country,
            year: solicitud.body.year,
            sex: solicitud.body.sex,
            age: solicitud.body.age,
            suicides_no: solicitud.body.suicides_no,
            population: solicitud.body.population,
            generation: solicitud.body.generation,
            suicides_100kpop: solicitud.body.suicides_100kpop,
            country_year: solicitud.body.country_year,
            gdp_for_year_$: solicitud.body.gdp_for_year_$,
            gdp_per_capita_$: solicitud.body.gdp_per_capita_$,
            latitude: solicitud.body.latitude,
            longitude: solicitud.body.longitude,
            continent: solicitud.body.continent
        }
        var suicide = new Suicide(data);
        suicide.save(function(err) {
            console.log(suicide);
            respuesta.redirect("/");
        });
    } else {
        respuesta.render("data/new");
    }
});
app.get("/data/new", function(solicitud, respuesta) {
    respuesta.render("data/new");
});

//Pagina Editar
app.put("/data/:id", function(solicitud, respuesta) {
    if (solicitud.body.password == app_password) {
        //console.log(solicitud.bodyParser);
        var data = {
            country: solicitud.body.country,
            year: solicitud.body.year,
            sex: solicitud.body.sex,
            age: solicitud.body.age,
            suicides_no: solicitud.body.suicides_no,
            population: solicitud.body.population,
            generation: solicitud.body.generation,
            suicides_100kpop: solicitud.body.suicides_100kpop,
            country_year: solicitud.body.country_year,
            gdp_for_year_$: solicitud.body.gdp_for_year_$,
            gdp_per_capita_$: solicitud.body.gdp_per_capita_$,
            latitude: solicitud.body.latitude,
            longitude: solicitud.body.longitude,
            continent: solicitud.body.continent
        };
        Console.log(data);
        Product.update({ "_id": solicitud.params.id }, data, function(product) {
            respuesta.redirect("/");
        });
    } else {
        respuesta.redirect("/");
    }
});

app.get("/data/edit/:id", function(solicitud, respuesta) {
    var id_suicide = solicitud.params.id;
    console.log(id_suicide);
    Suicide.findById(id_suicide, function(error, suicide) {
        console.log(suicide);
        respuesta.render("data/edit", { suicid: suicide });
    });
});

//Pagina Delete
app.get("/data/delete/:id", function(solicitud, respuesta) {
    var id = solicitud.params.id;
    Suicide.findById(id, function(err, documento) {
        if (err) {
            console.log(err);
        }
        respuesta.render("data/delete", { suicid: documento });
    });
});
app.delete("/data/:id", function(solicitud, respuesta) {
    var id = solicitud.params.id;
    if (solicitud.body.password == app_password) {
        Suicide.remove({ "_id": id }, function(err) {
            if (err) { console.log(err); }
            respuesta.redirect("/data");
        });
    } else {
        respuesta.redirect("/data");
    }
});

//Pagina Acerca del Tema
app.get("/acerca", function(solicitud, respuesta) {
    respuesta.render("acerca/index");
});

//Pagina WebGL Globe
app.get("/globe", function(solicitud, respuesta) {
    respuesta.render("globe/index");
});

//Pagina Dashboard
app.get("/dashboard", function(solicitud, respuesta) {
    respuesta.render("dashboard/index");
});

app.get('/dashboard', function(req, res) {
    res.sendFile(__dirname + 'myjs.js');
});

//Consulta Genero
app.get("/gender", function(solicitud, respuesta) {
    console.log('Llego a consultar el conteo del genero')
    mongoose.connection.db.collection('SU').aggregate([{

        $group: {
            _id: '$sex',
            total: { $sum: '$suicides_no' }
        },

    }]).toArray(function(err, docs) {

        let totales = [];
        if (err) {

            respuesta.send('Error en la consulta')
        }
        for (let i = 0; i < docs.length; i++) {
            let actual = docs[i];

            totales.push({ label: actual._id, valor: actual.total })
        }
        respuesta.send({ data: totales })

    })

});

//Consulta Edad
app.get("/age", function(solicitud, respuesta) {
    console.log('Llego a consultar el conteo de la edad')
    mongoose.connection.db.collection('SU').aggregate([{

            $group: {
                _id: '$age',
                total: { $sum: '$suicides_no' }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]).toArray(function(err, docs) {

        let totales = [];
        if (err) {

            respuesta.send('Error en la consulta')
        }
        for (let i = 0; i < docs.length; i++) {
            let actual = docs[i];

            if (actual._id == '5-14 years') {
                totales.unshift({ label: actual._id.replace(" years", ""), valor: actual.total })
            } else {
                totales.push({ label: actual._id.replace(" years", ""), valor: actual.total })
            }
        }
        respuesta.send({ data: totales })

    })

});

//Consulta Generación
app.get("/generation", function(solicitud, respuesta) {
    console.log('Llego a consultar el conteo de la generación')
    mongoose.connection.db.collection('SU').aggregate([{

        $group: {
            _id: '$generation',
            total: { $sum: '$suicides_no' }
        },

    }]).toArray(function(err, docs) {

        let totales = [];
        if (err) {

            respuesta.send('Error en la consulta')
        }


        for (let i = 0; i < docs.length; i++) {
            let actual = docs[i];
            totales.push({ label: actual._id, valor: actual.total })
        }

        respuesta.send({ data: totales })

    })

});

//Consulta Continente
app.get("/continent", function(solicitud, respuesta) {
    console.log('Llego a consultar el conteo de la generación')
    mongoose.connection.db.collection('SU').aggregate([{

        $group: {
            _id: '$continent',
            total: { $sum: '$suicides_no' }
        },

    }]).toArray(function(err, docs) {

        let totales = [];
        if (err) {

            respuesta.send('Error en la consulta')
        }


        for (let i = 0; i < docs.length; i++) {
            let actual = docs[i];
            totales.push({ label: actual._id, valor: actual.total })
        }

        respuesta.send({ data: totales })

    })

});

//Consulta Etiquetas Paises
app.get("/countryLabels", function(solicitud, respuesta) {
    console.log('Llego a consultar los labels de cada Páis')
    mongoose.connection.db.collection('SU').aggregate([{
        $group: {
            _id: '$country',
        },
    }]).toArray(function(err, docs) {
        let totales = [];
        if (err) {
            respuesta.send('Error en la consulta')
        }
        for (let i = 0; i < docs.length; i++) {
            let actual = docs[i];

            totales.push({ label: actual._id })
        }
        respuesta.send({ data: totales })
    })
});

//Puerto del servidor
app.listen(8080);