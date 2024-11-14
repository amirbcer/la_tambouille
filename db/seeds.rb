# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
puts "Seeding database '#{ActiveRecord::Base.connection.current_database}'"

# Create a user
User.create(
  email_address: "test@latambouille.com",
  password: "latambouille69",
  name: "Johnny Love"
)

# Create recipes
file = File.read File.join(__dir__, "seeds.json")
recipes = JSON.parse(file, symbolize_names: true)

recipes.each do |recipe|
  Recipe.create(
    title: recipe[:title],
    picture: recipe[:picture],
    ingredients: recipe[:ingredients],
    steps: recipe[:steps],
    description: recipe[:description],
    user_id: recipe[:user_id]
  )
end