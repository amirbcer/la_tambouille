json.array! @recipes do |recipe|
  json.id recipe.id
  json.title recipe.title
  json.picture recipe.picture
  json.author recipe.user.name
end
