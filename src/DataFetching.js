import React,{useState,useEffect,useRef} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {AiTwotoneHeart} from 'react-icons/ai'
import axios from 'axios'
import Favorites from './Favorites'
import "./index.css" 
function DataFetching() {
  const [meal,setMeal]=useState([]);
  const [loading,setLoading]=useState(true);
  //To force re render if needed
  // const [update,setUpdate]=useState(true)
  const[likedMeals,setLikedMeals]=useState([]);
  const [searchedMeal,setSearchedMeal]=useState("");
  let items=JSON.parse(localStorage.getItem('Food')) ||[]
  //Function to get random meal
    const getRandomMeal=async ()=>{
      let res=await axios.get("https://www.themealdb.com/api/json/v1/1/random.php")  
      console.log(res.data)
       setMeal(res.data.meals)
       setLoading(false);
}

    const getSearchedMeal=async (e)=>{
      e.preventDefault();
      console.log(searchedMeal)
      let url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`
      console.log(url)
      let res=await axios.get(url);
      setMeal(res.data.meals)
      console.log(res)
    }
    const storeLikedMeal=(mealName,mealImage)=>{
      console.log("doing")
      // Important concept
      setLikedMeals((likedMeals)=>{
        const x=[...likedMeals,{'Name':mealName,'Image':mealImage}];
        localStorage.setItem('Food',JSON.stringify(x));
        return x;
      });
        
        // setUpdate(!update)
    }
    
    
    useEffect(()=>{
     
      getRandomMeal() 
      //Set to liked meals to display new meal after every like
    },[likedMeals])
    
    // console.log(meal)
    if(loading){
       return (
      <section className="section-loading">
        <h1>Loading...</h1>
      </section>
    )
    }
    else{
      return (
        <main className='area'>
         <div className="search-area">
          {/* Search bar */}
          <div className="input">
            <input type="text" name="" id="" value={searchedMeal} onChange={(e)=>setSearchedMeal(e.target.value)} placeholder="Search..."/>
          </div>
          {/* Search icon */}
          <div>
            <button className='search-button' onClick={getSearchedMeal}><BiSearchAlt2 size={30}></BiSearchAlt2></button>
          </div>
         </div>
         <div className='favorite-area'>
          <div className='heading'>Favorite Meals</div>
          <div className="liked-meals">
              <Favorites favorites={items}></Favorites>
          </div>
         </div>
         {meal.map((m)=>{
            return(
              //What is react fragment
              <React.Fragment key={m.idMeal}>
                 <div className="image-area">
              <div className='random'>Random Recipe</div>
              <img src={m.strMealThumb} width={400} height={340} alt="" id='' />
             </div>
             <div className='like-area'>
              <div className="food-name">
                {m.strMeal}
              </div>
              <button id='like-button' onClick={()=>storeLikedMeal(meal[0].strMeal,meal[0].strMealThumb)}><AiTwotoneHeart size={30} color="red"></AiTwotoneHeart></button>
             </div>
              </React.Fragment>
             
            )
         })}
        
        </main>
      )
    }
  
}

export default DataFetching