# install global packages
node.js install -g
npm install -g
git install -g
gulp install -g
themekit install -g

# install dependencies 
npm install in the root folder directory

# package scripts
dev-watch: packages the lib folder into the development branch and watches for live changes
dev-pull: downloads a fresh copy of the theme from the Shopify development site
dev-push: uploads new files & updates from the spacelabs-dev directory to the Shopify development site
dev-push-overwrite: overwrite the Shopify development site with the spacelabs-dev directory 
prod-stage: copies the spacelabs-dev directory to the spacelabs-prod directory for staging
prod-push: uploads new files & updates from spacelabs-prod directory to the Shopify production site
prod-push-overwrite: overwrite the Shopify production site with the spacelabs-prod directory