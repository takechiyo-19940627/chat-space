FactoryBot.define do
  factory :message do
    content   {Faker::Lorem.sentence}
    image     {File.open("#{Rails.root}/spec/fixtures/image/25253_SwordArt_Online_PC.jpg")}
    user
    group
    created_at { Faker::Time.between(2.days.ago, Time.now, :all) }
  end
end