module JasperSoft
  extend ActiveSupport::Concern

  JASPER_URI = {
    :login         => '/rest/login/',           # Login must end with trailing /
    :organizations => '/rest_v2/organizations',
    :users         => '/users'
  }

  private
  # RESTful Client
  # -----------------------------------------------------------------------------
  def jasper_client ; @jasper_client ||= Mechanize.new                        ; end
  def jasper_url    ; @jasper_url    ||= Rails.configuration.x.jasper['root'] ; end
  def jasper_uri    ; JASPER_URI                                              ; end

  def jasper_admin
    @jasper_admin ||= {
      :user     => Rails.configuration.x.jasper['admin'] ,
      :password => Rails.configuration.x.jasper['password']
    }
  end

  def auth_header
    {
      'Authorization' => "Basic #{auth_hash}",
      'Content-Type'  => 'application/json'
    }
  end

  def auth_hash(auth_type=:admin)
    auth_type == :admin ? admin_auth_hash : user_auth_hash
  end

  def admin_auth_hash
    Base64.strict_encode64("#{jasper_admin[:user]}:#{jasper_admin[:password]}")
  end

  def user_auth_hash
    Base64.strict_encode64("#{id}|#{district_id.gsub(/\-/, '')}:#{jasper_user_key}")
  end

  def jasper_payload(payload)
    payload.nil? ? nil : payload.to_json
  end

  def jasper_do(action, uri, payload=nil)
    jasper_client.agent.http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    action = action.to_sym

    case action
    when :get
      jasper_client.send(action, *([jasper_url + uri, nil, nil, auth_header]))
    else
      jasper_client.send(action, *([jasper_url + uri, jasper_payload(payload), auth_header].compact))
    end
  end
end
