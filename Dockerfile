# Stage 1: Build static assets
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies and build project
COPY package.json ./
RUN npm install

# Copy application source
COPY . .
RUN npm run build

# Stage 2: Serve with custom Nginx config
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 6000
CMD ["nginx", "-g", "daemon off;"]
