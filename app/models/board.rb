class Board < ApplicationRecord
  belongs_to :owner, class_name: "User"
  has_many :tasks, dependent: :destroy

  validates :name, presence: true, length: { maximum: 100 }
end
