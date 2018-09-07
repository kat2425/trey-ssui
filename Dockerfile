FROM ruby:2.4.1

# Setup base OS packages
# ---------------------------------------------------------------------------------
RUN apt-get update -qq -y && apt-get --assume-yes install \
  git-core \
  curl \
  zlib1g-dev \
  build-essential \
  libssl-dev \
  libreadline-dev \
  libyaml-dev \
  libsqlite3-dev \
  sqlite3 \
  libxml2-dev \
  libxslt1-dev \
  libcurl4-openssl-dev \
  python-software-properties \
  libffi-dev \
  mc \
  mc-data \
  nmap \
  awscli \
  ruby2.0 \
  tmux \
  libmagickcore-dev \
  libmagickwand-dev \
  imagemagick \
  gsfonts

# Install latest Postgres client
# ---------------------------------------------------------------------------------
RUN echo 'deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main' > /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | apt-key add -
RUN apt-get update -qq -y && apt-get --assume-yes install \
  postgresql-common \
  libpq-dev

# Set timezone to Central
# ---------------------------------------------------------------------------------
RUN echo 'America/Chicago' | tee /etc/timezone
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Setup environment
# ---------------------------------------------------------------------------------
RUN mkdir /ss-ui
RUN mkdir /ss-ui/gems
RUN mkdir /ss-ui/tmp
RUN mkdir /ss-ui/logs
RUN mkdir /tmp/bundler

# Install and configure latest NGINX server
# ---------------------------------------------------------------------------------
RUN echo 'deb http://ppa.launchpad.net/nginx/stable/ubuntu trusty main' > /etc/apt/sources.list.d/nginx-stable-trusty.list
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys C300EE8C
RUN apt-get update -qq -y && apt-get --assume-yes install nginx
RUN rm -rf /etc/nginx/sites-enabled/*

# Setup ruby deps
# ---------------------------------------------------------------------------------
WORKDIR /tmp/bundler
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
ADD vendor vendor
RUN bundle install --deployment --jobs 4 --path /var/bundle 

# Copy NGINX config last, for most optimal Docker caching
# ---------------------------------------------------------------------------------
ADD ./config/nginx/nginx.conf /etc/nginx
ADD ./config/nginx/ss_ui.conf /etc/nginx/sites-enabled

# Install NodeJS runtime
# ---------------------------------------------------------------------------------
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

# Start Turbine web service
# ---------------------------------------------------------------------------------
WORKDIR /ss-ui
ADD . /ss-ui
RUN ln -s /ss-ui/public/packs/toolkit-entypo-df045999ec854232354efba32186c117.woff2 /ss-ui/public/packs/toolkit-entypo.woff2
RUN rm -rf /ss-ui/vendor
RUN ln -s /tmp/bundler/vendor .
CMD scripts/start_web.sh
