import { useEffect } from 'react';
import RecipesContainer from '../components/recipes/RecipesContainer';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useRecipes from '../hooks/useRecipes';

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
      <h2 className="text-xl font-semibold m-12">Découvre les recettes de la communauté !</h2>
      <RecipesContainer recipes={recipes} loading={loading} />
    </div>
  );
}

export default RecipesList;
