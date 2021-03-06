class Api::RoutesController < ApplicationController

  def index
    @all_routes = current_user.routes.includes({ comments: [:user] })
    @count = @all_routes.length
    @routes = @all_routes.limit(5).offset(params[:offset])
    render :index
  end

  def show
    @route = Route.includes(:comments).find(params[:id])
    render :show
  end

  def create
    @route = current_user.routes.includes(:comments).new(route_params)

    if @route.save
      @route.activities.create!(user_id: current_user.id)
      render 'api/routes/show'
    else
      render json: @route.errors, status: 422
    end
  end

  def destroy
    @route = Route.find(params[:id])
    @route.destroy
    render json: @route.id
  end

  private

  def route_params
    params
      .require(:route)
      .permit(
        :name, :origin, :destination, :distance, :polyline, :bounds, :offset
      )
  end
end
