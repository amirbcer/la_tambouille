class CreateRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :recipes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :picture
      t.string :ingredients, array: true, default: []
      t.text :steps, array: true, default: []
      t.text :description

      t.timestamps
    end
  end
end
