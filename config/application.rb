require_relative 'boot'

# Typically, rails uses a `require 'rails/all' here, but in our case,
# since we override ActiveRecord with Sequel as our ORM of choice, we
# only require what is needed
require "active_model/railtie"
require "active_job/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# Set a global constant to reference current school year
CURRENT_SCHOOL_YEAR = begin
  t = Time.now.to_date

  if t.month >= 7 && t.month <= 12
    t.year + 1
  else
    t.year
  end
end

module SchoolStatus
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    unless ENV['NO_DB']
      config.sequel.after_connect = proc do
        Sequel::Model.db.extension :pg_array
        Sequel::Model.db.extension :pg_json

        Doorkeeper.configure do
          orm :sequel

          resource_owner_authenticator do
            User[session[:'warden.user.default.key']] || redirect_to('/login')
          end

          access_token_generator        '::Doorkeeper::JWT'
          authorization_code_expires_in 60.minutes
          access_token_expires_in       4.hours
        end

        Doorkeeper::JWT.configure do
          token_payload do |opts|
            user = User[opts[:resource_owner_id]]

            {
              :user => {
                :id         => user.id,
                :username   => user.username,
                :first_name => user.first_name,
                :last_name  => user.last_name
              }
            }
          end

          secret_key "foobar"
        end
      end
    end
  end
end
