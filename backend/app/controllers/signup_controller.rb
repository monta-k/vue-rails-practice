class SignupController < ApplicationController
  def create
    if decoded_token = authenticate_firebase_id_token
      puts decoded_token
      @user = User.create(
        email: decoded_token['decode_token'][:payload]['email'],
        uid: decoded_token['uid']
      )
      render json: @user, status: :created
    else
      render json: {message: "some error" }, status: :unprocessable_entity
    end
  end
end
