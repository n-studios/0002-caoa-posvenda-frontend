# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create a simple nginx config inline
RUN echo 'server { \
    listen 3000; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    # Enable CORS \
    add_header "Access-Control-Allow-Origin" "*" always; \
    add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, PUT, DELETE" always; \
    add_header "Access-Control-Allow-Headers" "X-Requested-With,Accept,Content-Type, Origin" always; \
}' > /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 