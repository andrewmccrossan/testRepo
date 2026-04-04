class Task < ApplicationRecord
  belongs_to :board
  has_many :assignments, dependent: :destroy
  has_many :assignees, through: :assignments, source: :user

  enum :status, { todo: 0, in_progress: 1, in_review: 2, done: 3 }
  enum :priority, { low: 0, medium: 1, high: 2, urgent: 3 }

  validates :title, presence: true, length: { maximum: 255 }
  validates :status, presence: true
  validates :priority, presence: true
  validates :position, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validate :due_date_not_in_past, on: :create

  scope :ordered, -> { order(:position) }
  scope :overdue, -> { where(status: [:todo, :in_progress, :in_review]).where("due_date < ?", Date.current) }

  private

  def due_date_not_in_past
    if due_date.present? && due_date < Date.current
      errors.add(:due_date, "cannot be in the past")
    end
  end
end
