# 1단계: 빌드
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

# 2단계: 배포 (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
