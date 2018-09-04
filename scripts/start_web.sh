#!/bin/bash

touch log/ss-ui.stdout.log
touch log/ss-ui.stderr.log

echo `date` > .deploy_time &&
  service nginx restart &&
  tail -f /var/log/nginx/nginx-ss-ui.log log/ss-ui.stdout.log log/ss-ui.stderr.log &
  puma -C config/puma_config.rb
