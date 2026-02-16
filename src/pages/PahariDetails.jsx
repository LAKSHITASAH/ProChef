import { useParams } from "react-router-dom";
import { getPahariBySlug } from "../data/pahari";

export default function PahariDetails(){

const {slug}=useParams();
const meal=getPahariBySlug(slug);

if(!meal) return <h2>Not found</h2>;

return(
<div className="container mt-4 text-light">

<h2>{meal.name}</h2>
<p className="text-warning">Famous in: {meal.region}</p>

<img src={meal.image}
className="img-fluid rounded mb-3"/>

<h4>Taste</h4>
<p>{meal.taste}</p>

<h4>Ingredients</h4>
<ul>
{meal.ingredients.map((i,n)=><li key={n}>{i}</li>)}
</ul>

<h4>Steps</h4>
<ol>
{meal.steps.map((s,n)=><li key={n}>{s}</li>)}
</ol>

</div>
);
}
