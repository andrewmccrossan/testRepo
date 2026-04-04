class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :owned_boards, class_name: "Board", foreign_key: :owner_id, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :tasks, through: :assignments

  validates :name, presence: true
end
