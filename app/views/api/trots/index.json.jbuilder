@trots.each do |trot|
  json.set! trot.id do
    json.id trot.id
    json.name trot.name
    json.description trot.description
    json.date trot.date
    json.created_at trot.created_at.strftime("%Y-%m-%d")
    json.set! :route do
      json.id trot.route_id
      json.name trot.route.name
      json.distance trot.route.distance
      json.polyline trot.route.polyline
      json.origin trot.route.origin
      json.destination trot.route.destination
      json.bounds trot.route.bounds
    end
    json.set! :comments do
      trot.comments.each do |comment|
        json.set! comment.id do
          json.id comment.id
          json.body comment.body
          json.commentable_id comment.commentable_id
          json.commentable_type comment.commentable_type
          json.created_at json.created_at
          json.set! :author do
            json.name "#{comment.user.first_name} #{comment.user.last_name}"
            json.image_url asset_path(comment.user.avatar.url)
          end
        end
      end
    end
  end
end
