#!/bin/bash

# Check if package.json exists, if not initialize npm
if [ ! -f package.json ]; then
    echo "Initializing npm project..."
    npm init -y
fi

# Install Webpack and dependencies
echo "Installing Webpack and dependencies..."
npm install --save-dev \
    css-loader@^7.1.2 \
    html-loader@^5.1.0 \
    html-webpack-plugin@^5.6.3 \
    style-loader@^4.0.0 \
    webpack@^5.97.1 \
    webpack-cli@^6.0.1 \
    webpack-dev-server@^5.2.0

# Success message
echo "Dependencies installed successfully!"
