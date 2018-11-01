# Be sure to restart your server when you modify this file.

# Specify a serializer for the signed and encrypted cookie jars.
# Valid options are :json, :marshal, and :hybrid.
Rails.application.config.middleware.use ActionDispatch::Cookies

if (ENV['RAILS_ENV'] == 'production') && ENV['GLOBAL_COOKIE']
  Rails.application.config.middleware.use ActionDispatch::Session::CookieStore, :key => 'ss_ui', :expire_after => 4.hours, :domain => '.schoolstatus.com'
else
  Rails.application.config.middleware.use ActionDispatch::Session::CookieStore, :key => 'ss_ui', :expire_after => 4.hours
end

Rails.application.config.action_dispatch.cookies_serializer = :marshal
