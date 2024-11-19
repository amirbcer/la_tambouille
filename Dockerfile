# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.3.5
ARG NODE_VERSION=22.9.0

FROM node:$NODE_VERSION-slim AS client

WORKDIR /rails/client

# Install node modules
COPY client/package.json client/package-lock.json ./
RUN npm install

# build client application
COPY client .
RUN npm run build

# Optionally, remove devDependencies after build
RUN npm prune --production

FROM ruby:$RUBY_VERSION-slim AS base

LABEL fly_launch_runtime="rails"

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test" \
    RAILS_ENV="production"

# Update gems and bundler
RUN gem update --system --no-document && \
    gem install -N bundler


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libpq-dev libvips git

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    bundle exec bootsnap precompile --gemfile && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/


# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts: gems, application
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Copy built client
COPY --from=client /rails/client/dist /rails/public

# Run and own only the runtime files as a non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R 1000:1000 db log storage tmp
USER 1000:1000

# Entrypoint sets up the container.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server"]
