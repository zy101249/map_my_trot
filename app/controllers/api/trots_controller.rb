class Api::TrotsController < ApplicationController

  def index
    @trots = current_user.trots.includes(:route, :comments)
    render :index
  end

  def show
    @trot = Trot.includes(:route, :comments).find(params[:id])
    render :show
  end

  def create
    @trot = current_user.trots.includes(:route, :comments).new(trot_params)
    @trot.route_id = trot_params[:route_id]

    if @trot.save
      render 'api/trots/show'
    else
      render json: @trot.errors, status: 422
    end
  end

  def destroy
    @trot = Trot.find(params[:id])
    @trot.destroy
    render json: @trot.id
  end

  private

  def trot_params
    params
      .require(:trot)
      .permit(:name, :description, :duration, :date, :route_id)
  end
end
