class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  
  private

    def authenticate_firebase_id_token
      begin
        token = request.headers['Authorization']
        decoded_token = FirebaseHelper::Auth.verify_id_token(token)
      rescue => e
        logger.error(e.message)
        false
      end
    end

    def authenticate
      return if (decoded_token = authenticate_firebase_id_token) && (@current_user = User.find_by(uid: decoded_token['uid']))
      render json: {message: "some error" }, status: :unprocessable_entity
    end
end
