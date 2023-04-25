// import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from 'react'
import axios from 'axios';
import {Button} from 'react-bootstrap'


function App() {
  const searchData = useRef(null)
  const [searchText, setsearchText] = useState("mountains")
  const [ImageData,setImageData]=useState([])
  useEffect(()=>{
const params = {
  method: "flickr.photos.search",
  api_key : "3421e21a97b30e9450e40394960aeeb8",
  text:searchText,
  sort :"",
  per_page:40,
  license:'4',
  extras:"owner_name, lincense",
  format:"json",
  nojsoncallback:1
}
const parameters = new URLSearchParams(params);
const url = `https://api.flickr.com/services/rest/?${parameters}`
axios.get(url).then((resp)=>{
  console.log(resp.data)
  const arr = resp.data.photos.photo.map((imgData)=>{
    return fetchFlickrImageUrl(imgData,'q');
  })
  setImageData(arr)
  // debugger
}).catch(()=>{

}).finally(()=>{

})
  },[searchText])
  const fetchFlickrImageUrl=(photo,size)=>{
   let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
 if(size){
  url += `_${size}`
 }
 url += '.jpg'
 return url
  }
  return (
<>
{/* <style>{` 
  .heading{
 @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&family=Open+Sans:wght@300&family=Poppins:ital,wght@0,200;0,300;0,500;0,700;1,200;1,400;1,500&display=swap');
}`
 
}

</style> */}
<h1 className='heading'>React photo search</h1>
<button className='bookmark'>Bookmark</button>
<input onChange={(e)=>{searchData.current =e.target.value}} placeholder="search.." classname='input'/>
<style type="text/css">
        {`
    .btn-flat {
      background-color:grey;
      color: white;
  
    }
    `}
</style>
<Button variant="flat" onClick={()=>{setsearchText(searchData.current)}}>search</Button>
<br/>
<section className='image-container'>
    {
      ImageData.map((imageurl,key)=>{
return (
  <article className='flickr-image'>
  <img src={imageurl} key={key}/>
  </article>
)
      })
    }
</section>
</>
  )
}

export default App;