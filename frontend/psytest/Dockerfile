# 1단계: 빌드
FROM node:18 AS build
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

# 2단계: Nginx로 정적 파일 서빙
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ../../nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
