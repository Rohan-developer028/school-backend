const exp=require('express');
const con=require("./cnofig/db")
const geolib=require("geolib")
const bodyp=require('body-parser')
require("dotenv").config();

const app=exp()
app.use(bodyp.json())

app.post("/addSchool",async(rq,rs)=>{
    console.log(rq.body)
try{
    const {name,address,latitude,longitude}=rq.body;
    if(!name || !address || !latitude|| !longitude)
        return rs.json({error:"all fields are required"})

    const query="INSERT INTO schools (name , address , latitude , longitude) VALUES (?,?,?,?)";
   await con.promise().query(query,[name,address,latitude,longitude])
rs.json({msg:"school added sucessfully"})
}
catch(err){
    console.log(err)
    rs.json({error:err})
    
}
})


app.post("/listSchool", async (rq, rs) => {
  try {
    const { latitude, longitude } = rq.body;
    if (!latitude || !longitude)
      return rs.json({ error: "Latitude and longitude required" });

    const UserLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    const [schools] = await con.promise().query("SELECT * FROM schools");

    const sortedSchool = schools.map(school => ({
      ...school,
      distance: geolib.getDistance(UserLocation, {
        latitude: school.latitude,
        longitude: school.longitude
      })
    })).sort((a, b) => a.distance - b.distance);

    rs.json({ result: sortedSchool });
  } catch (err) {
    console.error(err);
    rs.status(500).json({ error: "Failed to list schools" });
  }
});


app.listen(process.env.port,()=>{
    console.log("listen at 5000")
})
