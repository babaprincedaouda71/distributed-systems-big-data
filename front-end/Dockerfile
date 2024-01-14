# Phase 1
# Use official node image as base
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Copy the source code to app
COPY ./ /usr/local/app

# Install the dependencies
RUN npm install

# Generate the build of the app
RUN npm run build

# Phase 2
FROM nginx:latest

COPY --from=build /usr/local/app/dist/front-end/browser /usr/share/nginx/html

EXPOSE 80
