import { useEffect } from 'react';
import RecipesContainer from '../components/RecipesContainer';
import useRecipes from '../hooks/useRecipes';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

function RecipesList() {
  const { page, nextPage } = useInfiniteScroll();
  const { recipes, loading, fullyLoaded } = useRecipes(page);
  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollHeight - 300 < window.scrollY + window.innerHeight && !fullyLoaded) {
        nextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextPage, fullyLoaded]);

  return (
    <div>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-96 justify-center items-center flex flex-col  space-y-2">
        <p className="text-lg sm:text-xl md:text-3xl text-white font-bold">Bienvenue sur La Tambouille 🍽️</p>
        <p className="text-lg sm:text-xl text-white font-bold">Trouve ta recette favorite !</p>
      </div>
      <RecipesContainer recipes={recipes} loading={loading} />
    </div>
  );
}

export default RecipesList;
