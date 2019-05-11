require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it 'is valid with a content' do
        message = build(:message, image: "")
        expect(message).to be_valid
      end

      it 'is valid with a image' do
        message = build(:message, content: "")
        expect(message).to be_valid
      end

      it 'is valid with content and image' do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context 'cannot save' do
      it 'is invalid without content and image' do
        message = build(:message, content: "", image: "")
        message.invalid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: "")
        message.invalid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invalid without user_id ' do
        message = build(:message, user_id: "")
        message.invalid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end
end