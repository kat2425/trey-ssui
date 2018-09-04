class ResetController < ApplicationController
  layout 'default'

  def index
    logout
    cookies.delete 'ss_session'
  end
end
