# SchoolStatus
### SS-UI
High level documentation for unified application

## Core Requirements
The following tools will make your local development environment much easier.

* **Homebrew**  *(OS level package management)*
  * Postgresql
  * Redis

* **Rbenv** *(Ruby version management / v2.4.1)*
  * Foreman

* **NVM** *(Node version management)*
  * Yarn

## Quick Install
```
# Setup foreman to manage server processes
gem install foreman

# Install base ruby dependencies
bundle

# Install JS dependencies
yarn install

# Fire off local dev-server processes
# ---------------------------------------------------------------------------------
# http://localhost:3200               # Ruby webserver
# http://localhost:3210               # Webpack with HMR (no need to hit directly)
# http://localhost:3220               # React Storybook
# ---------------------------------------------------------------------------------
foreman s
```

You'll also need to set up your `.env` file by simply `cp env.sample .env` and then filling
out the values in your `.env` file to match the environment to which you'd like to connect.
Note that you can define environment-specific file such as `.env.staging` or `.env.test`
if you'd like, but it's not required.

## Ruby interactive console
```
# DB access, interactive tests, scratch REPL
pry
```

## Annotated Project Tree
```
├─ app
│   ├── assets                                     # Rails assets (**ignore -- use webpack)
│   │
│   ├── controllers                                # Rails controllers (hook to server level routes)
│   │   └── concerns
│   │
│   ├── javascript                                 # Webpack entry point
│   │   ├── packs
│   │   │   └── theme                              # Global CSS + assets
│   │   │
│   │   └── react                                  # Front-end lives here  (aliased as a Webpack root)
│   │       ├── components                         # Component entry point (aliased as `ui/*`)
│   │       │   ├── app                            # Top-level containers
│   │       │   ├── controllers                    # Controller containers
│   │       │   ├── router                         # react-router
│   │       │   │
│   │       │   ├── shell                          # SS-UI core components
│   │       │   │   ├── SMS
│   │       │   │   ├── StudentCard    
│   │       │   │   │   └── Assessments
│   │       │   │   │
│   │       │   │   ├── UserMenu
│   │       │   │   └── stories                    # Storybook hooks
│   │       │   │
│   │       │   └── vjs                            # Jaspersoft VisualizeJS components
│   │       │
│   │       ├── helpers                            # Useful helpers
│   │       │
│   │       ├── modules                            # Module level components
│   │       │   ├── channel
│   │       │   └── logic
│   │       │
│   │       └── stores                             # MobX stores
│   │
│   ├── models                                     # Database models (via Sequel ORM)
│   │   └── concerns
│   │
│   └── views                                      # Non-React views and layouts (slim-lang)
│
├── config                                         # App/Environment config
│   ├── environments
│   ├── initializers
│   ├── locales                                    # i18n string templates
│   └── webpack                                    # Webpack configs/loaders
│       └── loaders
│
├── docs                                           # App documentation (post as much as you'd
│                                                  # like -- use Markdown!)
├── lib
│   └── tasks                                      # Rake tasks
│
├── public
│   └── packs                                      # Prod assets are compiled into here
│
└── resources                                      # SASS Project for base theme, modify and build
    └── bs-4-theme                                 # with Gulp, copy into app/javascript/packs/theme
```
