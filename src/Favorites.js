import { useRef } from "react";
function Favorites({favorites}){

    // let items=JSON.parse(localStorage.getItem('Food')) ||[];
    // const favorites=useRef(items)
    return(
    <div className="img-container">
    {favorites && favorites.map((f)=>{
        // console.log(f)
        return(
            <div className="fav-portrait">
                <img src={f.Image} alt="" />
            </div>
        )
    })}
    </div>
    )
}
export default Favorites