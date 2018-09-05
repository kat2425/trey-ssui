class HomeController < ApplicationController
  def index
    authenticate!

    redirect_to('/cj/blog') if user.is_superuser?
  end
end
