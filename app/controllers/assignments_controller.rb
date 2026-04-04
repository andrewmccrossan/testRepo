class AssignmentsController < ApplicationController
  before_action :set_board_and_task

  def create
    @assignment = @task.assignments.build(user_id: params[:user_id])
    if @assignment.save
      redirect_to board_task_path(@board, @task), notice: "User assigned successfully."
    else
      redirect_to board_task_path(@board, @task), alert: "Could not assign user."
    end
  end

  def destroy
    @assignment = @task.assignments.find(params[:id])
    @assignment.destroy
    redirect_to board_task_path(@board, @task), notice: "User unassigned successfully."
  end

  private

  def set_board_and_task
    @board = Board.find(params[:board_id])
    @task = @board.tasks.find(params[:task_id])
  end
end
