class VerificationController < ApplicationController
  layout 'default'
  
  def index
  end
  def mobile
    potential_user_id = params[:potential_user_id]
    redirect_to "schoolstatus://mobile/verification/#{potential_user_id}"
  end
end
