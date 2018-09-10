# Monkey Patches
# ---------------------------------------------------------------------------------

class String
  def md5
    Digest::MD5.hexdigest(self)
  end

  def to_snake_case
    return downcase if match(/\A[A-Z]+\z/)
                         gsub(/#| #|%/, '').
                         gsub(/([A-Z]+)([A-Z][a-z])/, '\1_\2').
                         gsub(/([a-z])([A-Z])/, '\1_\2').
                         gsub(/(\d+)/, '_\1_').
                         gsub(/ /, '_').
                         gsub(/-/, '').
                         gsub(/\./, '').
                         gsub(/_$/, '').
                         downcase
  end
end
