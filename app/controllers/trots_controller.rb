class Api::TrotsController < ApplicationController

  def index
    @trots = current_user.trots
    render :index
  end

  def show
    @trot = Trot.find(params[:id])
    render :show
  end

  def create
    @trot = current_user.trots.new(trot_params)
    @trot.route_id = params[:route_id]

    if @trot.save
      render 'api/trots/show'
    else
      render json: @trot.errors.full_messages, status: 422
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
      .permit(:name, :description, :duration, :date)
  end
end