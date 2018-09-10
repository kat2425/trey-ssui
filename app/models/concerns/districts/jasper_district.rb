module Districts
  module JasperDistrict
    extend  ActiveSupport::Concern

    def sync_jasper_org
      unless jasper_org
        jasper_do :post, jasper_uri[:organizations], {
          :id         => id.gsub(/\-/, ''),
          :alias      => district_name.to_snake_case,
          :tenantName => "#{district_name} (#{district_code})",
          :theme      => 'bcg_embed'
        }
      end
    end

    private
    # API Helpers
    # -----------------------------------------------------------------------------
    def jasper_org
      jasper_do :get, jasper_uri[:organizations] + "/#{id.gsub(/\-/, '')}" rescue nil
    end

  end
end
