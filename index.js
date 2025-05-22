const exp=require('express');
const con=require("./cnofig/db")
const geolib=require("geolib")
const bodyp=require('body-parser')
require("dotenv").config();

const app=exp()
app.use(bodyp.json())

app.post("/addSchool",(rq,rs)=>{
    console.log(rq.body)

    const {name,address,latitude,longitude}=rq.body;
    if(!name || !address || !latitude|| !longitude)
        return rs.json({error:"all fields are required"})

    const query="INSERT INTO schools (name , address , latitude , longitude) VALUES (?,?,?,?)";
    con.query(query,[name,address,latitude,longitude],(err,res)=>{
 if(err) 
    return rs.json({error:err})

rs.json({msg:"school added sucessfully"})
    })
})



app.post("/listSchool",(rq,rs)=>{
const {latitude,longitude}=rq.body
if(!latitude || !longitude)
    return rs.json({error:err})
const UserLocation={latitude:parseFloat(latitude),longitude:parseFloat(longitude)}
const query="SELECT * FROM schools";
con.query(query,(err,res)=>{
    if(err)
        return rs.json({error:err})
    const sortedSchool=res.map(school =>({
        ...school,
        distance:geolib.getDistance(UserLocation,{
            latitude:school.latitude,
            longitude:school.longitude
        })
    })).sort((a,b)=>a.distance-b.distance)
    rs.json({result:sortedSchool})
})

})

app.listen(process.env.port,()=>{
    console.log("listen at 5000")
})