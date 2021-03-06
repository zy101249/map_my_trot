class Api::UsersController < ApplicationController

  def index
    @users = current_user.potential_friends(params[:search])
    render :index
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors, status: 422
    end
  end

  def friends
    @friends = current_user.all_friends
    render :friends
  end

  def friendships
    @friendships = Friendship.where("user_id = :id OR friend_id = :id", id: current_user.id)
    render :friendships
  end

  private
  def user_params
    params
      .require(:user)
      .permit(:email, :password, :first_name, :last_name, :avatar, :search)
  end
end
