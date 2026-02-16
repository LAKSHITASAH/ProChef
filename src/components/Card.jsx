import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Card({meal,type}){

const link =
type==="pahari"
? `/pahari/${meal.slug}`
: `/meal/${meal.idMeal}`;

return(
<motion.div
whileHover={{scale:1.05}}
className="col-md-3 mb-4"
>
<Link to={link} className="text-decoration-none">

<div className="card bg-dark text-light shadow-lg border-0 h-100">

<img src={meal.strMealThumb || meal.image}
className="card-img-top"
style={{height:200,objectFit:"cover"}}
/>

<div className="card-body">
<h6>{meal.strMeal || meal.name}</h6>
<small className="text-secondary">
Click to view recipe
</small>
</div>

</div>
</Link>
</motion.div>
);
}
