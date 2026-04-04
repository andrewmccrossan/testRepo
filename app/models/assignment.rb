class Assignment < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :user_id, uniqueness: { scope: :task_id, message: "is already assigned to this task" }
end
