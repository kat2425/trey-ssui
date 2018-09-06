module Users
  module JasperUser
    extend ActiveSupport::Concern

    # Authentication                                                            {{{
    # -----------------------------------------------------------------------------
    def jasper_user_creds
      {
        :org      => district_id.gsub(/\-/, ''),
        :org_path => jasper_org_path,
        :token    => jasper_user_key
      }
    end

    def jasper_token
      jasper_user_key
    end

    # }}}
    # Account Update/Create                                                     {{{
    # -----------------------------------------------------------------------------
    def sync_jasper_account
      if jasper_user?
        update_jasper_account
      else
        create_jasper_account
      end
    end

    # }}}

    private
    # API Helpers
    # -----------------------------------------------------------------------------
    def jasper_user?
      jasper_do :get, jasper_uri[:organizations] + "/#{district_id.gsub(/\-/, '')}/users/#{id}" rescue false
    end

    def jasper_username ; username.gsub('+', '__')   ; end

    def jasper_user_key
      (id + Rails.configuration.x.jasper['user_key'] + district_id.gsub(/\-/, '')).md5
    end

    def jasper_org_path
      if district
        '/organizations/' + district_id.gsub(/\-/, '')
      end
    end

    def create_jasper_account
      jasper_do :put, jasper_uri[:organizations] + "/#{district_id.gsub(/\-/, '')}/users/#{id}", {
        :fullName     => "#{name} (#{username})",
          :emailAddress => username,
          :enabled      => !deleted?,
          :password     => jasper_user_key
      }

      set_jasper_attributes
    end

    def jasper_base_attributes
      {
        :attribute => [
          { :name => 'DISTRICT_UUID', :value => district_id },
          { :name => 'SCHOOL_IDS',    :value => school_filter.join(',') },
          { :name => 'MODULES',       :value => list_modules.join(',')  }
        ]
      }
    end

    def set_jasper_roles
      if is_teacher?
        jasper_do :put, jasper_uri[:organizations] + "/#{district_id.gsub(/\-/, '')}/users/#{id}", {
          :roles => [
            { :name => 'ROLE_USER' },
            { :name => 'ROLE_TEACHER' }
          ]
        }
      end
    end

    def jasper_attributes
      if is_teacher?
        jasper_base_attributes
      else
        jasper_base_attributes
      end
    end

    def set_jasper_attributes
      jasper_do :put, jasper_uri[:organizations] + "/#{district_id.gsub(/\-/, '')}/users/#{id}/attributes", jasper_attributes

      # set roles once attrs are complete
      # ---------------------------------------------------------------------------
      set_jasper_roles
    end

    def update_jasper_account
      set_jasper_attributes
    end
  end
end
