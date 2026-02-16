export const pahariFoods = [
{
slug:"bhatt",
name:"Bhatt ki Daal",
region:"Uttarakhand",
taste:"Nutty earthy protein rich",
image:"https://source.unsplash.com/1200x800/?indian,dal,lentils",
ingredients:["Black bhatt dal","Garlic","Spices","Mustard oil"],
steps:["Soak dal","Cook till soft","Temper spices","Simmer"]
},
{
slug:"kafuli",
name:"Kafuli",
region:"Garhwal",
taste:"Creamy spinach curry",
image:"https://source.unsplash.com/1200x800/?spinach,curry",
ingredients:["Spinach","Fenugreek","Curd","Spices"],
steps:["Boil greens","Grind paste","Cook with spices","Serve hot"]
},
{
slug:"aloo",
name:"Aloo ke Gutke",
region:"Kumaon",
taste:"Spicy smoky potato dish",
image:"https://source.unsplash.com/1200x800/?spicy,potato",
ingredients:["Potato","Red chilli","Mustard oil","Coriander"],
steps:["Boil potato","Saute spices","Add potato","Roast"]
},
{
slug:"kadhi",
name:"Pahadi Kadhi",
region:"Himachal",
taste:"Tangy warming curry",
image:"https://source.unsplash.com/1200x800/?kadhi,curry",
ingredients:["Curd","Gram flour","Spices"],
steps:["Whisk curd","Cook gravy","Simmer","Serve"]
},
{
slug:"bal",
name:"Bal Mithai",
region:"Almora",
taste:"Caramel fudge sweet",
image:"https://source.unsplash.com/1200x800/?indian,sweet",
ingredients:["Khoya","Sugar","Chocolate coating"],
steps:["Cook khoya","Caramelize","Shape","Coat sugar balls"]
}
];

export const getPahariBySlug = slug =>
  pahariFoods.find(x=>x.slug===slug);
