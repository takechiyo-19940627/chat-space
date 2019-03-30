##DB設計

##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|text|null: false, add_index :users, :email, unique: true|
|password|text|null: false|

### Association
- has_many :groups, through: :group_members
- has_many :messages

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|


### Association
- has_many :users, through: :group_members
- has_many :messages

##group_membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group