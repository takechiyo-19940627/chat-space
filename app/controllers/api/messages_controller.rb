class Api::MessagesController < ApplicationController

  def index
    respond_to do |format|
      format.json { @messages = Message.where('id > ?', params[:id]) }
      format.html
    end
  end

end