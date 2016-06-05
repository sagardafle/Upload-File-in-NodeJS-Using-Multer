var express =   require("express");
var multer  =   require('multer');
var app         =   express();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null,Date.now()+file.originalname);
  }
});

var upload = multer({ storage : storage}).single('upload_file');
app.set('view engine', 'ejs');
app.get('/',function(req,res){
      //res.sendFile(__dirname + "/index.ejs");
    res.render('index');
});

app.post('/upload',function(req,res){
    
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });    
});

app.listen(3000,function(){
    console.log("listening on port 3000");
});

