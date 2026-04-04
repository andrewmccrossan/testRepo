class CreateAssignments < ActiveRecord::Migration[7.2]
  def change
    create_table :assignments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end

    add_index :assignments, [:user_id, :task_id], unique: true
  end
end
