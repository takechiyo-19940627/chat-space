class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { @message = Message.where('id > ?', last_message_params) }
    end
  end

  private
  def last_message_params
    params.permit(:last_message_id)
  end
end