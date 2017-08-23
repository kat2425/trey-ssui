# Puma configuration
# ---------------------------------------------------------------------------------
workers         Integer(ENV['PUMA_WORKER_COUNT'] || 2)
threads         16,96
bind            "unix:#{ENV['PWD'].strip}/tmp/puma.sock"
tag             'ss_ui_puma'
stdout_redirect "#{ENV['PWD']}/log/ss_ui.stdout.log", "#{ENV['PWD']}/log/ss_ui.stderr.log"

preload_app!

on_worker_boot do
  Sequel::Model.db.disconnect
end
