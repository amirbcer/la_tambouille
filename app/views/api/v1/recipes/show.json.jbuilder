json.id @recipe.id
json.title @recipe.title
json.content @recipe.content.body
json.author @recipe.user.name
json.picture rails_blob_path(@recipe.picture, only_path: true) if @recipe.picture.attached?
