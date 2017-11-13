#!/usr/bin/env ruby

def clobber_assets
  system 'rake assets:clobber'
end

def compile_assets
  system 'NO_DB=1 RAILS_ENV=production rake assets:precompile'
end

def build_image(environment)
  puts "--> Building image for: #{environment}"
  system "docker build -t ss-ui:#{environment} ."
end

def run(environment)
  clobber_assets
  compile_assets
  build_image environment
  clobber_assets
end

run (ARGV[0] || 'latest')
