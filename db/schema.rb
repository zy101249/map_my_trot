# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161214201629) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer  "user_id",          null: false
    t.integer  "activatable_id",   null: false
    t.string   "activatable_type", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["activatable_id", "activatable_type"], name: "index_activities_on_activatable_id_and_activatable_type", using: :btree
    t.index ["user_id"], name: "index_activities_on_user_id", using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",          null: false
    t.string   "body",             null: false
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["commentable_id", "commentable_type"], name: "index_comments_on_commentable_id_and_commentable_type", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.string   "status",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", using: :btree
  end

  create_table "routes", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "name",        null: false
    t.float    "distance",    null: false
    t.text     "polyline",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "origin",      null: false
    t.string   "destination", null: false
    t.json     "bounds",      null: false
    t.index ["user_id"], name: "index_routes_on_user_id", using: :btree
  end

  create_table "trots", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "route_id",    null: false
    t.string   "description", null: false
    t.date     "date",        null: false
    t.string   "duration",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name",        null: false
    t.index ["user_id", "route_id"], name: "index_trots_on_user_id_and_route_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",          null: false
    t.string   "last_name",           null: false
    t.string   "email",               null: false
    t.string   "session_token",       null: false
    t.string   "password_digest",     null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

end
