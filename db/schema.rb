# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150830191704) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "institution_emails", force: :cascade do |t|
    t.integer  "institution_id"
    t.string   "instn_domain",   null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "institution_emails", ["institution_id", "instn_domain"], name: "index_institution_emails_on_institution_id_and_instn_domain", unique: true, using: :btree
  add_index "institution_emails", ["institution_id"], name: "index_institution_emails_on_institution_id", using: :btree

  create_table "institutions", force: :cascade do |t|
    t.string   "name",             null: false
    t.string   "country",          null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "state",            null: false
    t.string   "language",         null: false
    t.string   "facebook_pid"
    t.string   "facebook_img_url"
    t.string   "extract"
  end

  add_index "institutions", ["country"], name: "index_institutions_on_country", using: :btree
  add_index "institutions", ["id", "name", "country"], name: "index_institutions_on_id_and_name_and_country", unique: true, using: :btree
  add_index "institutions", ["name"], name: "index_institutions_on_name", using: :btree
  add_index "institutions", ["state"], name: "index_institutions_on_state", using: :btree

  create_table "mailboxer_conversation_opt_outs", force: :cascade do |t|
    t.integer "unsubscriber_id"
    t.string  "unsubscriber_type"
    t.integer "conversation_id"
  end

  add_index "mailboxer_conversation_opt_outs", ["conversation_id"], name: "index_mailboxer_conversation_opt_outs_on_conversation_id", using: :btree
  add_index "mailboxer_conversation_opt_outs", ["unsubscriber_id", "unsubscriber_type"], name: "index_mailboxer_conversation_opt_outs_on_unsubscriber_id_type", using: :btree

  create_table "mailboxer_conversations", force: :cascade do |t|
    t.string   "subject",    default: ""
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "mailboxer_notifications", force: :cascade do |t|
    t.string   "type"
    t.text     "body"
    t.string   "subject",              default: ""
    t.integer  "sender_id"
    t.string   "sender_type"
    t.integer  "conversation_id"
    t.boolean  "draft",                default: false
    t.string   "notification_code"
    t.integer  "notified_object_id"
    t.string   "notified_object_type"
    t.string   "attachment"
    t.datetime "updated_at",                           null: false
    t.datetime "created_at",                           null: false
    t.boolean  "global",               default: false
    t.datetime "expires"
  end

  add_index "mailboxer_notifications", ["conversation_id"], name: "index_mailboxer_notifications_on_conversation_id", using: :btree
  add_index "mailboxer_notifications", ["notified_object_id", "notified_object_type"], name: "index_mailboxer_notifications_on_notified_object_id_and_type", using: :btree
  add_index "mailboxer_notifications", ["sender_id", "sender_type"], name: "index_mailboxer_notifications_on_sender_id_and_sender_type", using: :btree
  add_index "mailboxer_notifications", ["type"], name: "index_mailboxer_notifications_on_type", using: :btree

  create_table "mailboxer_receipts", force: :cascade do |t|
    t.integer  "receiver_id"
    t.string   "receiver_type"
    t.integer  "notification_id",                            null: false
    t.boolean  "is_read",                    default: false
    t.boolean  "trashed",                    default: false
    t.boolean  "deleted",                    default: false
    t.string   "mailbox_type",    limit: 25
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
  end

  add_index "mailboxer_receipts", ["notification_id"], name: "index_mailboxer_receipts_on_notification_id", using: :btree
  add_index "mailboxer_receipts", ["receiver_id", "receiver_type"], name: "index_mailboxer_receipts_on_receiver_id_and_receiver_type", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                               default: "", null: false
    t.string   "encrypted_password",                  default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
    t.string   "provider"
    t.string   "uid"
    t.boolean  "admin"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "gender"
    t.string   "image_url"
    t.string   "username"
    t.string   "course"
    t.string   "bio"
    t.string   "citizenship"
    t.boolean  "home_institution_confirmed"
    t.string   "home_institution_confirmation_token"
    t.string   "home_email"
    t.string   "exchange_email"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "usr_instn_connects", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "institution_id"
    t.date     "start_date"
    t.date     "end_date"
    t.boolean  "is_home_institution", null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  add_index "usr_instn_connects", ["institution_id"], name: "index_usr_instn_connects_on_institution_id", using: :btree
  add_index "usr_instn_connects", ["user_id", "institution_id"], name: "index_usr_instn_connects_on_user_id_and_institution_id", unique: true, using: :btree
  add_index "usr_instn_connects", ["user_id"], name: "index_usr_instn_connects_on_user_id", using: :btree

  add_foreign_key "institution_emails", "institutions"
  add_foreign_key "mailboxer_conversation_opt_outs", "mailboxer_conversations", column: "conversation_id", name: "mb_opt_outs_on_conversations_id"
  add_foreign_key "mailboxer_notifications", "mailboxer_conversations", column: "conversation_id", name: "notifications_on_conversation_id"
  add_foreign_key "mailboxer_receipts", "mailboxer_notifications", column: "notification_id", name: "receipts_on_notification_id"
  add_foreign_key "usr_instn_connects", "institutions"
  add_foreign_key "usr_instn_connects", "users"
end
