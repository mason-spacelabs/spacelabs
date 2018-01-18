# install global packages
node.js install -g
npm install -g
git install -g
gulp install -g
themekit install -g

# install dependencies 
npm install in the root folder directory

# package scripts
dev-watch: packages the lib folder into the development branch
dev-pull: downloads a fresh package from the Shopify development site
prod-push: copies the development branch to the Shopify production site
prod-upload: pushed the production folder structure to the Shopify production site
