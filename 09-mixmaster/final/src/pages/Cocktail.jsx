import { useLoaderData, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';
const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
import { useQuery } from '@tanstack/react-query';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

// this is initial Loading 
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    // loads the cache data, which will be used to display the cocktail ID pag 
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

// From Loader,  
const Cocktail = () => {
  const { id } = useLoaderData();

  // get the cocktail data 
  const { data } = useQuery(singleCocktailQuery(id));
  if (!data) return <Navigate to='/' />;

  const singleDrink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  // getting ingredients 
  const validIngredients = Object.keys(singleDrink)
    .filter(
      // get ONLY the ingredient key 
      // ONLY the starts with key 
      (key) => key.startsWith('strIngredient') && 
        // only the NON null key 
        singleDrink[key] !== null
    )
    // collect all of them 
    .map((key) => singleDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className='ing' key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
