FROM mcr.microsoft.com/playwright:v1.29.2-focal

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
WORKDIR /var/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install pnpm -g
RUN pnpm install 
COPY . .
CMD ["npm", "run", "start"]
# CMD ["npm","install"]