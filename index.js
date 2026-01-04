import express from "express";
import axios from "axios";

const app = express();
const port =3000;

let response;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/",async(req,res)=>{
        res.render("home.ejs");
});

app.get("/fullList",async(req,res)=>{
    let sort = req.query.sort || "asc";
    try{
        let page= req.query.page || 1;
        let status = req.query.status || "";
        let order = req.query.order_by || "";
        let rating = req.query.rating || "";
        let q = req.query.q || "";
        const params = {
            page,
            status,
            order_by: order || undefined,
            sort: sort || undefined,
            rating,
            q: q || undefined
        };
        Object.keys(params).forEach(k => params[k] === undefined && delete params[k]);
        response = await axios.get(`https://api.jikan.moe/v4/anime`,{params});
        res.render("index.ejs",{content:response.data,query: {
            q,
            status,
            rating,
            sort,
            order_by:order
        }})
    }
    catch(e){
        console.log("Error: "+e);
        res.status(500).send("Error While fetching data");
    }
});

app.get("/genres/:genre/:id",async(req,res)=>{
    const genreId = req.params.id;
    const genreName = req.params.genre;
    let sort = req.query.sort || "asc";
    try{
        let page= req.query.page || 1;
        let status = req.query.status || "";
        let order = req.query.order_by || "";
        let rating = req.query.rating || "";
        let q = req.query.q || "";
        const params = {
            page,
            status,
            order_by: order || undefined,
            sort: sort || undefined,
            rating,
            q: q || undefined,
            genres: genreId
        };
        Object.keys(params).forEach(k => params[k] === undefined && delete params[k]);
        response = await axios.get(`https://api.jikan.moe/v4/anime`,{params});
        res.render("genre.ejs",{content:response.data,query: {
            q,
            status,
            rating,
            sort,
            order_by:order,
            genreId,
            genreName
        }})
    }
    catch(e){
        console.log("Error: "+e);
        res.status(500).send("Error While fetching data");
    }
});

app.get("/genreList",async(req,res)=>{
    try{
        let genreList = await axios.get("https://api.jikan.moe/v4/genres/anime");
        res.render("genreList.ejs",{genres:genreList.data});
    }
    catch(e){
        console.log("Error: "+e);
        res.status(500).send("Error While fetching data");
    }
    
});

app.get("/random",(req,res)=>{
    res.render("random.ejs");
});

app.listen(port,()=>{
    console.log(`App is lsitening on port ${port}`);
})