class BoardsController < ApplicationController
  include BoardAuthorization

  before_action :set_board, only: [:show, :edit, :update, :destroy]
  before_action :authorize_board_owner!, only: [:edit, :update, :destroy]

  def index
    @boards = Board.includes(:owner).order(updated_at: :desc)
  end

  def show
    @tasks_by_status = @board.tasks.includes(:assignees).ordered.group_by(&:status)
  end

  def new
    @board = Board.new
  end

  def create
    @board = current_user.owned_boards.build(board_params)
    if @board.save
      redirect_to @board, notice: "Board created successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @board.update(board_params)
      redirect_to @board, notice: "Board updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @board.destroy
    redirect_to boards_path, notice: "Board deleted successfully."
  end

  private

  def set_board
    @board = Board.find(params[:id])
  end

  def board_params
    params.require(:board).permit(:name, :description)
  end
end
