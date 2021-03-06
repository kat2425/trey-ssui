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
  ((t >= "#{t.year}-07-31".to_date) && t.month <= 12) ? t.year + 1 : t.year
end

module SchoolStatus
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # JasperSoft Configuration                                                  {{{
    # -----------------------------------------------------------------------------
    config.x.jasper.root      = ENV['JASPER_URI'] || 'http://skagos.local:8080/jasperserver-pro'
    config.x.jasper.user_key  = '87fe4f01bd121f1363b1d6e530a67f76'
    config.x.jasper.admin     = 'ss-admin'
    config.x.jasper.password  = 'outtatime'
    config.x.jasper.admin_ui  = '/flow.html?_flowId=homeFlow&theme=ss_admin'
    config.x.jasper.adhoc     = '/flow.html?_flowId=adhocFlow&mode=browse&theme=default'
    config.x.jasper.dashboard = '/dashboard/designer.html?theme=default'
    config.x.jasper.viewer    = '/flow.html?_flowId=searchFlow&mode=search&filterId=resourceTypeFilter&filterOption=resourceTypeFilter-reports&searchText=&theme=default'

    # }}}

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
