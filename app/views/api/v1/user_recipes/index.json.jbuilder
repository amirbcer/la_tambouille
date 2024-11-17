json.data do
  json.total @total
  json.recipes do
    json.array! @recipes do |recipe|
      json.id recipe.id
      json.title recipe.title
      json.picture rails_blob_path(recipe.picture, only_path: true) if recipe.picture.attached?
    end
  end
end
