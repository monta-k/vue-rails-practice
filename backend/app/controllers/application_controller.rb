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
end
