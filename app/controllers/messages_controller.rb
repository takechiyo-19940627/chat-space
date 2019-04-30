class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def create
    message = Message.new(message_params)
    if message.save
      redirect_to root_url
    else
      render :index
    end
  end

  private
    def message_params
      params.require(:message).permit(:message, :user_id)
    end
end
