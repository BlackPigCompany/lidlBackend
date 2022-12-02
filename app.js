const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const Article = require('./models/article');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect('mongodb+srv://Hadrien:jesaispas@cluster0.mfycueb.mongodb.net/test',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.post(('/api/produit'),(req,res,next)=>{
    const article = new Article ({
        ...req.body
    });
    article.save()
    .then(()=>res.status(201).json({message : 'article créé'}))
    .catch(error => res.status(400).json({error}))
});
app.get(('/api/produit'),(req,res,next)=>{
  Article.find()
  .then(articles => res.status(200).json({articles}))
  .catch(error => res.status(400).json({error}));
});
app.delete(('/api/produit/:id'),(req,res,next)=>{
  Article.deleteOne({_id:req.params.id})
  .then(()=>res.status(200).json({message:"objet supprimé"}))
  .catch(error => res.status(400).json({error}));
});

module.exports = app;