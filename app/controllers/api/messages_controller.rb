class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { @message = Message.where('id > ?', params[:message][:id]) }
    end
  end
end