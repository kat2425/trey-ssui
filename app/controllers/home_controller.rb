class HomeController < ApplicationController
  def index
    authenticate!

    if user.is_superuser?
      redirect_to('/cj/blog')
    else
      # redirect for expired districts
      if user&.district.expired?
        redirect_to '/subscription_expired'
      end
    end
  end
end
