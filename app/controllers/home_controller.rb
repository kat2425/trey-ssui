class HomeController < ApplicationController
  def index
    authenticate!
  end
end
