module BoardAuthorization
  extend ActiveSupport::Concern

  private

  def authorize_board_owner!
    unless @board.owner == current_user
      redirect_to boards_path, alert: "Not authorized."
    end
  end
end
