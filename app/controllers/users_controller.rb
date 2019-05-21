class UsersController < ApplicationController
  before_action :set_user

  def index
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:success] = '更新しました'
      redirect_to root_path
    else
      flash[:danger] = '更新できませんでした'
      render :edit
    end
  end

  def search
    @users = User.where('name LIKE(?)', "%#{params[:group_users]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:email, :name )
  end
end
