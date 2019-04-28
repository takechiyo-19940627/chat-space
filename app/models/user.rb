class User < ApplicationRecord
<<<<<<< HEAD
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
=======
>>>>>>> ab240d3a1e87a4f2c9e4dd3fcae5bfdbe1e76130
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
