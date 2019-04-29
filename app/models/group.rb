class Group < ApplicationRecord
  has_many :group_users, thorough: :group_users
end
