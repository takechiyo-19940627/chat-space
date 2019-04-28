class UsersController < ApplicationController
  before_action :logged_in?, only: [:edit, :update]
  before_action :set_user

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

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:email, :name )
  end
end
