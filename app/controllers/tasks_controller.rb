class TasksController < ApplicationController
  before_action :set_board
  before_action :set_task, only: [:show, :edit, :update, :destroy, :update_status]

  def show
  end

  def new
    @task = @board.tasks.build
  end

  def create
    @task = @board.tasks.build(task_params)
    if @task.save
      redirect_to board_path(@board), notice: "Task created successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @task.update(task_params)
      redirect_to board_task_path(@board, @task), notice: "Task updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    redirect_to board_path(@board), notice: "Task deleted successfully."
  end

  def update_status
    if @task.update(status: params[:status])
      redirect_to board_path(@board), notice: "Task status updated."
    else
      redirect_to board_path(@board), alert: "Could not update status."
    end
  end

  private

  def set_board
    @board = Board.find(params[:board_id])
  end

  def set_task
    @task = @board.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :status, :priority, :position, :due_date, assignee_ids: [])
  end
end
