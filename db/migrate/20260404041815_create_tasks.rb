class CreateTasks < ActiveRecord::Migration[7.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :status, null: false, default: 0
      t.integer :priority, null: false, default: 0
      t.integer :position, null: false, default: 0
      t.date :due_date
      t.references :board, null: false, foreign_key: true

      t.timestamps
    end
  end
end
